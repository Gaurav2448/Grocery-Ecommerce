import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
 const navigate=useNavigate();
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image">
          <img src="/images/b2.jpg" alt="Fresh Groceries" />
        </div>
        <div className="hero-content">
          <h1>Welcome to My Grocer</h1>
          <p>Fresh, organic groceries delivered to your doorstep.</p>
          <button className="shop-now" onClick={()=>navigate("/grocery")}>Shop Now</button>
        </div>
      </section>
    </div>
  );
};
