import { SetStateAction, useState } from "react";
import {
  validateEmail,
  validateLowerCasePassword,
  validateName,
  validateNonAlphanumericPassword,
  validatePassword,
  validateUpperCasePassword,
} from "../utils/FormValidationUtil";
import ModalFormInput from "../components/ModalFormInput";
import AuthenticationFormInput from "../components/AuthenticationFormInput";
import AuthenticationSubmitButton from "../components/AuthenticationSubmitButton";
import PageHeader from "../components/PageHeader";
import Swal from "sweetalert2";
import { User } from "../entities/api-util";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUserPassword } from "../features/user/user-slice";
import { useAppSelector } from "../app/hooks";
import { AuthUser, updateLoggedIn } from "../features/account/account-slice";
import useCheckAuth from "../hooks/useCheckAuth";

const Profile = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const authUser = useAppSelector(AuthUser);
  const checkAuth = useCheckAuth();
  checkAuth();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: authUser.id,
    name: authUser.name,
    email: authUser.email,
    password: "",
  });

  const handleFormChange = (e: {
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
      console.log("", updatedFormData);
      if (
        !validateName(updatedFormData.name) ||
        !validateEmail(updatedFormData.email) ||
        !validatePassword(updatedFormData.password)
      ) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }

      return updatedFormData;
    });
  };

  const handleUserSignIn = async () => {
    setLoading(true);
    if (!validateEmail(formData.email)) {
      setFormError("Invalid Email");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setFormError("Password must be at least 8 chars long");
      return;
      setLoading(false);
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

    const check = users.find(
      (user: User) => user.email === formData.email && user.id != formData.id
    );
    if (check) {
      setFormError(`User with email ${formData.name} already exists`);
      return;
    }

    setLoading(false);
    dispatch(updateUserPassword(formData));
    dispatch(updateLoggedIn(formData));

    setFormData({
      name: formData.name,
      email: formData.email,
      password: "",
      id: formData.id,
    });
    setFormError("");
    setButtonDisabled(true);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your profile has been updated",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <PageHeader homeName={"Home"} homeLink={"/"} pageName={"Profile"} />
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className="text-center mx-auto"
                  style={{ maxWidth: "700px" }}
                >
                  <h1 className="text-primary">Profile</h1>
                </div>
              </div>
              {formError && (
                <div className="text-center my-4" style={{ color: "red" }}>
                  {formError}
                </div>
              )}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="px-4 py-3 px-md-2 px-xl-4"
              >
                <ModalFormInput
                  inputName={"id"}
                  inputType={"hidden"}
                  inputStyle={"form-control"}
                  inputValue={formData.id}
                  onInputChange={handleFormChange}
                />
                <AuthenticationFormInput
                  inputID={"exampleFormControlInput1"}
                  inputName={"name"}
                  inputType={"text"}
                  inputStyle={"w-100 form-control border-0 py-3 mb-4"}
                  inputValue={formData.email}
                  inputPlaceholder={"Adam Smith"}
                  inputAriaDescribedby={"nameHelp"}
                  onInputChange={handleFormChange}
                />
                <AuthenticationFormInput
                  inputID={"exampleFormControlInput2"}
                  inputName={"email"}
                  inputType={"email"}
                  inputStyle={"w-100 form-control border-0 py-3 mb-4"}
                  inputValue={formData.email}
                  inputPlaceholder={"example@mail.com"}
                  inputAriaDescribedby={"emailHelp"}
                  onInputChange={handleFormChange}
                />
                <AuthenticationFormInput
                  inputID={"exampleFormControlInput3"}
                  inputName={"password"}
                  inputType={"password"}
                  inputStyle={"w-100 form-control border-0 py-3 mb-4"}
                  inputValue={formData.password}
                  inputPlaceholder={"********"}
                  inputAriaDescribedby={"passwordHelp"}
                  onInputChange={handleFormChange}
                />
                <AuthenticationSubmitButton
                  buttonText={"Submit"}
                  buttonStatus={buttonDisabled}
                  onUserSignIn={handleUserSignIn}
                  loading={loading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
