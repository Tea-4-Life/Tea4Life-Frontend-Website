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

const root = createRoot(document.getElementById("root")!);

const bootstrap = async () => {
  try {
    await initKeycloakSession();

    if (keycloak.authenticated) {
      const email = keycloak.tokenParsed?.email || "";

      const isReady = await waitForUserSync(email);
      if (!isReady) console.error(">>>> [SYNC] Timeout!");

      store.dispatch(setAuthSuccess({ email, roles: "" }));

      keycloak.onTokenExpired = () => {
        keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) console.log("Token refreshed");
        });
      };
    } else {
      store.dispatch(clearAuth());
    }
  } catch (err) {
    console.error("Auth Initialization Failed:", err);
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
