import Swal from "sweetalert2";
import { validateName } from "../utils/FormValidationUtil";
import { deleteRole, updateRole } from "../features/role/role-slice";
import { SetStateAction, useState } from "react";
import ModalFormInput from "./ModalFormInput";
import CustomModal from "./Modal";
import ModalFormButton from "./ModalFormButton";
import { useAppDispatch } from "../app/hooks";

interface RoleRowProps {
  id: string;
  name: string;
  counter: number;
}

const RoleRow = ({ id, name, counter }: RoleRowProps) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    name: name,
  });
  const [formError, setFormError] = useState<string | null>(null);

  const [updateRoleModalStatus, setUpdateRoleModalStatus] = useState(false);

  const handleUpdateRoleFormChange = (e: {
    target: {
      name: string;
      value: SetStateAction<string> | SetStateAction<number>;
    };
  }) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        [name]: value,
      };

      if (!validateName(updatedFormData.name)) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }

      return updatedFormData;
    });
  };

  const handleOpenUpdateRoleModal = () => {
    setUpdateRoleModalStatus(true);
  };

  const handleCloseUpdateRoleModal = () => {
    setUpdateRoleModalStatus(false);
  };

  const handleRoleUpdate = async () => {
    if (!validateName(formData.name)) {
      setFormError("Name field cannot be empty");
      return;
    }

    dispatch(updateRole(formData));
    setLoading(false);
    setFormError("");
    handleCloseUpdateRoleModal();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleRoleDelete = async () => {
    if (!id) {
      return;
    }
    Swal.fire({
      icon: "warning",
      text: `Are you sure you want to delete ${name} role!`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteRole(formData));

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1200,
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <tr>
        <td className="">
          <h6 className="fw-semibold mb-0">{++counter}</h6>
        </td>
        <td className="">
          <p className="mb-0 fw-normal">{name}</p>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-primary m-1"
            onClick={handleOpenUpdateRoleModal}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger m-1"
            onClick={handleRoleDelete}
          >
            Delete
          </button>
        </td>
      </tr>
      <CustomModal
        title={"Update Role"}
        status={updateRoleModalStatus}
        onCloseModal={handleCloseUpdateRoleModal}
      >
        {formError && (
          <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <div>{formError}</div>
          </div>
        )}
        <ModalFormInput
          inputName={"id"}
          inputType={"hidden"}
          inputStyle={"form-control"}
          inputValue={id}
          onInputChange={handleUpdateRoleFormChange}
        />
        <ModalFormInput
          inputID={"exampleInputName"}
          inputName={"name"}
          inputType={"text"}
          inputStyle={"form-control"}
          inputValue={formData.name}
          inputPlaceholder={"engineering"}
          inputAriaDescribedby={"textHelp"}
          onInputChange={handleUpdateRoleFormChange}
        />
        <ModalFormButton
          loading={loading}
          buttonText={"Submit"}
          buttonStatus={buttonDisabled}
          onButtonClick={handleRoleUpdate}
        />
      </CustomModal>
    </>
  );
};

export default RoleRow;
