import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import LandingPage from "@/pages/landing";
import AuthPage from "@/pages/auth";
import ShopPage from "@/pages/shop";
import ProductDetail from "@/pages/product-details/index.tsx";
import OrderPage from "@/pages/orders";
import OrderDetailPage from "@/pages/order-details";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import BrandsListPage from "@/pages/brands";
import CategoriesPage from "@/pages/categories";
import ProfileLayout from "@/pages/profile/layout";
import GeneralPage from "@/pages/profile/general";
import AddressPage from "@/pages/profile/address";
import SecurityPage from "@/pages/profile/security";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin-route-pages/dashboard";
import AdminProductsPage from "@/pages/admin-route-pages/products";
import AdminOrdersPage from "@/pages/admin-route-pages/orders";
import AdminUsersPage from "@/pages/admin-route-pages/users";
import AdminReportsPage from "@/pages/admin-route-pages/reports";
import AdminRegionsPage from "@/pages/admin-route-pages/regions";
import AdminCategoriesPage from "@/pages/admin-route-pages/categories";
import AdminBrandsPage from "@/pages/admin-route-pages/brands";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "shop/products/:id", element: <ProductDetail /> },
      { path: "order", element: <OrderPage /> },
      { path: "order/:id", element: <OrderDetailPage /> },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <Navigate to="general" replace /> },
          { path: "general", element: <GeneralPage /> },
          { path: "address", element: <AddressPage /> },
          { path: "security", element: <SecurityPage /> },
        ],
      },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "brands", element: <BrandsListPage /> },
      { path: "categories", element: <CategoriesPage /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "products", element: <AdminProductsPage /> },
      { path: "orders", element: <AdminOrdersPage /> },
      { path: "categories", element: <AdminCategoriesPage /> },
      { path: "regions", element: <AdminRegionsPage /> },
      { path: "brands", element: <AdminBrandsPage /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "reports", element: <AdminReportsPage /> },
    ],
  },
]);
