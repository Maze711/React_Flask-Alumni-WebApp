import axios from "axios";
import { createContext } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {

  // Authenticates the user from the server and login
  const loginUser = async (alumni_id, password) => {
    try {
      const { data } = await axios.post("/api/auth", { // Fetches the data from the back-end server
        alumni_id, password
      }); 

      return data; // return the response.data

    } catch (error) {
      console.dir(error, { depth: null });
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response?.data?.error || error.message)
      }
    }
  };

  const values = {
    loginUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};