import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";



export const Login =() =>{
    const [user,setuser]=useState({
        email:"",
        password:""
    });

    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;

        setuser({
            ...user,[name]:value
        });
    }
    const navigate=useNavigate();
    const {storetoken}=useAuth();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),

            });
            const res_data=await response.json();
            console.log("response from server",res_data);
            if (response.ok) {
                
                storetoken(res_data.token);
                setuser({
                    email: "",
                    password: ""
                });
                navigate("/");
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return <>
        <main>
            <div className="section-reg">
                <div className="container grid grid-two-cols">
                    <div className="registration-img">
                        <img src="/images/b1.png" alt="register img" width="500" height="500"></img>
                    </div>
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Login</h1>
                        <br></br>
                        <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" placeholder="enter email" id="email" required autoComplete="off"  value={user.email} onChange={handleInput}/>
                            </div>

                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name="password" placeholder="password" id="password" required autoComplete="off" value={user.password} onChange={handleInput}/>
                            </div>
                            <br />

                            <button type="submit" className="btn btn-submit">login</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </>;
};