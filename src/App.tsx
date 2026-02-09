import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { useAppSelector } from "@/features/store";
import OnboardingPage from "@/pages/onboarding";

function App() {
  const { isAuthenticated, onboarded } = useAppSelector((state) => state.auth);

  if (isAuthenticated && !onboarded) {
    return <OnboardingPage />;
  }

  return <RouterProvider router={router} />;
}

export default App;
