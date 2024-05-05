import ModalFormInput from "./ModalFormInput";
import ModalFormButton from "./ModalFormButton";
import { useAppDispatch } from "../app/hooks";
import { SetStateAction, useState } from "react";
import { validateName } from "../utils/FormValidationUtil";
import {
  deleteCategory,
  updateCategory,
} from "../features/category/category-slice";
import Swal from "sweetalert2";
import CustomModal from "./Modal";

interface CategoryRowProps {
  id: string;
  name: string;
  imageUrl: string;
  counter: number;
}

const CategoryRow = ({ id, name, imageUrl, counter }: CategoryRowProps) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    name: name,
    imageUrl: imageUrl,
  });
  const [formError, setFormError] = useState<string | null>(null);

  const [updateCategoryModalStatus, setUpdateCategoryModalStatus] =
    useState(false);

  const handleUpdateCategoryFormChange = (e: {
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

  const handleOpenUpdateCategoryModal = () => {
    setUpdateCategoryModalStatus(true);
  };

  const handleCloseUpdateCategoryModal = () => {
    setUpdateCategoryModalStatus(false);
  };

  const handleCategoryUpdate = async () => {
    if (!validateName(formData.name)) {
      setFormError("Name field cannot be empty");
      return;
    }

    dispatch(updateCategory(formData));
    setLoading(false);
    setFormError("");
    handleCloseUpdateCategoryModal();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleCategoryDelete = async () => {
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
        dispatch(deleteCategory(formData));

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
            onClick={handleOpenUpdateCategoryModal}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger m-1"
            onClick={handleCategoryDelete}
          >
            Delete
          </button>
        </td>
      </tr>
      <CustomModal
        title={"Update Category"}
        status={updateCategoryModalStatus}
        onCloseModal={handleCloseUpdateCategoryModal}
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
          onInputChange={handleUpdateCategoryFormChange}
        />
        <ModalFormInput
          inputID={"exampleInputName"}
          inputName={"name"}
          inputType={"text"}
          inputStyle={"form-control"}
          inputValue={formData.name}
          inputPlaceholder={"engineering"}
          inputAriaDescribedby={"textHelp"}
          onInputChange={handleUpdateCategoryFormChange}
        />
        <ModalFormButton
          loading={loading}
          buttonText={"Submit"}
          buttonStatus={buttonDisabled}
          onButtonClick={handleCategoryUpdate}
        />
      </CustomModal>
    </>
  );
};

export default CategoryRow;
