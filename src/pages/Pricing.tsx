
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Basic</h2>
          <p className="text-3xl font-bold mt-4">₹499<span className="text-sm font-normal">/month</span></p>
          <ul className="mt-6 space-y-2">
            <li>✓ Feature 1</li>
            <li>✓ Feature 2</li>
            <li>✓ Feature 3</li>
          </ul>
          <Link to="/checkout">
            <Button className="w-full mt-6">Choose Plan</Button>
          </Link>
        </div>
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Premium</h2>
          <p className="text-3xl font-bold mt-4">₹999<span className="text-sm font-normal">/month</span></p>
          <ul className="mt-6 space-y-2">
            <li>✓ All Basic Features</li>
            <li>✓ Premium Feature 1</li>
            <li>✓ Premium Feature 2</li>
          </ul>
          <Link to="/checkout">
            <Button className="w-full mt-6">Choose Plan</Button>
          </Link>
        </div>
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Enterprise</h2>
          <p className="text-3xl font-bold mt-4">₹1999<span className="text-sm font-normal">/month</span></p>
          <ul className="mt-6 space-y-2">
            <li>✓ All Premium Features</li>
            <li>✓ Enterprise Feature 1</li>
            <li>✓ Enterprise Feature 2</li>
          </ul>
          <Link to="/checkout">
            <Button className="w-full mt-6">Choose Plan</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
