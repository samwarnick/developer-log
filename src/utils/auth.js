import router from "@/router";
import jwt from "jsonwebtoken";
import { onLogin, onLogout } from "@/vue-apollo.js";
import setLoggedInGql from "@/graphql/SetLoggedIn.gql";

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

export async function ensureUserDataSet($apollo) {
  const token = jwt.decode(getCookieByName(AUTH_TOKEN));
  await $apollo.mutate({
    mutation: setLoggedInGql,
    variables: {
      isLoggedIn: true,
      user: {
        displayName: token.display_name,
        profileImage: token.profile_image
      }
    }
  });
}

export async function login($apollo) {
  await onLogin($apollo.provider.defaultClient);
  await ensureUserDataSet($apollo);
}

export function clearAuthCookie() {
  document.cookie =
    encodeURIComponent(AUTH_TOKEN) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}

export async function logout($apollo) {
  clearAuthCookie();
  await $apollo.mutate({
    mutation: setLoggedInGql,
    variables: {
      isLoggedIn: false,
      user: {
        displayName: "",
        profileImage: ""
      }
    }
  });
  router.push("/");
  await onLogout($apollo.provider.defaultClient);
}
