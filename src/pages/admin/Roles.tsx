import ModalFormButton from "../../components/ModalFormButton";
import ModalFormInput from "../../components/ModalFormInput";
import CustomModal from "../../components/Modal";
import Swal from "sweetalert2";
import { validateName } from "../../utils/FormValidationUtil";
import { SetStateAction, useState } from "react";
import { addRole, getAllRoles } from "../../features/role/role-slice";
import { Role } from "../../entities/api-util";
import RoleRow from "../../components/RoleRow";
import { useAppDispatch } from "../../app/hooks";
import PageHeader from "../../components/PageHeader";
import { useSelector } from "react-redux";

const Roles = () => {
  const dispatch = useAppDispatch();

  const roles = useSelector(getAllRoles);

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const [createRoleModalStatus, setCreateRoleModalStatus] = useState(false);

  const handleCreateRoleFormChange = (e: {
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

  const handleOpenCreateRoleModal = () => {
    setCreateRoleModalStatus(true);
  };

  const handleCloseCreateRoleModal = () => {
    setFormError("");
    setCreateRoleModalStatus(false);
  };

  const handleRoleCreate = async () => {
    if (!validateName(formData.name)) {
      setFormError("Name can't be empty");
      return;
    }

    const check = roles.find((role: Role) => role.name === formData.name);
    if (check) {
      setFormError(`Role with name ${formData.name} already exists`);
      return;
    }

    dispatch(addRole(formData));

    setLoading(false);
    setFormError("");
    setFormData({ name: "" });
    handleCloseCreateRoleModal();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Role Added Successfully",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <>
      <PageHeader homeName={"Home"} homeLink={"/"} pageName={"Roles"} />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="d-flex justify-content-between mb-4">
            <h5 className="card-title fw-semibold mb-4">Roles</h5>
            <button
              className="btn btn-sm btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={handleOpenCreateRoleModal}
            >
              <i className="ti ti-plus"></i> Add new role
            </button>
          </div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role: Role, index: number) => (
                  <RoleRow
                    key={index}
                    id={role.id}
                    name={role.name}
                    counter={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <CustomModal
            title={"Add New Role"}
            status={createRoleModalStatus}
            onCloseModal={handleCloseCreateRoleModal}
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
              inputID={"exampleInputName"}
              inputName={"name"}
              inputType={"text"}
              inputStyle={"form-control"}
              inputValue={formData.name}
              inputPlaceholder={"Customer"}
              inputAriaDescribedby={"textHelp"}
              onInputChange={handleCreateRoleFormChange}
            />
            <ModalFormButton
              loading={loading}
              buttonText={"Submit"}
              buttonStatus={buttonDisabled}
              onButtonClick={handleRoleCreate}
            />
          </CustomModal>
        </div>
      </div>
    </>
  );
};

export default Roles;
