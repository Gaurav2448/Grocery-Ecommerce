// import { useState } from "react";
// import { useAuth } from "../store/auth";
// export const About =() =>{
//     const [name,setname]=useState({uname:"About"})
//     const {user}=useAuth();

//     const [userData,setUserData]=useState(true);

    
//     if(userData && user){
//         setname({uname:user.username});
//         setUserData(false);
//     }
//     return (<h1>hello {name.uname}</h1>);
// };

import React from "react";
import "./AboutUs.css";

export const About = () => {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>Your Trusted Grocery Partner</h1>
        <p>Fresh, organic groceries delivered with care.</p>
      </section>

      {/* Meet the Team Section */}
      <section className="meet-the-team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          {/* Team Member Card */}
          <div className="team-member">
            <img src="/images/m1.avif" alt="Team Member 1" />
            <h3>Alex Green</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="/images/m2.avif" alt="Team Member 2" />
            <h3>James White</h3>
            <p>Operations Manager</p>
          </div>
          <div className="team-member">
            <img src="/images/m3.avif" alt="Team Member 3" />
            <h3>Mark Brown</h3>
            <p>Quality Assurance Lead</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      {/* Mission and Values Section */}
      <section className="mission-values">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>To bring fresh, organic, and sustainable groceries to every household, making quality food accessible to all.</p>
        </div>
        <div className="values">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality:</strong> We prioritize the highest quality in all our products.</li>
            <li><strong>Sustainability:</strong> We are committed to environmentally friendly practices.</li>
            <li><strong>Community:</strong> Supporting local farmers and producers is at our core.</li>
          </ul>
        </div>
      </section>

       {/* Commitment to Quality Section */}
       <section className="quality-commitment">
        <h2>Our Commitment to Quality</h2>
        <p>We carefully select each product to ensure it meets our high standards. Our team works directly with local farmers to source organic and sustainably-grown products, ensuring fresh, healthy groceries for you and your family.</p>
      </section>

    </div>
  );
};
