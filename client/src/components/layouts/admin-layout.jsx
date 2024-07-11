import { NavLink,Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export const AdminLayout=()=>{
    return <>
        <div className="container">
            <nav>
                <ul>
                    <li><NavLink to="/admin/users"><FaUser /> users</NavLink> </li>
                    <li><NavLink to="/admin/contacts">contacts</NavLink></li>
                    <li><NavLink to="/admin/users">Services</NavLink></li>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </nav>
        </div>
        <Outlet/> 
    </>;
}

