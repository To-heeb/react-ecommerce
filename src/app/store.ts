import { configureStore } from "@reduxjs/toolkit";
import accountReducer from '../features/account/account-slice';
import userReducer from '../features/user/user-slice';
import roleReducer from '../features/role/role-slice';
import categoryReducer from '../features/category/category-slice';
import cartReducer from '../features/cart/cart-slice';
import productReducer from '../features/product/product-slice';
import orderReducer from '../features/order/order-slice';
import { signInUserReducer, signUpUserReducer } from '../features/auth/auth-api-slice';


export const store = configureStore({
    reducer: {
        account: accountReducer,
        authUserSignUp: signUpUserReducer,
        authUser: signInUserReducer,
        role: roleReducer,
        user: userReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
