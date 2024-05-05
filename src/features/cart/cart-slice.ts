import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/LocalStorageUtils";
import { numberRounder } from "../../utils/StringUtils";

const getInitialState = (): CartState[] => {
  const cartState: CartState[] = loadState("carts");

  if (cartState) {
    return cartState;
  }

  // If no valid stored state, return the default initial state
  return [
    { 
        id: "nWpZU0-vFw1xWdeF9oVd3",
        userId: "nWpWES-vFw1uSdeB9oVd3", 
        products: [
            {id: "nWpZU0-vFw1uFOeB9oVw2", quantity: 2, price: 100},
            {id: "nWpZU0-vFw1uFOerToVd3", quantity: 3, price: 50},
        ],
        total: 350
    },
    { 
        id: "nWNsty-vFw1uSdeB9oVd3", 
        userId: "nWSder-vFw1uSdeB9oVd3", 
        products: [
            {id: "nWpZU0-vFw1uFOeB9oVw2", quantity: 2, price: 100},
            {id: "nWpZU0-vFw1uFOerToVd3", quantity: 3, price: 50},
        ],
        total: 350
     }
  ];
};

interface Product {
    id: string;
    quantity: number;
    price: number;
  }

interface CartState {
  id: string;
  userId: string;
  products: Product[];
  total: number;
}

const initialState: CartState[] = getInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const cart = state.find((cart) => cart.userId == action.payload.userId);
      if (cart) {
        // cart.userId = action.payload.userId;
        const product = cart.products.find((product) => product.id == action.payload.productId)
        if (product) {
            product.quantity += 1
            console.log("product quantity: ",product.quantity)
        }else{
          cart.products.push({id: action.payload.productId, quantity: 1, price: numberRounder(action.payload.price)});
        }
        cart.total += numberRounder(action.payload.price)
        cart.total = numberRounder(cart.total)
      }else{
        const newCart: CartState = {
          id: "",
          userId: "",
          products: [],
          total: 0
        }
        newCart.id = nanoid();
        newCart.userId = action.payload.userId;
        newCart.products = []
        newCart.products.push({
              id: action.payload.productId,
              quantity: 1, 
              price: numberRounder(action.payload.price)
            })
        newCart.total = numberRounder(action.payload.price)
        state.push(newCart);
      }
      saveState("carts", state);
    },
    deleteFromCart(state, action) {
      const cart = state.find((cart) => cart.userId == action.payload.userId);
      // console.log(cart);
      if (cart) {
        const product = cart.products.find((product) => product.id == action.payload.productId)
        if (product) {
          const recalcTotal = numberRounder(cart.total - (product.quantity * product.price))
          const newTotal = numberRounder(recalcTotal)
          const newProducts = cart.products.filter(product => product.id != action.payload.productId)
          
          cart.products = newProducts
          cart.total = newTotal
          saveState("carts", state);
        }
      }
    },
    removeFromCart(state, action) {
      const cart = state.find((cart) => cart.userId == action.payload.userId);
      // console.log(cart);
      if (cart) {
        const product = cart.products.find((product) => product.id == action.payload.productId)
        if (product) {
          product.quantity -= 1
          const recalcTotal = cart.total - product.price
          const newTotal = numberRounder(recalcTotal)
          if(product.quantity <= 0){
            const newProducts = cart.products.filter(product => product.id != action.payload.productId)
            cart.products = newProducts
          }
          cart.total = numberRounder(newTotal)
          saveState("carts", state);
        }
      }
    },
    checkoutFromCart(state, action) {
      const cart = state.find((cart) => cart.userId == action.payload.userId);
      // console.log(cart);
      if (cart) {
        cart.products = []
        cart.total = 0  
        saveState("carts", state);
      }
    }
  },
});

export const getAllCarts = (state: CartState) => state.cart;

export const { addToCart, removeFromCart, deleteFromCart, checkoutFromCart } = cartSlice.actions;

export default cartSlice.reducer;
