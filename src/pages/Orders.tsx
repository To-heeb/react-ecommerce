import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import { getAllOrders } from "../features/order/order-slice";
import OrderRow from "../components/OrderRow";
import { useAppSelector } from "../app/hooks";
import useCheckAuth from "../hooks/useCheckAuth";

const Orders = () => {
  const orders = useSelector(getAllOrders);
  const userId = useAppSelector((state) => state.account.id);
  const userOrders = orders.filter((order) => order.userId === userId);
  const checkAuth = useCheckAuth();
  checkAuth();

  return (
    <>
      <PageHeader homeName={"Home"} homeLink={"/"} pageName={"Orders"} />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Order ID</th>
                  <th scope="col">Delivery Method</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order, index: number) => (
                  <OrderRow
                    key={index}
                    id={order.id}
                    userId={order.userId}
                    counter={index}
                    orderProducts={order.products}
                    deliveryMethod={order.deliveryMethod}
                    paymentMethod={order.paymentMethod}
                    total={order.total}
                    shippingCost={order.shippingCost}
                    status={order.status}
                    date={order.date}
                    billingAddress={order.billingAddress}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
