import { useSelector } from "react-redux";
import ModalFormButton from "./ModalFormButton";
import ModalFormInput from "./ModalFormInput";
import { SetStateAction, useState } from "react";
import { validateEmail, validateName } from "../utils/FormValidationUtil";
import { Role, User } from "../entities/api-util";
import ModalFormSelect from "./ModalFormSelect";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../features/user/user-slice";
import CustomModal from "./Modal";
import Swal from "sweetalert2";
import { getAllRoles } from "../features/role/role-slice";
import { useAppDispatch } from "../app/hooks";

interface UserRowProps {
  id: string;
  name: string;
  email: string;
  counter: number;
  roleId: string;
}

function UserRow({ id, name, email, counter, roleId }: UserRowProps) {
  const dispatch = useAppDispatch();

  const users = useSelector(getAllUsers);
  const roles = useSelector(getAllRoles);

  const userRole = roles.find((role: Role) => role.id == roleId)?.name;

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    name: name,
    email: email,
    roleId: roleId,
  });
  const [formError, setFormError] = useState<string | null>(null);

  const [updateUserModalStatus, setUpdateUserModalStatus] = useState(false);
  const [viewUserModalStatus, setViewUserModalStatus] = useState(false);

  const handleUpdateUserFormChange = (e: {
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
      console.log(updatedFormData);

      if (
        !updatedFormData.id ||
        !validateName(updatedFormData.name) ||
        !validateEmail(updatedFormData.email) ||
        !updatedFormData.roleId
      ) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }

      return updatedFormData;
    });
  };

  const handleOpenUpdateUserModal = () => {
    setUpdateUserModalStatus(true);
  };

  const handleCloseUpdateUserModal = () => {
    setUpdateUserModalStatus(false);
  };

  const handleOpenViewUserModal = () => {
    setViewUserModalStatus(true);
  };

  const handleCloseViewUserModal = () => {
    setViewUserModalStatus(false);
  };

  const handleUserUpdate = async () => {
    if (!validateName(formData.name)) {
      setFormError("Name can't be empty");
      return;
    }

    if (!validateName(formData.email)) {
      setFormError("Email can't be empty");
      return;
    }

    if (!formData.roleId) {
      setFormError("Please select a role for the user");
      return;
    }

    const check = users.find(
      (user: User) => user.email === formData.email && user.id != formData.id
    );
    if (check) {
      setFormError(`User with email ${formData.name} already exists`);
      return;
    }

    setLoading(false);
    dispatch(updateUser(formData));
    handleCloseUpdateUserModal();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleUserDelete = async () => {
    if (!id) {
      return;
    }

    Swal.fire({
      icon: "warning",
      text: `Are you sure you want to delete ${name} category!`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteUser(formData));
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
        <td className="">
          <p className="mb-0 fw-normal">{email}</p>
        </td>
        <td className="">
          <p className="mb-0 fw-normal">{userRole}</p>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-primary m-1"
            onClick={handleOpenViewUserModal}
          >
            View
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-primary m-1"
            onClick={handleOpenUpdateUserModal}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger m-1"
            onClick={handleUserDelete}
          >
            Delete
          </button>
        </td>
      </tr>
      <CustomModal
        title={"Update User"}
        status={updateUserModalStatus}
        onCloseModal={handleCloseUpdateUserModal}
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
          onInputChange={handleUpdateUserFormChange}
        />
        <ModalFormInput
          inputID={"exampleInputName"}
          inputName={"name"}
          inputType={"text"}
          inputStyle={"form-control"}
          inputValue={formData.name}
          inputPlaceholder={"Maajid Aslam"}
          inputAriaDescribedby={"textHelp"}
          onInputChange={handleUpdateUserFormChange}
        />
        <ModalFormInput
          inputID={"exampleInputName2"}
          inputName={"email"}
          inputType={"email"}
          inputStyle={"form-control"}
          inputValue={formData.email}
          inputPlaceholder={"maaa@mail.com"}
          inputAriaDescribedby={"emailHelp"}
          onInputChange={handleUpdateUserFormChange}
        />
        <ModalFormSelect
          name="roleId"
          label={"Role"}
          onInputChange={handleUpdateUserFormChange}
          defaultValue={roleId}
        >
          <option value="">Open this select menu</option>
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
          onButtonClick={handleUserUpdate}
        />
      </CustomModal>
      <CustomModal
        title={`${name}'s Profile`}
        status={viewUserModalStatus}
        onCloseModal={handleCloseViewUserModal}
      >
        <div className="row mt-4">
          <div className="my-2">
            <b>Name</b>: {name}
          </div>
          <div className="my-2">
            <b>Email</b>: {email}
          </div>
          <div className="my-2">
            <b>Role</b>: {userRole}
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default UserRow;
