import Swal from "sweetalert2";
import PageHeader from "../../components/PageHeader";
import ModalFormInput from "../../components/ModalFormInput";
import ModalFormButton from "../../components/ModalFormButton";
import CustomModal from "../../components/Modal";
import { SetStateAction, useState } from "react";
import { Category, Product } from "../../entities/api-util";
import { useDispatch, useSelector } from "react-redux";
import { validateName } from "../../utils/FormValidationUtil";
import {
  addProduct,
  getAllProducts,
} from "../../features/product/product-slice";
import ProductRow from "../../components/ProductRow";
import { getAllCategories } from "../../features/category/category-slice";
import ModalFormSelect from "../../components/ModalFormSelect";
import { generateRandomColor } from "../../utils/StringUtils";
import ModelFormTextArea from "../../components/ModelFormTextArea";

const Products = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const products = useSelector(getAllProducts);
  const categories = useSelector(getAllCategories);

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    categoryId: "",
    imageUrl: "",
    description: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const [createProductModalStatus, setCreateProductModalStatus] =
    useState(false);

  const handleCreateProductFormChange = (e: {
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

  const handleOpenCreateProductModal = () => {
    setCreateProductModalStatus(true);
  };

  const handleCloseCreateProductModal = () => {
    setFormError("");
    setCreateProductModalStatus(false);
  };

  const handleProductCreate = async () => {
    if (!validateName(formData.name)) {
      setFormError("Name can't be empty");
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

    const color = generateRandomColor();

    formData.imageUrl = `https://via.placeholder.com/640x480.png/${color}?text=${formData.name}`;

    dispatch(addProduct(formData));
    setLoading(false);
    setFormError("");
    setFormData({
      name: "",
      price: 0,
      categoryId: "",
      imageUrl: "",
      description: "",
    });
    handleCloseCreateProductModal();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product Added Successfully",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <>
      <PageHeader homeName={"Home"} homeLink={"/"} pageName={"Products"} />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="d-flex justify-content-between mb-4">
            <h5 className="card-title fw-semibold mb-4">Products</h5>
            <button
              className="btn btn-sm btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={handleOpenCreateProductModal}
            >
              <i className="ti ti-plus"></i> Add new product
            </button>
          </div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product, index: number) => (
                  <ProductRow
                    key={index}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    counter={index}
                    categoryId={product.categoryId}
                    imageUrl={product.imageUrl}
                    description={product.description}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <CustomModal
            title={"Add New Product"}
            status={createProductModalStatus}
            onCloseModal={handleCloseCreateProductModal}
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
              onInputChange={handleCreateProductFormChange}
            />
            <ModalFormInput
              inputID={"exampleInputPrice"}
              inputName={"price"}
              inputType={"text"}
              inputStyle={"form-control"}
              inputValue={formData.price}
              inputPlaceholder={"Customer"}
              inputAriaDescribedby={"textHelp"}
              onInputChange={handleCreateProductFormChange}
            />

            <ModalFormSelect
              name="categoryId"
              label={"Category"}
              onInputChange={handleCreateProductFormChange}
              defaultValue={""}
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
              onInputChange={handleCreateProductFormChange}
              textCols={10}
              textRows={6}
            />
            <ModalFormButton
              loading={loading}
              buttonText={"Submit"}
              buttonStatus={buttonDisabled}
              onButtonClick={handleProductCreate}
            />
          </CustomModal>
        </div>
      </div>
    </>
  );
};

export default Products;
