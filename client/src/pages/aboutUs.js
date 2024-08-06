import React from 'react';
import './aboutUs.css';  // Make sure to import the CSS file

const AboutUs = () => {
  return (
    <section className="about-us" data-aos="fade-up">
      
      <h1>About Us</h1>
      <p>
        At <strong>Smart Money</strong>, we are dedicated to empowering individuals to take control of their financial future. Our mission is to provide user-friendly tools to help you track expenses, create budgets, and understand your financial health. Our team of experts is committed to making personal finance management simple and accessible. Join us in achieving financial stability and peace of mind. Start your journey to better finances today!
      </p>
      <button className="getstarted">Get Started</button>
    </section>

  );
};

export default AboutUs;
