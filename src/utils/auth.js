import router from "@/router";
import jwt from "jsonwebtoken";
import { onLogin, onLogout } from "@/vue-apollo.js";
import loggedInGql from "@/graphql/LoggedIn.gql";
import userGql from "@/graphql/User.gql";
import setLoggedInGql from "@/graphql/SetLoggedIn.gql";

let apollo;

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

export async function isLoggedIn() {
  if (apollo && isAuthenticated()) {
    const {
      data: { isLoggedIn }
    } = await apollo.query({ query: loggedInGql });
    const {
      data: { user }
    } = await apollo.query({ query: userGql });
    return isLoggedIn && user;
  }
}

export async function login($apollo) {
  apollo = $apollo;
  await onLogin($apollo.provider.defaultClient);
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

export async function logout($apollo) {
  apollo = $apollo;
  document.cookie =
    encodeURIComponent(AUTH_TOKEN) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
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
