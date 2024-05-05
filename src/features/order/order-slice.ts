import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/LocalStorageUtils";
import { sub } from 'date-fns';

const getInitialState = (): OrderState[] => {
  const orderState: OrderState[] = loadState("orders");

  if (orderState) {
    return orderState;
  }

  // If no valid stored state, return the default initial state
  return [
    {
        id: "nWpZU0-vFw1xWJpz9oVd3",
        userId: "nWpWES-vFw1uSdeB9oVd3",
        products: [
            { id: "nWpZU0-vFw1uFOeB9oVw2", quantity: 2, price: 100 },
            { id: "nWpZU0-vFw1uFOerToVd3", quantity: 3, price: 50 },
        ],
        total: 350,
        shippingCost: 14,
        status: OrderStatus.Success,
        date: "",
        billingAddress: {
            firstName: "McCormick",
            lastName: "Katharine",
            address: "790 Ulpif Street",
            town: "Ettumkaw",
            country: "Panama",
            postalCode: "39328",
            mobile: "(837) 597-9604",
            emailAddress: "ludaf@vih.gd"
        },
        paymentMethod: PaymentMethod.Paypal,
        deliveryMethod: DeliveryMethod.DoorDelivery
    },
    {
        id: "nWNsty-vFw1JoWeB9oVd3",
        userId: "nWSder-vFw1uSdeB9oVd3",
        products: [
            { id: "nWpZU0-vFw1uFOeB9oVw2", quantity: 2, price: 100 },
            { id: "nWpZU0-vFw1uFOerToVd3", quantity: 3, price: 50 },
        ],
        total: 350,
        shippingCost: 3,
        status: OrderStatus.Success,
        date: "",
        billingAddress: {
            firstName: "Nina Schultz",
            lastName: "Mabel Moore",
            address: "939 Zoeze Loop",
            town: "Sowsorna",
            country: "Greenland",
            postalCode: "22393",
            mobile: "(958) 957-6291",
            emailAddress: "munkat@etotawo.ax"
        },
        paymentMethod: PaymentMethod.Paypal,
        deliveryMethod: DeliveryMethod.DoorDelivery
    }
  ];
};

interface Product {
    id: string;
    quantity: number;
    price: number;
  }

  interface Address {
    firstName : string;
    lastName : string;
    address: string;
    town: string;
    country: string;
    postalCode: string;
    mobile: string;
    emailAddress: string;
    orderNote?: string;
  }

  enum PaymentMethod {
    Paypal = "paypal",
    COD = "cod",
    Card = "card",
    CheckPayments = "check_payments",
    DirectBankTransfer = "direct_bank_transfer",
  }

  enum DeliveryMethod {
    DoorDelivery = "door_delivery",
    LocalStationPickup = "local_station_pickup",
  }

  enum OrderStatus {
    Pending = "pending",
    Success = "success",
    Failed = "failed"
  }

interface OrderState {
  id: string;
  userId: string;
  products: Product[];
  total: number;
  shippingCost: number;
  status: OrderStatus;
  billingAddress: Address;
  paymentMethod: PaymentMethod
  deliveryMethod: DeliveryMethod;
  date: string;
}

const initialState: OrderState[] = getInitialState();

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder(state, action) {
            let min = 0;
            const newOrder: OrderState = {
                id: nanoid(),
                userId: action.payload.userId,
                products: action.payload.products,
                shippingCost: action.payload.shippingCost,
                total: action.payload.total,
                status: OrderStatus.Success,
                billingAddress: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    address: action.payload.address,
                    town: action.payload.town,
                    country: action.payload.country,
                    postalCode: action.payload.postalCode,
                    mobile: action.payload.mobile,
                    emailAddress: action.payload.emailAddress,
                    orderNote: action.payload.orderNote
                },
                paymentMethod: action.payload.paymentMethod,
                deliveryMethod: action.payload.deliveryMethod,
                date: sub(new Date(), { minutes: min++ }).toISOString()
            }
            console.log(newOrder)
            state.push(newOrder);
            console.log(state)
            saveState("orders", state);
        },
        markAsSuccessful(state, action) {
            const order = state.find((order) => order.id == action.payload.id);
            if(order){
                order.status = OrderStatus.Success;
                saveState("orders", state);
            }

        },
        markAsFailed(state, action) {
            const order = state.find((order) => order.id == action.payload.id);
            if(order){
                order.status = OrderStatus.Failed;
                saveState("orders", state);
            }
        },
    },
});


export const getAllOrders = (state: OrderState) => state.order;

export const { markAsFailed, markAsSuccessful, addOrder } = orderSlice.actions;

export default orderSlice.reducer;