import { useState } from "react";
import { useAuth } from "../store/auth";
export const About =() =>{
    const [name,setname]=useState({uname:"About"})
    const {user}=useAuth();

    const [userData,setUserData]=useState(true);

    
    if(userData && user){
        setname({uname:user.username});
        setUserData(false);
    }
    return (<h1>hello {name.uname}</h1>);
};