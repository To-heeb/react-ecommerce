import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { SetStateAction, useEffect, useState } from "react";
import {
  validateEmail,
  validateLowerCasePassword,
  validateNonAlphanumericPassword,
  validatePassword,
  validateUpperCasePassword,
} from "../utils/FormValidationUtil";
import { AuthAttributes, Role } from "../entities/api-util";
import AuthenticationFormInput from "../components/AuthenticationFormInput";
import AuthenticationSubmitButton from "../components/AuthenticationSubmitButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Swal from "sweetalert2";
import { signUpUser } from "../features/auth/auth-api-slice";
import { HttpStatusCode } from "axios";
import { hashText } from "../utils/StringUtils";
import { useSelector } from "react-redux";
import { getAllRoles } from "../features/role/role-slice";
import { addUser, getAllUsers } from "../features/user/user-slice";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.account.loggedIn);
  const roles = useSelector(getAllRoles);
  const users = useSelector(getAllUsers);

  const roleId = roles.find((role: Role) => role.name === "User")?.id;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
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

      if (
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

  const handleLocalStorageSignIn = async () => {
    formData.roleId = roleId;

    const check = users.filter((user: User) => user.email === formData.email);

    if (check.length != 0) {
      setFormError(`User with email "${formData.email}" already exists`);
      return;
    }

    await hashText(formData.password, "SHA-256").then(
      (hashedText) => (formData.password = hashedText)
    );

    formData.email = formData.email.toLowerCase();
    formData.name = formData.email;

    dispatch(addUser(formData));

    setFormData({
      email: "",
      password: "",
    });
    setFormError("");

    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: "🎊You just registered successfully",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/signin");
      }
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

    const authAttributes: AuthAttributes = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    await dispatch(signUpUser(authAttributes))
      .unwrap()
      .then((result: any) => {
        switch (result.status) {
          case HttpStatusCode.Ok:
            formData.name = formData.email;
            formData.roleId = roleId;
            dispatch(addUser(formData));
            // call user by token and login properly details
            setFormData({
              email: "",
              password: "",
            });
            setFormError("");
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: "🎊You just registered successfully",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Login",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/signin");
              }
            });

            setFormError("");
            navigate("/signin");
            break;
          default:
            handleLocalStorageSignIn();
        }
      })
      .catch(() => {
        handleLocalStorageSignIn();
      });
    setLoading(false);
  };

  return (
    <>
      <PageHeader homeName={"Home"} homeLink={"/"} pageName={"Sign Up"} />
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className="text-center mx-auto"
                  style={{ maxWidth: "700px" }}
                >
                  <h1 className="text-primary">Sign Up</h1>
                  <p className="mb-4">
                    Already a user, Please Sign In
                    <Link to="/signin"> here</Link>
                  </p>
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
                <AuthenticationFormInput
                  inputID={"exampleFormControlInput1"}
                  inputName={"email"}
                  inputType={"email"}
                  inputStyle={"w-100 form-control border-0 py-3 mb-4"}
                  inputValue={formData.email}
                  inputPlaceholder={"example@mail.com"}
                  inputAriaDescribedby={"emailHelp"}
                  onInputChange={handleFormChange}
                />
                <AuthenticationFormInput
                  inputID={"exampleFormControlInput2"}
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

export default SignUp;
