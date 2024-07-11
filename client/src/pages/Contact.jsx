import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactForm={
    username:"",
    email:"",
    message:""
};

export const Contact =() =>{
    const [contact,setcontact]=useState(defaultContactForm);

    const {user}=useAuth();


    const [userData,setUserData]=useState(true);

    
    if(userData && user){
        setcontact({
            username:user.username,
            email:user.email,
            message:"",
        });
        setUserData(false);
    }

    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;

        setcontact((prev)=>({...prev,[name]:value}));
        // setcontact({
        //     ...contact,[name]:value
        // });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        alert(contact);
        try {
            const response = await fetch(`http://localhost:5000/api/form/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),

            });

            if (response.ok) {
                setcontact(defaultContactForm);
                const res_data=await response.json();
                console.log("response from contact",res_data);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return <>
        <main>
            <div className="section-contact">
            <h1 className="main-heading mb-3">Contact</h1>
                <div className="container grid grid-two-cols">
                    <div className="registration-img">
                        
                        <img src="/images/img2.png" alt="register img" width="500" height="500"></img>
                    </div>
                    <div className="section-form">
                        <br /><br /><br />
                        <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="username">username</label>
                                <input type="text" name="username" placeholder="username" id="username" required autoComplete="off" value={contact.username} onChange={handleInput}/>
                            </div>

                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" placeholder="enter email" id="email" required autoComplete="off"  value={contact.email} onChange={handleInput}/>
                            </div>

                            <div>
                                <label htmlFor="message">message</label>
                                <textarea name="message" rows={4} cols={40} placeholder="message" id="message" required autoComplete="off" value={contact.message} onChange={handleInput}/>
                            </div>
                            <br />

                            <button type="submit" className="btn btn-submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </>;
};