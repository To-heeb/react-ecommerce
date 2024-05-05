import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/LocalStorageUtils";
import { generateRandomColor } from "../../utils/StringUtils";


const getInitialState = (): CategoryState[] => {
  const categoryState: CategoryState[]  = loadState('categories');

  if (categoryState) {
      return categoryState;
  }

  // If no valid stored state, return the default initial state
  return [
    {
      id: "nWpZU0-vFw1uFOeB9oVa9", 
      name: "Fruits",
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Fruits"}`,
    },
    {
      id: "nWpZU0-vFw1uFOeB9oVa2",
      name: "Vegetables",
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Vegetables"}`,
    },
    {
      id: "nWpZU0-vFw1uFOeB9oVf4",
      name: "Groceries",
      imageUrl: `https://via.placeholder.com/640x480.png/${generateRandomColor()}?text=${"Groceries"}`,
    
    },
  ]
};

interface CategoryState {
  id: string;
  name?: string;
  imageUrl: string;
}

const initialState: CategoryState[] = getInitialState();

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
      addCategory(state, action) {
          action.payload.id =  nanoid();
          state.push(action.payload)
          saveState("categories", state)
      },
      updateCategory(state, action) {
          const category = state.find(category => category.id == action.payload.id)
          if(category){
              category.name = action.payload.name
              category.imageUrl = action.payload.imageUrl
          }
          saveState("categories", state)
      },
      deleteCategory(state, action) {
          const category = state.find(category => category.id == action.payload.id)
          console.log(category)
          if(category){
              const newState = state.filter(category => category.id != action.payload.id)
              saveState("categories", newState)
              return newState
          }
          
      }
  }
});

// export const getCategoriesStatus = (state: CategoryState) => initialState.status;
// export const getCategoriesStatusCode = (state: CategoryState) => state.statusCode;
// export const getCategoriesLoadingStatus = (state: CategoryState) => state.loading;
// export const getCategoriesError = (state: CategoryState) => initialState.error;

// const initialState: CategoryState = {
//   data: [
//     { id: 1, name: "Fruits" },
//     { id: 2, name: "Vegetables" },
//     { id: 3, name: "Groceries" },
//   ],
//   loading: true,
//   status: StateStatus.Idle,
//   statusCode: HttpStatusCode.Continue,
//   error: null,
// };

// Define initial state
// interface CategoryState {
//   data: Category[]; // Array to hold category data
//   loading: boolean; // Loading state for async operations
//   status: StateStatus; //'idle' | 'success' | 'failed'`
//   statusCode: HttpStatusCode;
//   error: string | null; // Error message if any
// }

// export const createCategory = createAsyncThunk(
//   "categories/create",
//   async (categoryData: CategoryData) => {
//     try {
//       const response = await api_auth.post("categories", categoryData);
//       console.log(response);
//       if (response.status == HttpStatusCode.Ok) {
//         return response.data;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// export const getCategory = createAsyncThunk(
//   "categories/show",
//   async (categoryData: CategoryData) => {
//     try {
//       const categoryId = categoryData.id;
//       const response = await api_auth.get(`categories/${categoryId}`);
//       console.log(response);
//       if (response.status == HttpStatusCode.Ok) {
//         return response.data;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// export const getAllCategories = createAsyncThunk("categories/index", async () => {
//   try {
//     const response = await api_auth.get("categories");
//     console.log(response);
//     if (response.status == HttpStatusCode.Ok) {
//       return response.data;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// export const updateCategory = createAsyncThunk(
//   "categories/update",
//   async (categoryData: CategoryData) => {
//     try {
//       const categoryId = categoryData.id;
//       const response = await api_auth.put(`categories/${categoryId}`, categoryData);
//       console.log(response);
//       if (response.status == HttpStatusCode.NoContent) {
//         return response.data;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// export const deleteCategory = createAsyncThunk(
//   "categories/delete",
//   async (categoryData: CategoryData) => {
//     try {
//       const categoryId = categoryData.id;
//       const response = await api_auth.delete(`categories/${categoryId}`);
//       if (response.status == HttpStatusCode.NoContent) {
//         return response.data;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// // Create slice
// const categorySlice = createSlice({
//   name: "categories",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createCategory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Success;
//         if (action.payload.role) {
//           // iiiiuw
//         }
//         getAllCategories();
//       })
//       .addCase(createCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Failed;
//         state.error = action.error.message || "An error occurred";
//       })
//       .addCase(getCategory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Success;
//         console.log(action.payload);
//         state.data.push(action.payload.user);
//       })
//       .addCase(getCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Failed;
//         state.error = action.error.message || "An error occurred";
//       })
//       .addCase(getAllCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Success;
//         // attach role type here
//         console.log(action.payload);
//         state.data.push(action.payload.user);
//         return action.payload.categories;
//       })
//       .addCase(getAllCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Failed;
//         state.error = action.error.message || "An error occurred";
//       })
//       .addCase(updateCategory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Success;
//         if (action.payload.category) {
//           // iiiiuw
//         }
//         getAllCategories();
//         // state.data.push(action.payload.category);
//       })
//       .addCase(updateCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Failed;
//         state.error = action.error.message || "An error occurred";
//       })
//       .addCase(deleteCategory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Success;
//         if (action.payload.category) {
//           // iiiiuw
//         }
//         getAllCategories();
//       })
//       .addCase(deleteCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.status = StateStatus.Failed;
//         state.error = action.error.message || "An error occurred";
//       });
//   },
// });


export const getAllCategories = (state: { categories: CategoryState[] }) => state.category;

export const { addCategory, updateCategory, deleteCategory} = categorySlice.actions;

export default categorySlice.reducer;
