import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cart-slice";
import { CartItem } from "../entities/api-util";
import { getUserId } from "../features/account/account-slice";
import { useAppSelector } from "../app/hooks";

const useAddToCart = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const isLoggedIn = useAppSelector((state) => state.account.loggedIn);

  if (!isLoggedIn) {
    return;
  }

  const addItemToCart = (cartItem: CartItem) => {
    dispatch(addToCart({ ...cartItem, userId: userId }));
  };

  return addItemToCart;
};

export default useAddToCart;
