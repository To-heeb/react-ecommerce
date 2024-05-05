import { numberRounder } from "../utils/StringUtils";

interface CheckoutItemProps {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

const CheckoutItem = ({
  id,
  name,
  imageUrl,
  quantity,
  price,
}: CheckoutItemProps) => {
  return (
    <>
      <tr>
        <th scope="row">
          <div className="d-flex align-items-center mt-2">
            <img
              src={imageUrl}
              className="img-fluid rounded-circle"
              style={{ width: "90px", height: "90px" }}
              alt=""
            />
          </div>
        </th>
        <td className="py-5">{name}</td>
        <td className="py-5">${price}</td>
        <td className="py-5">{quantity}</td>
        <td className="py-5">${numberRounder(price * quantity)}</td>
      </tr>
    </>
  );
};

export default CheckoutItem;
