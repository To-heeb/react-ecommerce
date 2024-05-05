import { lazy, Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Spinner from "../components/Spinner.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";

export const HomePage = lazy(() => import("../pages/Home.tsx"));
export const RolesPage = lazy(() => import("../pages/admin/Roles.tsx"));
export const ContactPage = lazy(() => import("../pages/Contact.tsx"));
export const UserPage = lazy(() => import("../pages/admin/Users.tsx"));
export const CartPage = lazy(() => import("../pages/Cart.tsx"));
export const OrdersPage = lazy(() => import("../pages/Orders.tsx"));
export const ProfilePage = lazy(() => import("../pages/Profile.tsx"));
export const CategoryProductsPage = lazy(
  () => import("../pages/CategoryProducts.tsx")
);
export const ProductsPage = lazy(() => import("../pages/Products.tsx"));
export const TestimonialsPage = lazy(() => import("../pages/Testimonials.tsx"));
export const SignInPage = lazy(() => import("../pages/SignIn.tsx"));
export const SignUpPage = lazy(() => import("../pages/SignUp.tsx"));
export const NotFoundPage = lazy(() => import("../pages/NotFound.tsx"));
export const CheckoutPage = lazy(() => import("../pages/Checkout.tsx"));
export const AdminCategoriesPage = lazy(
  () => import("../pages/admin/Categories.tsx")
);
export const AdminProductsPage = lazy(
  () => import("../pages/admin/Products.tsx")
);
export const ProductDetailsPage = lazy(
  () => import("../pages/ProductDetails.tsx")
);

function Router() {
  const routes = useRoutes([
    {
      element: (
        <DefaultLayout>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </DefaultLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: "profile", element: <ProfilePage /> },
        { path: "categories/:categoryId", element: <CategoryProductsPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "products/:productId", element: <ProductDetailsPage /> },
        { path: "testimonials", element: <TestimonialsPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "checkout", element: <CheckoutPage /> },
        { path: "signin", element: <SignInPage /> },
        { path: "signup", element: <SignUpPage /> },
      ],
    },
    {
      element: (
        <AdminLayout>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </AdminLayout>
      ),
      children: [
        {
          path: "admin",
          children: [
            { path: "", element: <HomePage />, index: true },
            { path: "profile", element: <ProfilePage /> },
            { path: "users", element: <UserPage /> },
            { path: "roles", element: <RolesPage /> },
            { path: "categories", element: <AdminCategoriesPage /> },
            { path: "products", element: <AdminProductsPage /> },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return routes;
}

export default Router;
