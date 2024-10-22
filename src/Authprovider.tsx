import { AuthProvider } from "@refinedev/core";

// to keep the example short and simple, we didn't send a request, and we save the token in localStorage.
// in real world, you should send a request and token should be saved in more secure place.
export const Authprovider: AuthProvider = {
  login: async ({ email }) => {
    localStorage.setItem("email", email);

    return {
      success: true,
    };
  },
  check: async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      return {
        authenticated: false,
      };
    }

    return {
      authenticated: true,
    };
  },
  logout: async () => {
    localStorage.removeItem("email");
    return {
      success: true,
    };
  },
  getIdentity: async () => {
    const email = localStorage.getItem("email");
    return {
      email,
    };
  },
  register: async ({ email }) => {
    localStorage.setItem("email", email);

    return {
      success: true,
      authenticated: true,
    };
  },
  onError: async () => {
    throw new Error("Not implemented");
  },
};
