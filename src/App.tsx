import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { useAppSelector } from "@/features/store";
import OnboardingPage from "@/pages/onboarding";
import { Toaster } from "sonner";

function App() {
  const { isAuthenticated, onboarded } = useAppSelector((state) => state.auth);

  if (isAuthenticated && !onboarded) {
    return (
      <>
        <Toaster richColors position="top-right" />
        <OnboardingPage />
      </>
    );
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
