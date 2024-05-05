import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../features/account/account-slice";
import { CartItem } from "../entities/api-util";
import { removeFromCart } from "../features/cart/cart-slice";

const useRemoveFromCart = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const removeItemFromCart = (cartItem: CartItem) => {
    dispatch(removeFromCart({ ...cartItem, userId: userId }));
  };

  return removeItemFromCart;
};

export default useRemoveFromCart;
