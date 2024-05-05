import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { SetStateAction, useState } from "react";
import {
  deleteProduct,
  updateProduct,
} from "../features/product/product-slice";
import { validateName } from "../utils/FormValidationUtil";
import { Category } from "../entities/api-util";
import Swal from "sweetalert2";
import CustomModal from "./Modal";
import ModalFormInput from "./ModalFormInput";
import ModalFormButton from "./ModalFormButton";
import { getAllCategories } from "../features/category/category-slice";
import ModalFormSelect from "./ModalFormSelect";
import ModelFormTextArea from "./ModelFormTextArea";

interface ProductRowProps {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  counter: number;
  imageUrl: string;
  description: string;
}

const ProductRow = ({
  id,
  name,
  price,
  counter,
  categoryId,
  imageUrl,
  description,
}: ProductRowProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const categories = useSelector(getAllCategories);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    name: name,
    price: price,
    imageUrl: imageUrl,
    categoryId: categoryId,
    description: description,
  });
  const [formError, setFormError] = useState<string | null>(null);

  const [updateProductModalStatus, setUpdateProductModalStatus] =
    useState(false);
  // const color = generateRandomColor();

  const handleUpdateProductFormChange = (e: {
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

  const handleOpenUpdateProductModal = () => {
    setUpdateProductModalStatus(true);
  };

  const handleCloseUpdateProductModal = () => {
    setUpdateProductModalStatus(false);
  };

  const handleProductUpdate = async () => {
    if (!validateName(formData.name)) {
      setFormError("Name field cannot be empty");
      return;
    }

    if (formData.price <= 0) {
      setFormError("Price field can't be empty or less than or equal to zero");
      return;
    }

    if (isNaN(formData.price)) {
      setFormError("Price field should be a number");
      return;
    }

    if (!formData.categoryId) {
      setFormError("Category field can't be empty");
      return;
    }

    if (!validateName(formData.description)) {
      setFormError("Description field can't be empty");
      return;
    }

    dispatch(updateProduct(formData));
    setLoading(false);
    setFormError("");
    handleCloseUpdateProductModal();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleProductDelete = async () => {
    if (!id) {
      return;
    }
    Swal.fire({
      icon: "warning",
      text: `Are you sure you want to delete ${name} product!`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteProduct(formData));

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
          <img
            src={imageUrl}
            className="img-thumbnail img-fluid rounded-circle"
            width={70}
            height={120}
            alt={`${name}'s image`}
          />
        </td>
        <td className="">
          <p className="mb-0 fw-normal">{name}</p>
        </td>
        <td className="">
          <p className="mb-0 fw-normal">${price}</p>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-primary m-1"
            onClick={handleOpenUpdateProductModal}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger m-1"
            onClick={handleProductDelete}
          >
            Delete
          </button>
        </td>
      </tr>
      <CustomModal
        title={"Update Product"}
        status={updateProductModalStatus}
        onCloseModal={handleCloseUpdateProductModal}
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
          onInputChange={handleUpdateProductFormChange}
        />
        <ModalFormInput
          inputID={"exampleInputName"}
          inputName={"name"}
          inputType={"text"}
          inputStyle={"form-control"}
          inputValue={formData.name}
          inputPlaceholder={"engineering"}
          inputAriaDescribedby={"textHelp"}
          onInputChange={handleUpdateProductFormChange}
        />
        <ModalFormInput
          inputID={"exampleInputPrice"}
          inputName={"price"}
          inputType={"text"}
          inputStyle={"form-control"}
          inputValue={formData.price}
          inputPlaceholder={"Customer"}
          inputAriaDescribedby={"textHelp"}
          onInputChange={handleUpdateProductFormChange}
        />
        <ModalFormSelect
          name="categoryId"
          label={"Category"}
          onInputChange={handleUpdateProductFormChange}
          defaultValue={formData.categoryId}
        >
          <option value="">Open this select menu</option>
          {categories.map((category: Category, index: number) => (
            <option value={category.id} key={index}>
              {category.name}
            </option>
          ))}
        </ModalFormSelect>
        <ModelFormTextArea
          textID="exampleFormControlTextarea1"
          textName={"description"}
          textStyle={"form-control"}
          textValue={formData.description}
          onInputChange={handleUpdateProductFormChange}
          textCols={10}
          textRows={6}
        />
        <ModalFormButton
          loading={loading}
          buttonText={"Submit"}
          buttonStatus={buttonDisabled}
          onButtonClick={handleProductUpdate}
        />
      </CustomModal>
    </>
  );
};

export default ProductRow;
