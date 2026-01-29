import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import LandingPage from "@/pages/landing";
import AuthPage from "@/pages/auth";
import ShopPage from "@/pages/shop";
import ProductDetail from "@/pages/product-details/index.tsx";
import OrderPage from "@/pages/orders";
import OrderDetailPage from "@/pages/order-details";
import ProfilePage from "@/pages/profile";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";

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
      { path: "profile", element: <ProfilePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
    ],
  },
]);
