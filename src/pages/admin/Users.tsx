import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader";
import UserRow from "../../components/UserRow";
import { SetStateAction, useState } from "react";
import { Role, User } from "../../entities/api-util";
import { addUser, getAllUsers } from "../../features/user/user-slice";
import CustomModal from "../../components/Modal";
import ModalFormInput from "../../components/ModalFormInput";
import ModalFormSelect from "../../components/ModalFormSelect";
import {
  validateEmail,
  validateLowerCasePassword,
  validateName,
  validateNonAlphanumericPassword,
  validatePassword,
  validateUpperCasePassword,
} from "../../utils/FormValidationUtil";
import { getAllRoles } from "../../features/role/role-slice";
import ModalFormButton from "../../components/ModalFormButton";
import Swal from "sweetalert2";
import { hashText } from "../../utils/StringUtils";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const roles = useSelector(getAllRoles);

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roleId: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const [createUserModalStatus, setCreateUserModalStatus] = useState(false);

  const handleCreateUserFormChange = (e: {
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

      if (
        !validateName(updatedFormData.name) ||
        !validateEmail(updatedFormData.email) ||
        !validatePassword(updatedFormData.password) ||
        !updatedFormData.roleId
      ) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }

      return updatedFormData;
    });
  };

  const handleOpenCreateUserModal = () => {
    setCreateUserModalStatus(true);
  };

  const handleCloseCreateUserModal = () => {
    setCreateUserModalStatus(false);
  };

  const handleUserCreate = async () => {
    if (!validateName(formData.name)) {
      setFormError("Name can't be empty");
      return;
    }

    if (!validateName(formData.email)) {
      setFormError("Email can't be empty");
      return;
    }

    if (!validatePassword(formData.password)) {
      setFormError("Password must be more than 8 characters");
      setLoading(false);
      return;
    }

    if (!validateNonAlphanumericPassword(formData.password)) {
      setFormError(
        "Passwords must have at least one non alphanumeric character."
      );
      setLoading(false);
      return;
    }

    if (!validateLowerCasePassword(formData.password)) {
      setFormError("Passwords must have at least one lowercase ('a'-'z').");
      setLoading(false);
      return;
    }

    if (!validateUpperCasePassword(formData.password)) {
      setFormError("Passwords must have at least one uppercase ('A'-'Z').");
      setLoading(false);
      return;
    }

    if (!formData.roleId) {
      setFormError("Please select a role for the user");
      return;
    }

    const check = users.find((user: User) => user.email === formData.email);
    if (check) {
      setFormError(`User with email ${formData.email} already exists`);
      return;
    }

    await hashText(formData.password, "SHA-256").then(
      (hashedText) => (formData.password = hashedText)
    );

    dispatch(addUser(formData));
    setLoading(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      roleId: "",
    });
    handleCloseCreateUserModal();

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
      <PageHeader homeName={"Home"} homeLink={"/"} pageName={"Users"} />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="d-flex justify-content-between mb-4">
            <h5 className="card-title fw-semibold mb-4">Users</h5>
            <button
              className="btn btn-sm btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={handleOpenCreateUserModal}
            >
              <i className="ti ti-plus"></i> Add new user
            </button>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User, index: number) => (
                  <UserRow
                    key={index}
                    id={user.id}
                    email={user.email}
                    name={user.name}
                    roleId={user.roleId}
                    counter={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <CustomModal
            title={"Add New User"}
            status={createUserModalStatus}
            onCloseModal={handleCloseCreateUserModal}
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
              inputPlaceholder={"Maajid Aslam"}
              inputAriaDescribedby={"textHelp"}
              onInputChange={handleCreateUserFormChange}
            />
            <ModalFormInput
              inputID={"exampleInputName2"}
              inputName={"email"}
              inputType={"email"}
              inputStyle={"form-control"}
              inputValue={formData.email}
              inputPlaceholder={"maaa@mail.com"}
              inputAriaDescribedby={"emailHelp"}
              onInputChange={handleCreateUserFormChange}
            />
            <ModalFormInput
              inputID={"exampleInputName3"}
              inputName={"password"}
              inputType={"password"}
              inputStyle={"form-control"}
              inputValue={formData.password}
              inputPlaceholder={"********"}
              inputAriaDescribedby={"passwordHelp"}
              onInputChange={handleCreateUserFormChange}
            />
            <ModalFormSelect
              name="roleId"
              label={"Role"}
              onInputChange={handleCreateUserFormChange}
              defaultValue={""}
            >
              <option>Open this select menu</option>
              {roles.map((role: Role, index: number) => (
                <option value={role.id} key={index}>
                  {role.name}
                </option>
              ))}
            </ModalFormSelect>
            <ModalFormButton
              loading={loading}
              buttonText={"Submit"}
              buttonStatus={buttonDisabled}
              onButtonClick={handleUserCreate}
            />
          </CustomModal>
        </div>
      </div>
    </>
  );
};

export default Users;
