import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingScreen from "@/components/custom/LoadingScreen";

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Helper để lazy load component kèm theo Suspense LoadingScreen
const Loadable = (Component: any) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Layouts
const RootLayout = Loadable(lazy(() => import("@/layouts/RootLayout")));
const AdminLayout = Loadable(lazy(() => import("@/layouts/AdminLayout")));
const DriverLayout = Loadable(lazy(() => import("@/layouts/DriverLayout")));
const ProfileLayout = Loadable(
  lazy(() => import("@/pages/customer-route-pages/profile/layout")),
);

// Public Pages
const LandingPage = Loadable(
  lazy(() => import("@/pages/public-route-pages/landing")),
);
const ShopPage = Loadable(
  lazy(() => import("@/pages/public-route-pages/shop")),
);
const ProductDetail = Loadable(
  lazy(() => import("@/pages/public-route-pages/product-details/index.tsx")),
);
const CartPage = Loadable(
  lazy(() => import("@/pages/public-route-pages/cart")),
);
const BrandsListPage = Loadable(
  lazy(() => import("@/pages/public-route-pages/brands")),
);
const CategoriesPage = Loadable(
  lazy(() => import("@/pages/public-route-pages/categories")),
);
const AboutPage = Loadable(
  lazy(() => import("@/pages/public-route-pages/about")),
);

// Customer Pages
const OrderPage = Loadable(
  lazy(() => import("@/pages/customer-route-pages/orders")),
);
const OrderDetailPage = Loadable(
  lazy(() => import("@/pages/customer-route-pages/order-details")),
);
const CheckoutPage = Loadable(
  lazy(() => import("@/pages/customer-route-pages/checkout")),
);
const GeneralPage = Loadable(
  lazy(() => import("@/pages/customer-route-pages/profile/general")),
);
const AddressPage = Loadable(
  lazy(() => import("@/pages/customer-route-pages/profile/address")),
);
const CreateAddressPage = Loadable(
  lazy(() => import("@/pages/customer-route-pages/profile/address/create")),
);
const EditAddressPage = Loadable(
  lazy(() => import("@/pages/customer-route-pages/profile/address/edit")),
);
const SecurityPage = Loadable(
  lazy(() => import("@/pages/customer-route-pages/profile/security")),
);

// Admin Pages
const AdminDashboard = Loadable(
  lazy(() => import("@/pages/admin-route-pages/dashboard")),
);
const AdminProductsPage = Loadable(
  lazy(() => import("@/pages/admin-route-pages/products")),
);
const AdminOrdersPage = Loadable(
  lazy(() => import("@/pages/admin-route-pages/orders")),
);
const AdminUsersPage = Loadable(
  lazy(() => import("@/pages/admin-route-pages/users")),
);
const AdminReportsPage = Loadable(
  lazy(() => import("@/pages/admin-route-pages/reports")),
);
const AdminRegionsPage = Loadable(
  lazy(() => import("@/pages/admin-route-pages/regions")),
);
const AdminCategoriesPage = Loadable(
  lazy(() => import("@/pages/admin-route-pages/categories")),
);
const AdminProductOptionsPage = Loadable(
  lazy(() => import("@/pages/admin-route-pages/product-options")),
);
const AdminPermissionsPage = Loadable(
  lazy(() => import("@/pages/admin-route-pages/permissions")),
);
const AdminRolesPage = Loadable(
  lazy(() => import("@/pages/admin-route-pages/roles")),
);
const AdminRoleCreatePage = Loadable(
  lazy(() => import("@/pages/admin-route-pages/roles/create")),
);

// Driver Pages
const DriverDashboard = Loadable(
  lazy(() => import("@/pages/driver-route-pages/dashboard")),
);
const DriverOrders = Loadable(
  lazy(() => import("@/pages/driver-route-pages/orders")),
);
const DriverOrderDetail = Loadable(
  lazy(() => import("@/pages/driver-route-pages/order-details")),
);

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
