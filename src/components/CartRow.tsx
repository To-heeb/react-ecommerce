import Swal from "sweetalert2";
import useRemoveFromCart from "../hooks/useRemoveFromCart";
import useDeleteFromCart from "../hooks/useDeleteFromCart";
import useAddToCart from "../hooks/useAddToCart";
import { numberRounder } from "../utils/StringUtils";

interface CartRowProps {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

const CartRow = ({ id, name, quantity, imageUrl, price }: CartRowProps) => {
  const removeFromCart = useRemoveFromCart();
  const deleteFromCart = useDeleteFromCart();
  const addToCart = useAddToCart();

  const handleDeleteFromCartClick = (e: MouseEvent) => {
    e.preventDefault();

    deleteFromCart({
      userId: "",
      productId: id,
      price: price,
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Removed from cart",
      showConfirmButton: false,
      timer: 1300,
    });
  };

  const handleAddToCartClick = (e: MouseEvent) => {
    e.preventDefault();

    addToCart({
      userId: "",
      productId: id,
      price: price,
    });
  };

  const handleRemoveFromCartClick = (e: MouseEvent) => {
    e.preventDefault();

    removeFromCart({
      userId: "",
      productId: id,
      price: price,
    });
  };

  return (
    <>
      <tr>
        <th scope="row">
          <div className="d-flex align-items-center">
            <img
              src={imageUrl}
              className="img-fluid me-5 rounded-circle"
              style={{ width: "80px", height: "80px" }}
              alt=""
            />
          </div>
        </th>
        <td>
          <p className="mb-0 mt-4">{name}</p>
        </td>
        <td>
          <p className="mb-0 mt-4">${price}</p>
        </td>
        <td>
          <div className="input-group quantity mt-4" style={{ width: "100px" }}>
            <div
              className="input-group-btn"
              onClick={(e) => handleRemoveFromCartClick(e)}
            >
              <button className="btn btn-sm btn-minus rounded-circle bg-light border">
                <i className="fa fa-minus"></i>
              </button>
            </div>
            <div className="form-control form-control-sm text-center border-0 bg-white">
              {quantity}
            </div>
            <div
              className="input-group-btn"
              onClick={(e) => handleAddToCartClick(e)}
            >
              <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </td>
        <td>
          <p className="mb-0 mt-4">$ {numberRounder(price * quantity)}</p>
        </td>
        <td>
          <button
            className="btn btn-md rounded-circle bg-light border mt-4"
            onClick={(e) => handleDeleteFromCartClick(e)}
          >
            <i className="fa fa-times text-danger"></i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartRow;
