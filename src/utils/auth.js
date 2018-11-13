import router from "@/router";
import jwt from "jsonwebtoken";
import { onLogin, onLogout } from "@/vue-apollo.js";
import setLoggedInGql from "@/graphql/SetLoggedIn.gql";
import { client } from "@/vue-apollo";

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

export async function ensureUserDataSet() {
  const token = jwt.decode(getCookieByName(AUTH_TOKEN));
  await client.mutate({
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

export async function login() {
  await onLogin(client);
  await ensureUserDataSet();
}

export async function logout() {
  document.cookie =
    encodeURIComponent(AUTH_TOKEN) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  await client.mutate({
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
  await onLogout(client);
}
