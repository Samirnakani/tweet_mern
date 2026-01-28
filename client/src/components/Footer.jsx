import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 flex justify-center">
      <div className=" mx-auto py-4 flex flex-col md:flex-row justify-between items-center">
        
        <p className="text-sm">
          © {new Date().getFullYear()} MySocialApp. All rights reserved.
        </p>

     
        
      </div>
    </footer>
  );
};

export default Footer;
