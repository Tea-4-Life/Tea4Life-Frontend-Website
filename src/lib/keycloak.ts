import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:9000",
  realm: "Tea4Life",
  clientId: "tea4life-spa-main",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
