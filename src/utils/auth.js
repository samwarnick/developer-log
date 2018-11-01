import router from "@/router";
import store from "@/store";
import jwt from "jsonwebtoken";
import { onLogin, onLogout } from "@/vue-apollo.js";

export const AUTH_TOKEN = "apollo-token";

export function getCookieByName(name) {
  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          "(?:(?:^|.*;)\\s*" +
            encodeURIComponent(name).replace(/[-.+*]/g, "\\$&") +
            "\\s*\\=\\s*([^;]*).*$)|^.*$"
        ),
        "$1"
      )
    ) || null
  );
}

export function isAuthenticated() {
  return !!getCookieByName(AUTH_TOKEN);
}

export function isLoggedIn() {
  return isAuthenticated() && store.state.isLoggedIn && store.state.user;
}

export async function login(apolloClient) {
  const token = jwt.decode(getCookieByName(AUTH_TOKEN));
  store.dispatch("login", {
    displayName: token.display_name,
    profileImage: token.profile_image
  });
  await onLogin(apolloClient);
}

export async function logout(apolloClient) {
  document.cookie =
    encodeURIComponent(AUTH_TOKEN) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  await store.dispatch("logout");
  router.push("/");
  await onLogout(apolloClient);
}
