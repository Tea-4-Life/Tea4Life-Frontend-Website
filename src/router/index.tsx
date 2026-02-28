import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import RootLayout from "@/layouts/RootLayout";
import AdminLayout from "@/layouts/AdminLayout";
import DriverLayout from "@/layouts/DriverLayout"; // Đã chuyển về @/layouts
import ProfileLayout from "@/pages/customer-route-pages/profile/layout";

// Public Pages
import LandingPage from "@/pages/public-route-pages/landing";
import ShopPage from "@/pages/public-route-pages/shop";
import ProductDetail from "@/pages/public-route-pages/product-details/index.tsx";
import CartPage from "@/pages/public-route-pages/cart";
import BrandsListPage from "@/pages/public-route-pages/brands";
import CategoriesPage from "@/pages/public-route-pages/categories";
import AboutPage from "@/pages/public-route-pages/about";

// Customer Pages
import OrderPage from "@/pages/customer-route-pages/orders";
import OrderDetailPage from "@/pages/customer-route-pages/order-details";
import CheckoutPage from "@/pages/customer-route-pages/checkout";
import GeneralPage from "@/pages/customer-route-pages/profile/general";
import AddressPage from "@/pages/customer-route-pages/profile/address";
import CreateAddressPage from "@/pages/customer-route-pages/profile/address/create";
import EditAddressPage from "@/pages/customer-route-pages/profile/address/edit";
import SecurityPage from "@/pages/customer-route-pages/profile/security";

// Admin Pages
import AdminDashboard from "@/pages/admin-route-pages/dashboard";
import AdminProductsPage from "@/pages/admin-route-pages/products";
import AdminOrdersPage from "@/pages/admin-route-pages/orders";
import AdminUsersPage from "@/pages/admin-route-pages/users";
import AdminReportsPage from "@/pages/admin-route-pages/reports";
import AdminRegionsPage from "@/pages/admin-route-pages/regions";
import AdminCategoriesPage from "@/pages/admin-route-pages/categories";
import AdminProductOptionsPage from "@/pages/admin-route-pages/product-options";
import AdminPermissionsPage from "@/pages/admin-route-pages/permissions";
import AdminRolesPage from "@/pages/admin-route-pages/roles";
import AdminRoleCreatePage from "@/pages/admin-route-pages/roles/create";

// Driver Pages (Import theo kiểu folder con / index.tsx)
import DriverDashboard from "@/pages/driver-route-pages/dashboard";
import DriverOrders from "@/pages/driver-route-pages/orders";
import DriverOrderDetail from "@/pages/driver-route-pages/order-details";
// import DriverOrders from "@/pages/driver-route-pages/orders";
// import DriverOrderDetail from "@/pages/driver-route-pages/order-details";

// --- 1. NHÓM ROUTE CÔNG KHAI (PUBLIC) ---
const publicRoutes = [
  { index: true, element: <LandingPage /> },
  { path: "shop", element: <ShopPage /> },
  { path: "shop/products/:id", element: <ProductDetail /> },
  { path: "cart", element: <CartPage /> },
  { path: "brands", element: <BrandsListPage /> },
  { path: "categories", element: <CategoriesPage /> },
  { path: "about", element: <AboutPage /> },
];

// --- 2. NHÓM ROUTE KHÁCH HÀNG (CUSTOMER) ---
const customerRoutes = [
  { path: "order", element: <OrderPage /> },
  { path: "order/:id", element: <OrderDetailPage /> },
  { path: "checkout", element: <CheckoutPage /> },
  {
    path: "profile",
    element: <ProfileLayout />,
    children: [
      { index: true, element: <Navigate to="general" replace /> },
      { path: "general", element: <GeneralPage /> },
      { path: "address", element: <AddressPage /> },
      { path: "address/create", element: <CreateAddressPage /> },
      { path: "address/edit/:id", element: <EditAddressPage /> },
      { path: "security", element: <SecurityPage /> },
    ],
  },
];

// --- 3. NHÓM ROUTE QUẢN TRỊ (ADMIN) ---
const adminRoutes = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: "dashboard", element: <AdminDashboard /> },
  { path: "products", element: <AdminProductsPage /> },
  { path: "orders", element: <AdminOrdersPage /> },
  { path: "categories", element: <AdminCategoriesPage /> },
  { path: "regions", element: <AdminRegionsPage /> },
  { path: "product-options", element: <AdminProductOptionsPage /> },
  { path: "users", element: <AdminUsersPage /> },
  { path: "reports", element: <AdminReportsPage /> },
  { path: "permissions", element: <AdminPermissionsPage /> },
  { path: "roles", element: <AdminRolesPage /> },
  { path: "roles/create", element: <AdminRoleCreatePage /> },
  { path: "roles/edit/:id", element: <AdminRoleCreatePage /> },
];

// --- 4. NHÓM ROUTE TÀI XẾ (DRIVER) ---
const driverRoutes = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: "dashboard", element: <DriverDashboard /> },
  { path: "orders", element: <DriverOrders /> },
  { path: "orders/:id", element: <DriverOrderDetail /> },
];

// --- CẤU TRÌNH ROUTER CHÍNH ---
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [...publicRoutes, ...customerRoutes],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: adminRoutes,
  },
  {
    path: "/driver",
    element: <DriverLayout />,
    children: driverRoutes,
  },
]);
