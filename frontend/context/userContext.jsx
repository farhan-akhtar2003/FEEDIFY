import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New state variable

  const saveUser = (userData) => {
    setUser(userData);
    setIsLoading(false); // Set loading to false when user data is received
  };

  const removeUser = () => {
    setUser(null);
    setIsLoading(false); // Set loading to false when user data is removed
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("useeffect");
      try {
        const response = await axios.get("/profile");
        console.log("pageuseContext", response.data);
        saveUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        removeUser();
        // Optionally, handle the error here (e.g., set an error state)
      }
    };
    fetchUserProfile();
    // Cleanup function
    return () => {
      // Perform cleanup logic here
      console.log("Component unmounted");
      // For example, you can unsubscribe from event listeners or clear timers
    };
    
  }, []); // Empty dependency array

  return (
    <UserContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
