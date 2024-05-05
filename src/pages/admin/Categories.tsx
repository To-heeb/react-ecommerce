import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import CustomModal from "../../components/Modal";
import ModalFormInput from "../../components/ModalFormInput";
import PageHeader from "../../components/PageHeader";
import ModalFormButton from "../../components/ModalFormButton";
import { SetStateAction, useState } from "react";
import { validateName } from "../../utils/FormValidationUtil";
import { Category } from "../../entities/api-util";
import Swal from "sweetalert2";
import {
  addCategory,
  getAllCategories,
} from "../../features/category/category-slice";
import CategoryRow from "../../components/CategoryRow";
import {
  capitalizeFirstLetter,
  generateRandomColor,
} from "../../utils/StringUtils";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector(getAllCategories);

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const [createCategoryModalStatus, setCreateCategoryModalStatus] =
    useState(false);

  const handleCreateCategoryFormChange = (e: {
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

  const handleOpenCreateCategoryModal = () => {
    setCreateCategoryModalStatus(true);
  };

  const handleCloseCreateCategoryModal = () => {
    setFormError("");
    setCreateCategoryModalStatus(false);
  };

  const handleCategoryCreate = async () => {
    if (!validateName(formData.name)) {
      setFormError("Name can't be empty");
      return;
    }

    const check = categories.find(
      (category: Category) => category.name === formData.name
    );
    if (check) {
      setFormError(`Category with name ${formData.name} already exists`);
      return;
    }

    formData.name = capitalizeFirstLetter(formData.name.trim().toLowerCase());
    formData.imageUrl = `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${
      formData.name
    }`;

    dispatch(addCategory(formData));
    setLoading(false);
    setFormError("");
    setFormData({ name: "", imageUrl: "" });
    handleCloseCreateCategoryModal();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Category Added Successfully",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <>
      <PageHeader homeName={"Home"} homeLink={"/"} pageName={"Categories"} />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="d-flex justify-content-between mb-4">
            <h5 className="card-title fw-semibold mb-4">Categories</h5>
            <button
              className="btn btn-sm btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={handleOpenCreateCategoryModal}
            >
              <i className="ti ti-plus"></i> Add new category
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
                {categories.map((category: Category, index: number) => (
                  <CategoryRow
                    key={index}
                    id={category.id}
                    name={category.name}
                    counter={index}
                    imageUrl={category.imageUrl}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <CustomModal
            title={"Add New Category"}
            status={createCategoryModalStatus}
            onCloseModal={handleCloseCreateCategoryModal}
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
              inputPlaceholder={"Groceries"}
              inputAriaDescribedby={"textHelp"}
              onInputChange={handleCreateCategoryFormChange}
            />
            <ModalFormButton
              loading={loading}
              buttonText={"Submit"}
              buttonStatus={buttonDisabled}
              onButtonClick={handleCategoryCreate}
            />
          </CustomModal>
        </div>
      </div>
    </>
  );
};

export default Categories;
