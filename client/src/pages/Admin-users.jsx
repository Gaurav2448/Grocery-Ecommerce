import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"

export const AdminUsers=()=>{
    const [users,setusers]=useState([])
    const {authorization}=useAuth();
    const getAllUsersData=async ()=>{
        try {
            const response=await fetch("http://localhost:5000/api/admin/users",
                {
                    method:"GET",
                    headers:{
                        Authorization:authorization,
                    },
                }
            );
            const data=await response.json();
            console.log(`users1 ${data}`);
            setusers(data);
        } catch (error) {
            console.log(error);
        }
    }
    const deleteUser=async (id)=>{
        try {
            const response=await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,
                {
                    method:"DELETE",
                    headers:{
                        Authorization:authorization,
                    },
                }
               
            );
            const data=await response.json();
            console.log(`users after delete ${data}`);
            if(response.ok){
                getAllUsersData();
            }
            // setusers(data);
        } catch (error) {
            console.log(error);
        }
       
    }
    useEffect(()=>{
        getAllUsersData()
    },[]);
    return <>
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin Users Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((curruser,index)=>{
                        return <tr key={index}>
                            <td>{curruser.username}</td>
                            <td>{curruser.email}</td>
                            <td>{curruser.phone}</td>
                            <td>Edit</td>
                            <td><button onClick={()=>deleteUser(curruser._id)}>Delete</button></td>
                        </tr>
                        })}
                    </tbody>
                </table>
                
            </div>
        </section>
        
    </>
}