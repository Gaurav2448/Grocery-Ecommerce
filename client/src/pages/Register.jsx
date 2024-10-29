import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
    const [user, setuser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setuser({
            ...user, [name]: value
        });
    }
    const navigate=useNavigate();
    const {storetoken}=useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
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
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                });
                navigate("/login");
            }
            else{
                toast(res_data.extraDetails? res_data.extraDetails:res_data.message)
            }
            
        } catch (error) {
            console.log(error);
        }

    }
    return <>
        <main>
            <div className="section-reg">
                <div className="container grid grid-two-cols">
                    <div className="registration-img">
                        <img src="/images/b3.png" alt="register img" width="500" height="500"></img>
                    </div>
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Sign-Up</h1>
                        <br></br>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input type="text" name="username" placeholder="username" id="username" required autoComplete="off" value={user.username} onChange={handleInput} />
                            </div>

                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" placeholder="enter email" id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                            </div>

                            <div>
                                <label htmlFor="phone">phone</label>
                                <input type="number" name="phone" placeholder="phone" id="phone" required autoComplete="off" value={user.phone} onChange={handleInput} />
                            </div>

                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name="password" placeholder="password" id="password" required autoComplete="off" value={user.password} onChange={handleInput} />
                            </div>
                            <br />

                            <button type="submit" className="btn btn-submit">Register Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </>;
};