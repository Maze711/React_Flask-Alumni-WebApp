import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext); // Let's us use the context

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(()=> {
    // Initialize user state from localStorage (for persistent login across page refreshes)
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null
  });

  // saves the user to local storage if the state is not empty or changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Authenticates the user from the server and login
  const loginUser = async (alumni_id, password) => {
    try {
      const { data } = await axios.post("/api/auth", {
        // Fetches the data from the back-end server
        alumni_id,
        password,
      });
      setUser(data);

      return data; // return the response.data
    } catch (error) {
      setUser(null)
      console.dir(error, { depth: null });
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      }
    }
  };

  // Logout the user and remove them in local storage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  const values = {
    loginUser,
    user,
    logout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
