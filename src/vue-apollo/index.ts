import {
  ApolloLink,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const AUTH_TOKEN = "apollo_token";

const httpLink = new HttpLink({
  // URL FOR API
  //uri: process.env.VUE_APP_API_URI + "/graphql",
  uri: "http://localhost:3001/graphql",
  credentials: "include"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  // Check if the current access token is valid
  isTokenValidOrUndefined: () => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (!token) return true;

    try {
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  },
  // Fetch new access token
  fetchAccessToken: () => {
    console.log(process.env.VUE_APP_API_URI + "/test");
    return fetch(process.env.VUE_APP_API_URI + "/refresh_token", {
      method: "POST",
      credentials: "include"
    });
  },
  // Set new access token
  handleFetch: accessToken => {
    localStorage.setItem(AUTH_TOKEN, accessToken);
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([refreshTokenLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

// Manually call this when user log in
export async function onLogin(
  apolloClient: ApolloClient<NormalizedCacheObject>,
  token: string
) {
  if (typeof localStorage !== "undefined" && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (login)", "color: orange;", e.message);
  }
}

// Manually call this when user log out
export async function onLogout(
  apolloClient: ApolloClient<NormalizedCacheObject>
) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}
