import { Link } from "react-router-dom";
import CartRow from "../components/CartRow";
import PageHeader from "../components/PageHeader";
import { getAllCarts } from "../features/cart/cart-slice";
import { useSelector } from "react-redux";
import { getAllProducts } from "../features/product/product-slice";
import { Cart as CartX, Product } from "../entities/api-util";
import { useAppSelector } from "../app/hooks";
import { numberRounder } from "../utils/StringUtils";
import useCheckAuth from "../hooks/useCheckAuth";

const Cart = () => {
  const carts = useSelector(getAllCarts);
  const products = useSelector(getAllProducts);
  const checkAuth = useCheckAuth();
  checkAuth();
  const userId = useAppSelector((state) => state.account.id);
  const userCart = carts.find((cart: CartX) => cart.userId == userId)?.products;
  const userCartTotal = carts.find(
    (cart: CartX) => cart.userId == userId
  )?.total;
  const displayCart = userCart == undefined || userCart.length > 0;

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
  // console.log(userCartProduct);

  return (
    <>
      <PageHeader homeName={"Home"} homeLink={"/"} pageName={"Cart"} />
      {/* <!-- Cart Page Start --> */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            {displayCart && (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {userCartProduct.map((userCartItem, index: number) => (
                    <CartRow
                      key={index}
                      id={userCartItem.id}
                      name={userCartItem.name}
                      imageUrl={userCartItem.imageUrl}
                      quantity={userCartItem.quantity}
                      price={userCartItem.price}
                    />
                  ))}
                </tbody>
              </table>
            )}
            {!displayCart && (
              <div className="text-center text-primary h2">
                Cart is currently empty, add Item to cart
              </div>
            )}
          </div>
          {displayCart && (
            <>
              <div className="mt-5">
                <input
                  type="text"
                  className="border-0 border-bottom rounded me-5 py-3 mb-4"
                  placeholder="Coupon Code"
                />
                <button
                  className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                  type="button"
                >
                  Apply Coupon
                </button>
              </div>
              <div className="row g-4 justify-content-end">
                <div className="col-8"></div>
                <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                  <div className="bg-light rounded">
                    <div className="p-4">
                      <h1 className="display-6 mb-4">
                        Cart <span className="fw-normal">Total</span>
                      </h1>
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="mb-0 me-4">Subtotal:</h5>
                        <p className="mb-0">${userCartTotal}</p>
                      </div>
                    </div>
                    <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                      <h5 className="mb-0 ps-4 me-4">Total</h5>
                      <p className="mb-0 pe-4">
                        ${numberRounder(userCartTotal)}
                      </p>
                    </div>
                    <Link
                      className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                      type="button"
                      to="/checkout"
                    >
                      Proceed Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
