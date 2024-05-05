import { getUserId } from "../features/account/account-slice";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../features/cart/cart-slice";
import { CartItem } from "../entities/api-util";
import { useAppSelector } from "../app/hooks";

const useDeleteFromCart = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const isLoggedIn = useAppSelector((state) => state.account.loggedIn);

  if (!isLoggedIn) {
    return;
  }

  const deleteItemFromCart = (cartItem: CartItem) => {
    dispatch(deleteFromCart({ ...cartItem, userId: userId }));
  };

  return deleteItemFromCart;
};

export default useDeleteFromCart;
