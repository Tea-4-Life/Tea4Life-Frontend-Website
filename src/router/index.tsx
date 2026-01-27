import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import LandingPage from "@/pages/landing-page";
import AuthPage from "@/pages/auth";
import ShopPage from "@/pages/shop";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
    ],
  },
]);
