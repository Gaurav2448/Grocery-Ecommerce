import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { useCart } from "../store/cart";
import {Badge} from 'antd';

export const Navbar=()=>{
    const {isLoggedIN}=useAuth();
    const [cart]=useCart();
    return(
        <>
            <header>
                <div className="container">
                    <div className="logo-br">
                    {/* <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> */}
                        <NavLink href="/"><h2>My Grocer</h2></NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li><NavLink to="/grocery">Grocery</NavLink></li>
                            <li><Badge count={cart?.length} showZero><NavLink to="/cart">Cart</NavLink></Badge></li>
                            {isLoggedIN ? (<li>
                            <NavLink to="/logout">Logout</NavLink></li>)
                            :(
                                <>
                                <li><NavLink to="/register">Sign-Up</NavLink></li>
                                <li><NavLink to="/login">Login</NavLink></li>
                                </>
                            )
                            }
                            
                            
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}