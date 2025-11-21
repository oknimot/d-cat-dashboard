import { User } from "../types/auth.types";

const USER_SESSION_KEY = "userSessionClaims";

const mockUser: User = {
  id: "12345-abcde",
  name: "Tom Gordon",
  email: "tom@mocked.com",
  avatarUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcm8PF75uj2SZcZlb3jne20yz-wGYIzt2r-A&s`,
};

/**
 * Simulates a login request.
 * In a real app, this would involve redirecting to an OAuth provider.
 * Here, we just create a session in localStorage.
 */
export const login = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(mockUser));
        resolve(mockUser);
      } catch (error) {
        console.error("Could not save user session to localStorage.", error);
      }
    }, 1500);
  });
};

/**
 * Simulates a logout request.
 * Clears the user session from localStorage.
 */
export const logout = (): void => {
  try {
    localStorage.removeItem(USER_SESSION_KEY);
  } catch (error) {
    console.error("Could not remove user session from localStorage.", error);
  }
};

/**
 * Checks for an existing user session in localStorage.
 * This is used to keep the user logged in across page reloads.
 */
export const getSession = (): Promise<User | null> => {
  return new Promise((resolve) => {
    try {
      const sessionData = localStorage.getItem(USER_SESSION_KEY);
      if (sessionData) {
        const user = JSON.parse(sessionData) as User;
        resolve(user);
      } else {
        resolve(null);
      }
    } catch (error) {
      console.error(
        "Could not retrieve user session from localStorage.",
        error
      );
      resolve(null);
    }
  });
};
