import { createContext, useContext, useEffect, useState } from "react";
export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = "http://localhost:8000"
  const [User, setUser] = useState("")
  const [Provider, setProvider] = useState("")
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true)
  const [isUser , setIsUser] = useState(false)
  const [isProvider , setIsProvider] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  // function of storing the tokens in the localstorage
  const storeTokenLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };
  
  useEffect(() => {
    const UserProfile = async () => {
    if(!token){
      setUser("")
    }

    try{
      const response = await fetch(`${API_URL}/api/auth/user/profile`, {
        method: "GET",
        headers: {
          Authorization : `Bearer ${token}`          
        },
      });

      const data = await response.json()
      console.log(data)
      if(response.ok){
        setLoading(false)
        setUser(data.msg);
        if(data.msg.controll === 0){
          setIsAdmin(true)
        }
        setIsUser(true)
      }
    }catch(error){
      setLoading(false)
      console.log("Error in loading")
    }
  }

  
  const ProviderProfile = async () => {
    if (!token) {
        setProvider(null);
        setLoading(false);
        return;
    }

    try {
        setLoading(true); // Start loading
        const response = await fetch(`${API_URL}/api/auth/educator/profile`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            setProvider(data.msg); // Set provider data
            setIsProvider(true)
        } else {
            setProvider(null); // Handle unauthorized response
        }
    } catch (error) {
        console.log("Error in loading", error);
        setProvider(null);
    } finally {
        setLoading(false); // End loading
    }
};


  ProviderProfile();
  UserProfile();
}, [token])
 
 return (
    <Authcontext.Provider
      value={{
        storeTokenLocalStorage, 
        token,
        User,
        loading,
        isUser,
        isProvider,
        Provider,
        isAdmin
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  const authcontextValue = useContext(Authcontext);
  if (!authcontextValue) {
    throw new Error("Auth context is not working properly");
  }
  return authcontextValue;
};
