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

export function isLoggedIn() {
  return !!getCookieByName(AUTH_TOKEN);
}

export function logout() {
  if (isLoggedIn()) {
    document.cookie =
      encodeURIComponent(AUTH_TOKEN) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    // redirect to home
  }
}
