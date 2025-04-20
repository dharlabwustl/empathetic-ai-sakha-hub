
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">This is the about page.</p>
      <Link to="/" className="text-primary hover:underline">Back to Home</Link>
    </div>
  );
};

export default About;
