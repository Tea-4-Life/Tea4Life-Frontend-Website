import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import keycloak from "./lib/keycloak.ts";
import {
  store,
  setAuthSuccess,
  setAuthFailure,
  clearAuth,
} from "@/features/store";
import { initKeycloakSession } from "@/lib/auth-init";
import "./index.css";
import { waitForUserSync } from "./services/authApi.ts";
import LoadingScreen from "./components/custom/LoadingScreen.tsx";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const root = createRoot(document.getElementById("root")!);

const bootstrap = async () => {
  root.render(
    <LoadingScreen
      title="Tea4Life"
      subtitle="Đang khởi tạo kết nối bảo mật..."
    />,
  );

  try {
    await initKeycloakSession();

    if (keycloak.authenticated) {
      const email = keycloak.tokenParsed?.email || "";

      root.render(
        <LoadingScreen
          title="Tea4Life"
          subtitle="Đang chuẩn bị không gian trà cho bạn..."
        />,
      );
      await delay(3000);

      root.render(
        <LoadingScreen
          title="Tea4Life"
          subtitle="Đang đồng bộ dữ liệu tài khoản từ hệ thống..."
        />,
      );
      const isReady = await waitForUserSync();

      if (!isReady) {
        console.error("[Tea4Life] Hết thời gian đồng bộ");
      }

      store.dispatch(setAuthSuccess({ email, roles: "" }));

      keycloak.onTokenExpired = () => {
        keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) console.log("[Tea4Life] Làm mới token thành công");
        });
      };
    } else {
      store.dispatch(clearAuth());
    }
  } catch (err) {
    console.error("[Tea4Life] Khởi tạo tính năng Auth thất bại:", err);
    store.dispatch(setAuthFailure());
  } finally {
    root.render(
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>,
    );
  }
};

bootstrap();
