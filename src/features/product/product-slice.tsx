import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/LocalStorageUtils";
import { generateRandomColor } from "../../utils/StringUtils";

const getInitialState = (): ProductState[] => {
  const productState: ProductState[] = loadState("products");

  if (productState) {
    return productState;
  }

  // If no valid stored state, return the default initial state
  return [
    {
      id: "nWpZU0-vFw1uFOeB9oVd3",
      categoryId: "nWpZU0-vFw1uFOeB9oVa9",
      name: "Grapes",
      price: 4.99,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Grapes"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
      quantity: 30,
    },
    {
      id: "nWpZU0-vFw1uFOeB9oVw2",
      categoryId: "nWpZU0-vFw1uFOeB9oVa9",
      name: "Oranges",
      price: 4.99,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Oranges"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
      quantity: 100,
    },
    {
      id: "nWpZU0-vFw1uFOeB9oVg5",
      categoryId: "nWpZU0-vFw1uFOeB9oVa9",
      name: "Banana",
      price: 3.99,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Banana"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
      quantity: 250,
    },
    {
      id: "nWpZU0-vFw1uFOeB9oVh2",
      categoryId: "nWpZU0-vFw1uFOeB9oVa9",
      name: "Raspberries",
      price: 2.99,
      quantity: 50,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Raspberries"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
    {
      id: "nWpZU0-vFw1uFOeB9oVdh",
      categoryId: "nWpZU0-vFw1uFOeB9oVa9",
      name: "Apricots",
      price: 6.99,
      quantity: 50,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Apricots"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
    {
      id: "nWpZU0-vFw1uFOeB9oVa2",
      categoryId: "nWpZU0-vFw1uFOeB9oVa2",
      name: "Awesome Brocoli",
      price: 6.99,
      quantity: 50,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Awesome Brocoli"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
    {
      id: "nWpZU0-xFw1uFOeB9oVa2",
      categoryId: "nWpZU0-vFw1uFOeB9oVa2",
      name: "Parsely",
      price: 6.99,
      quantity: 50,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Parsely"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
    {
      id: "nWpZU0-xFw1uFOeB780a2",
      categoryId: "nWpZU0-vFw1uFOeB9oVa2",
      name: "Carrot",
      price: 6.09,
      quantity: 50,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Carrot"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
    {
      id: "nWjkU0-xFw1uFOeB780a2",
      categoryId: "nWpZU0-vFw1uFOeB9oVa2",
      name: "Lettuce",
      price: 6.09,
      quantity: 50,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Lettuce"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
    {
      id: "nWjkU0-xFw1uFOJNe780a2",
      categoryId: "nWpZU0-vFw1uFOeB9oVa2",
      name: "Spinach",
      price: 4.09,
      quantity: 50,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Spinach"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
    {
      id: "nWjkU0-34IjhFOJNe780a2",
      categoryId: "nWpZU0-vFw1uFOeB9oVf4",
      name: "Garri",
      price: 4.09,
      quantity: 50,
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Garri"}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
    },
  ];
};

const initialState: ProductState[] = getInitialState();

interface ProductState {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  description: string;
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct(state, action) {
      action.payload.id = nanoid();
      state.push(action.payload);
      saveState("products", state);
    },
    updateProduct(state, action) {
      const product = state.find((product) => product.id == action.payload.id);
      if (product) {
        product.name = action.payload.name;
        product.price = action.payload.price;
        product.imageUrl = action.payload.imageUrl;
        product.categoryId = action.payload.categoryId;
        product.description = action.payload.description;
      }
      saveState("products", state);
    },
    deleteProduct(state, action) {
      const product = state.find((product) => product.id == action.payload.id);
      console.log(product);
      if (product) {
        const newState = state.filter(
          (product) => product.id != action.payload.id
        );
        saveState("products", newState);
        return newState;
      }
    },
  },
});

// // Define initial state
// interface ProductState {
//   data: Product[]; // Array to hold product data
//   loading: boolean; // Loading state for async operations
//   status: StateStatus; //'idle' | 'success' | 'failed'`
//   statusCode: HttpStatusCode;
//   error: string | null; // Error message if any
// }

// const initialState: ProductState = {
//   data: [
//     { id: 1, name: "Grapes", price: 4.99 },
//     { id: 2, name: "Oranges", price: 4.99 },
//     { id: 3, name: "Banana", price: 3.99 },
//     { id: 4, name: "Raspberries", price: 2.99 },
//     { id: 4, name: "Apricots", price: 6.99 },
//   ],
//   loading: true,
//   status: StateStatus.Idle,
//   statusCode: HttpStatusCode.Continue,
//   error: null,
// };

// export const selectAllProducts = (state: ProductState) => initialState.data;
// export const getProductsStatus = (state: ProductState) => initialState.status;
// export const getProductsStatusCode = (state: ProductState) => state.statusCode;
// export const getProductsLoadingStatus = (state: ProductState) => state.loading;
// export const getProductsError = (state: ProductState) => initialState.error;

// export const createProduct = createAsyncThunk(
//   "products/create",
//   async (productData: ProductData) => {
//     try {
//       const response = await api_auth.post("products", productData);
//       console.log(response);
//       if (response.status == HttpStatusCode.Ok) {
//         return response.data;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// export const getProduct = createAsyncThunk(
//   "products/show",
//   async (productData: ProductData) => {
//     try {
//       const productId = productData.id;
//       const response = await api_auth.get(`products/${productId}`);
//       console.log(response);
//       if (response.status == HttpStatusCode.Ok) {
//         return response.data;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// export const getAllProducts = createAsyncThunk("products/index", async () => {
//   try {
//     const response = await api_auth.get("products");
//     console.log(response);
//     if (response.status == HttpStatusCode.Ok) {
//       return response.data;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// export const updateProduct = createAsyncThunk(
//   "products/update",
//   async (productData: ProductData) => {
//     try {
//       const productId = productData.id;
//       const response = await api_auth.put(`products/${productId}`, productData);
//       console.log(response);
//       if (response.status == HttpStatusCode.NoContent) {
//         return response.data;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "products/delete",
//   async (productData: ProductData) => {
//     try {
//       const productId = productData.id;
//       const response = await api_auth.delete(`products/${productId}`);
//       if (response.status == HttpStatusCode.NoContent) {
//         return response.data;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// Create slice
// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Success;
//         if (action.payload.product) {
//           // iiiiuw
//         }
//         getAllProducts();
//       })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Failed;
//         state.error = action.error.message || "An error occurred";
//       })
//       .addCase(getProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Success;
//         console.log(action.payload);
//         state.data.push(action.payload.product);
//       })
//       .addCase(getProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Failed;
//         state.error = action.error.message || "An error occurred";
//       })
//       .addCase(getAllProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Success;
//         // attach product type here
//         console.log(action.payload);
//         state.data.push(action.payload.product);
//         return action.payload.products;
//       })
//       .addCase(getAllProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Failed;
//         state.error = action.error.message || "An error occurred";
//       })
//       .addCase(updateProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Success;
//         if (action.payload.product) {
//           // iiiiuw
//         }
//         getAllProducts();
//         // state.data.push(action.payload.product);
//       })
//       .addCase(updateProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Failed;
//         state.error = action.error.message || "An error occurred";
//       })
//       .addCase(deleteProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Success;
//         if (action.payload.product) {
//           // iiiiuw
//         }
//         getAllProducts();
//       })
//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Failed;
//         state.error = action.error.message || "An error occurred";
//       });
//   },
// });

export const getAllProducts = (state: { products: ProductState[] }) =>
  state.product;

export const { addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
