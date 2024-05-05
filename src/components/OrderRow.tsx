import { useState } from "react";
import {
  capitalizeFirstLetter,
  removeUnderscoresAndCapitalize,
} from "../utils/StringUtils";
import CustomModal from "./Modal";
import { useSelector } from "react-redux";
import { getAllProducts } from "../features/product/product-slice";
import { Address, Product } from "../entities/api-util";

interface OrderRowProps {
  id: string;
  userId: string;
  counter: number;
  orderProducts: [];
  billingAddress: Address;
  deliveryMethod: string;
  paymentMethod: string;
  date: string;
  shippingCost: number;
  status: string;
  total: number;
}

const OrderRow = ({
  id,
  userId,
  counter,
  billingAddress,
  orderProducts,
  date,
  shippingCost,
  deliveryMethod,
  paymentMethod,
  status,
  total,
}: OrderRowProps) => {
  const deliveryMethodName = removeUnderscoresAndCapitalize(deliveryMethod);
  const paymentMethodName = removeUnderscoresAndCapitalize(paymentMethod);
  const statusName = capitalizeFirstLetter(status);
  const [viewOrderModalStatus, setViewOrderModalStatus] = useState(false);
  const products = useSelector(getAllProducts);

  const userOrderProduct = orderProducts.map((orderProduct) => {
    const currProduct = products.find(
      (product: Product) => product.id == orderProduct.id
    );

    return {
      ...orderProduct,
      name: currProduct?.name,
    };
  });

  const handleOpenViewOrderModal = () => {
    setViewOrderModalStatus(true);
  };

  const handleCloseViewOrderModal = () => {
    setViewOrderModalStatus(false);
  };

  return (
    <>
      <tr>
        <td className="">
          <h6 className="fw-semibold mb-0">{++counter}</h6>
        </td>
        <td className="">
          <p className="mb-0 fw-normal">ORD{id}</p>
        </td>
        <td className="">
          <p className="mb-0 fw-normal">{deliveryMethodName}</p>
        </td>
        <td className="">
          <p className="mb-0 fw-normal">{paymentMethodName}</p>
        </td>
        <td className="">
          <p className="mb-0 fw-normal">{statusName}</p>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-primary m-1"
            onClick={handleOpenViewOrderModal}
          >
            View
          </button>
        </td>
      </tr>
      <CustomModal
        title={`Order ID: ORD${id}`}
        status={viewOrderModalStatus}
        onCloseModal={handleCloseViewOrderModal}
      >
        <div className="row mt-1">
          <div className="my-2">
            <b>Delivery Method</b>: {deliveryMethodName}
          </div>
          <div className="my-2">
            <b>Payment Method</b>: {paymentMethodName}
          </div>
          <div className="my-2">
            <b>Order Status</b>:
            <span
              className={`${
                status == "success" ? "text-success" : "text-danger"
              }`}
            >
              {` ${statusName}`}
            </span>
          </div>
          <div className="my-2">
            <b>Order Date</b>: {date}
          </div>
          <div className="my-2">
            <h3>Billing details</h3>
          </div>
          <div className="my-1">
            <b>First Name</b>: {billingAddress.firstName}
          </div>
          <div className="my-1">
            <b>Last Name</b>: {billingAddress.lastName}
          </div>
          <div className="my-1">
            <b>Email Address</b>: {billingAddress.emailAddress}
          </div>
          <div className="my-1">
            <b>Address</b>: {billingAddress.address}
          </div>
          <div className="my-1">
            <b>Town</b>: {billingAddress.town}
          </div>
          <div className="my-1">
            <b>Country</b>: {billingAddress.country}
          </div>
          <div className="my-1">
            <b>Postal Code</b>: {billingAddress.postalCode}
          </div>
          <div className="my-1">
            <b>Mobile Number</b>: {billingAddress.mobile}
          </div>
          <div className="my-2">
            <b>Order Note</b>: {billingAddress.orderNote}
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-inverse table-responsive">
              <thead className="thead-inverse">
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {userOrderProduct.map((order, index: number) => (
                  <tr key={index}>
                    <td scope="row">{++index}</td>
                    <td>{order.name}</td>
                    <td>{order.quantity}</td>
                    <td>${order.price}</td>
                  </tr>
                ))}
                <tr>
                  <td>Shipping Cost:</td>
                  <td colSpan={2}></td>
                  <td>${shippingCost}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td colSpan={2}></td>
                  <td>${total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default OrderRow;
