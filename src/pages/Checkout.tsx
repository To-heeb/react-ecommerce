import { useDispatch, useSelector } from "react-redux";
import { checkoutFromCart, getAllCarts } from "../features/cart/cart-slice";
import { getAllProducts } from "../features/product/product-slice";
import { useAppSelector } from "../app/hooks";
import { Cart as CartX, Product } from "../entities/api-util";
import { SetStateAction, useState } from "react";

import {
  validateEmail,
  validateName,
  validateText,
} from "../utils/FormValidationUtil";
import { addOrder } from "../features/order/order-slice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import CheckoutFormInput from "../components/CheckoutFormInput";
import CheckoutItem from "../components/CheckoutItem";
import useCheckAuth from "../hooks/useCheckAuth";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector(getAllCarts);
  const products = useSelector(getAllProducts);
  const checkAuth = useCheckAuth();
  checkAuth();

  const userId = useAppSelector((state) => state.account.id);
  const userCart = carts.find((cart: CartX) => cart.userId == userId)?.products;
  const userCartTotal = carts.find(
    (cart: CartX) => cart.userId == userId
  )?.total;

  let userCartProduct;
  if (userCart != undefined) {
    userCartProduct = userCart.map((userCartItem) => {
      const currProduct = products.find(
        (product: Product) => product.id == userCartItem.id
      );

      return {
        ...userCartItem,
        name: currProduct?.name,
        imageUrl: currProduct?.imageUrl,
      };
    });
  } else {
    userCartProduct = [];
  }

  const deliveryPrice = {
    door_delivery: 15,
    station_pickup: 8,
  };

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    town: "",
    country: "",
    postalCode: "",
    mobile: "",
    emailAddress: "",
    orderNote: "",
    paymentMethod: "",
    deliveryMethod: "",
  });

  const handleBillingFormChange = (e: {
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
        !validateName(updatedFormData.firstName) ||
        !validateName(updatedFormData.lastName) ||
        !validateText(updatedFormData.address) ||
        !validateText(updatedFormData.town) ||
        !validateText(updatedFormData.country) ||
        !validateText(updatedFormData.postalCode) ||
        !validateText(updatedFormData.mobile) ||
        !validateEmail(updatedFormData.emailAddress) ||
        !updatedFormData.deliveryMethod ||
        !updatedFormData.paymentMethod
      ) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }

      return updatedFormData;
    });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    if (!validateName(formData.firstName)) {
      setFormError("First name field cannot be empty");
      return;
    }

    if (!validateName(formData.lastName)) {
      setFormError("Last name field cannot be empty");
      return;
    }

    if (!validateName(formData.address)) {
      setFormError("Address field cannot be empty");
      return;
    }

    if (!validateName(formData.town)) {
      setFormError("Town field cannot be empty");
      return;
    }

    if (!validateName(formData.country)) {
      setFormError("Country field cannot be empty");
      return;
    }

    if (!validateName(formData.postalCode)) {
      setFormError("Postal code field cannot be empty");
      return;
    }

    if (!validateName(formData.mobile)) {
      setFormError("Mobile field cannot be empty");
      return;
    }

    if (!validateName(formData.emailAddress)) {
      setFormError("Email field cannot be empty");
      return;
    }

    if (!validateName(formData.deliveryMethod)) {
      setFormError("Please select a delivery method");
      return;
    }

    if (!validateName(formData.paymentMethod)) {
      setFormError("Please select a payment method");
      return;
    }

    const newOrder = {
      userId: userId,
      products: userCart,
      total: userCartTotal + deliveryPrice[formData.deliveryMethod],
      shippingCost: deliveryPrice[formData.deliveryMethod],
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      town: formData.town,
      country: formData.country,
      postalCode: formData.postalCode,
      mobile: formData.mobile,
      emailAddress: formData.emailAddress,
      paymentMethod: formData.paymentMethod,
      deliveryMethod: formData.deliveryMethod,
      orderNote: formData.orderNote,
    };
    dispatch(checkoutFromCart({ userId: userId }));
    dispatch(addOrder(newOrder));
    setLoading(false);
    setFormError("");

    Swal.fire({
      icon: "success",
      text: `Order Placed Successfully`,
      showCancelButton: false,
      confirmButtonText: "Go To Orders",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied ow */
      navigate("/orders");
    });
  };

  return (
    <>
      {/* <!-- Checkout Page Start --> */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4 mt-5">Billing details</h1>
          <form action="#">
            <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <CheckoutFormInput
                        inputLabel={"First Name"}
                        inputName={"firstName"}
                        inputType={"text"}
                        inputStyle={"form-control"}
                        inputValue={formData.firstName}
                        inputStatus={true}
                        onInputChange={handleBillingFormChange}
                        inputAriaDescribedby={"firstName"}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <CheckoutFormInput
                        inputLabel={"Last Name"}
                        inputName={"lastName"}
                        inputType={"text"}
                        inputStyle={"form-control"}
                        inputValue={formData.lastName}
                        inputStatus={true}
                        onInputChange={handleBillingFormChange}
                        inputAriaDescribedby={"lastName"}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-item">
                  <CheckoutFormInput
                    inputLabel={"Address"}
                    inputPlaceholder={"House Number Street Name"}
                    inputName={"address"}
                    inputType={"text"}
                    inputStyle={"form-control"}
                    inputValue={formData.address}
                    inputStatus={true}
                    onInputChange={handleBillingFormChange}
                    inputAriaDescribedby={"Address"}
                  />
                </div>
                <div className="form-item">
                  <CheckoutFormInput
                    inputLabel={"Town/City"}
                    inputName={"town"}
                    inputType={"text"}
                    inputStyle={"form-control"}
                    inputValue={formData.town}
                    inputStatus={true}
                    onInputChange={handleBillingFormChange}
                    inputAriaDescribedby={"town"}
                  />
                </div>
                <div className="form-item">
                  <CheckoutFormInput
                    inputLabel={"Country"}
                    inputName={"country"}
                    inputType={"text"}
                    inputStyle={"form-control"}
                    inputValue={formData.country}
                    inputStatus={true}
                    onInputChange={handleBillingFormChange}
                    inputAriaDescribedby={"country"}
                  />
                </div>
                <div className="form-item">
                  <CheckoutFormInput
                    inputLabel={"Postcode/Zip"}
                    inputName={"postalCode"}
                    inputType={"text"}
                    inputStyle={"form-control"}
                    inputValue={formData.postalCode}
                    inputStatus={true}
                    onInputChange={handleBillingFormChange}
                    inputAriaDescribedby={"postalCode"}
                  />
                </div>
                <div className="form-item">
                  <CheckoutFormInput
                    inputLabel={"Mobile"}
                    inputName={"mobile"}
                    inputType={"text"}
                    inputStyle={"form-control"}
                    inputValue={formData.mobile}
                    inputStatus={true}
                    onInputChange={handleBillingFormChange}
                    inputAriaDescribedby={"mobile"}
                  />
                </div>
                <div className="form-item">
                  <CheckoutFormInput
                    inputLabel={"Email Address"}
                    inputName={"emailAddress"}
                    inputType={"email"}
                    inputStyle={"form-control"}
                    inputValue={formData.emailAddress}
                    inputStatus={true}
                    onInputChange={handleBillingFormChange}
                    inputAriaDescribedby={"emailAddress"}
                  />
                </div>
                <hr />
                <div className="form-item my-3">
                  <textarea
                    name="text"
                    className="form-control"
                    spellCheck={false}
                    cols={30}
                    rows={11}
                    placeholder="Order Notes (Optional)"
                    onChange={handleBillingFormChange}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Products</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userCartProduct.map((userCartItem, index: number) => (
                        <CheckoutItem
                          key={index}
                          id={userCartItem.id}
                          name={userCartItem.name}
                          imageUrl={userCartItem.imageUrl}
                          quantity={userCartItem.quantity}
                          price={userCartItem.price}
                        />
                      ))}
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <p className="mb-0 text-dark py-3">Subtotal</p>
                        </td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">${userCartTotal}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5">
                          <p className="mb-0 text-dark py-4">Delivery</p>
                        </td>
                        <td colSpan={3} className="py-5">
                          <div className="form-check text-start">
                            <input
                              type="checkbox"
                              className="form-check-input bg-primary border-0"
                              id="Shipping-2"
                              name="deliveryMethod"
                              value="door_delivery"
                              checked={
                                formData.deliveryMethod === "door_delivery"
                                  ? true
                                  : false
                              }
                              onChange={handleBillingFormChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="Shipping-2"
                            >
                              Door Delivery: $15.00
                            </label>
                          </div>
                          <div className="form-check text-start">
                            <input
                              type="checkbox"
                              className="form-check-input bg-primary border-0"
                              id="Shipping-3"
                              name="deliveryMethod"
                              value="station_pickup"
                              checked={
                                formData.deliveryMethod === "station_pickup"
                                  ? true
                                  : false
                              }
                              onChange={handleBillingFormChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="Shipping-3"
                            >
                              Station Pickup: $8.00
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5">
                          <p className="mb-0 text-dark text-uppercase py-3">
                            TOTAL
                          </p>
                        </td>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">
                              $
                              {formData.deliveryMethod != "" &&
                                userCartTotal +
                                  parseInt(
                                    deliveryPrice[formData.deliveryMethod]
                                  )}
                              {formData.deliveryMethod == "" && userCartTotal}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Transfer-1"
                        name="paymentMethod"
                        value="direct_bank_transfer"
                        checked={
                          formData.paymentMethod === "direct_bank_transfer"
                            ? true
                            : false
                        }
                        onChange={handleBillingFormChange}
                      />
                      <label className="form-check-label" htmlFor="Transfer-1">
                        Direct Bank Transfer
                      </label>
                    </div>
                    <p className="text-start text-dark">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Payments-1"
                        name="paymentMethod"
                        value="check_payment"
                        checked={
                          formData.paymentMethod === "check_payment"
                            ? true
                            : false
                        }
                        onChange={handleBillingFormChange}
                      />
                      <label className="form-check-label" htmlFor="Payments-1">
                        Check Payments
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Delivery-1"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={
                          formData.paymentMethod === "cash_on_delivery"
                            ? true
                            : false
                        }
                        onChange={handleBillingFormChange}
                      />
                      <label className="form-check-label" htmlFor="Delivery-1">
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Paypal-1"
                        name="paymentMethod"
                        value="paypal"
                        checked={
                          formData.paymentMethod === "paypal" ? true : false
                        }
                        onChange={handleBillingFormChange}
                      />
                      <label className="form-check-label" htmlFor="Paypal-1">
                        Paypal
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button
                    type="button"
                    className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                    disabled={buttonDisabled}
                    onClick={handlePlaceOrder}
                  >
                    {loading && (
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    Place Order
                  </button>
                  {formError && (
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <strong>{formError}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <!-- Checkout Page End --> */}
    </>
  );
};

export default Checkout;
