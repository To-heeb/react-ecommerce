import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { jwtDecode } from "jwt-decode";
import { SetStateAction, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../utils/FormValidationUtil";
import AuthenticationFormInput from "../components/AuthenticationFormInput";
import { AuthAttributes, Role, User } from "../entities/api-util";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AuthenticationSubmitButton from "../components/AuthenticationSubmitButton";
import { login } from "../features/account/account-slice";
import { signInUser } from "../features/auth/auth-api-slice";
import { HttpStatusCode } from "axios";
import { hashText } from "../utils/StringUtils";
import Swal from "sweetalert2";
import { getAllUsers } from "../features/user/user-slice";
import { useSelector } from "react-redux";
import { getAllRoles } from "../features/role/role-slice";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useSelector(getAllUsers);
  const roles = useSelector(getAllRoles);
  const isLoggedIn = useAppSelector((state) => state.account.loggedIn);

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
    formData.email = formData.email.toLowerCase();
    try {
      const hashedText = await hashText(formData.password, "SHA-256");

      const user = users.filter(
        (user: User) => user.email == formData.email
      )[0];

      if (
        user == undefined ||
        user.email != formData.email ||
        user.password != hashedText
      ) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Credential!",
          text: "🥹  Please enter correct credential. If issue persist please reach out to us",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Register as a user",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signup");
          }
        });

        return;
      }
      formData.name = user.name;
      formData.id = user.id;
      formData.token = "xxxxxxx";
      const userRole = roles.find((role: Role) => role.id == user.roleId);
      formData.role = userRole.name;
      console.log(userRole.name);
    } catch (error) {
      console.log(error);
      console.log(formData);
      Swal.fire({
        icon: "error",
        title: "Ooops!",
        text: "🥹 Something went wrong, Please try again later. If issue persist please reach out to us",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    // formData.password = await hashText(formData.password, "SHA-256");
    dispatch(login(formData));
    setLoading(false);
    setFormError("");
    setFormData({
      email: "",
      password: "",
    });
    navigate("/");
  };

  const handleUserSignIn = async () => {
    setLoading(true);
    if (!validateEmail(formData.email)) {
      setFormError("Invalid Email");
      return;
    }

    if (!validatePassword(formData.password)) {
      setFormError("Password must be at least 8 chars long");
      return;
    }

    const signInAttribute: AuthAttributes = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    await dispatch(signInUser(signInAttribute))
      .unwrap()
      .then((result: any) => {
        switch (result.status) {
          case HttpStatusCode.Ok:
            // call user by token and login properly details
            result.token = jwtDecode(result.data.token);
            result.email = result.token.sub;
            dispatch(login(result));
            setFormError("");
            navigate("/");
            break;
          // case HttpStatusCode.Unauthorized:
          //   setFormError("Invalid credentials");
          //   break;
          // case HttpStatusCode.InternalServerError:
          //   setFormError(
          //     "Something went wrong, please try again. If issue persist contact us"
          //   );
          //   break;
          // case HttpStatusCode.GatewayTimeout:
          //   setFormError("Invalid credentials");
          //   break;
          default:
            handleLocalStorageSignIn();
            return;
        }
      })
      .catch(() => {
        handleLocalStorageSignIn();
        // setFormError(
        //   "Something went wrong, please try again. If issue persist contact us"
        // );
      });
    setLoading(false);
  };

  return (
    <>
      <PageHeader homeName={"Home"} homeLink={"/"} pageName={"Sign In"} />
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className="text-center mx-auto"
                  style={{ maxWidth: "700px" }}
                >
                  <h1 className="text-primary">Sign In</h1>
                  <p className="mb-4">
                    New User, Please Sign Up <Link to="/signup">here</Link>
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
