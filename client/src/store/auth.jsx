import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem('token'));
    const [user,setUser]=useState(" ");
    const [service,setServices]=useState([]);
    const authorization=`Bearer ${token}`;

    const storetoken=(serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token",serverToken);
    };
    let isLoggedIN = !!token;

    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem("token");
    };

    // jwt authentication to get currently logged in user data 

    const userAuthentication = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/auth/user", {
            method: "GET",
            headers: {
              Authorization: authorization,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
    
            // our main goal is to get the user data 👇
            setUser(data.userdata);
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.log(error);
        }
      };

      const getServices=async()=>{
        try {
          const response=await fetch("http://localhost:5000/api/data/service",{method:"GET",});
          if(response.ok){
            const services=await response.json();
            setServices(services.msg);
            console.log(services.msg);
          }
          console.log("service",response);
        } catch (error) {
          console.log(error);
        }
      }

    useEffect(()=>{
        userAuthentication();
        getServices();
    },[]);

    return( <AuthContext.Provider value={{storetoken,LogoutUser,isLoggedIN,user,service,authorization}}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
