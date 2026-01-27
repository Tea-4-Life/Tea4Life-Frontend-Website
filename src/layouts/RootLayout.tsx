import { Outlet } from "react-router-dom";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
