import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="h-full bg-cyan-500 flex flex-col  ">
    <Navbar />
      <div className="min-h-screen bg-cyan-500 flex flex-1 justify-center items-start">
        <div className="w-[90%] max-w-3xl bg-white mt-10 rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-cyan-600 mb-4">
            About Our App
          </h1>

          <p className="text-gray-700 text-lg mb-4">
            Welcome to our social platform 👋 This application is built to let
            users share their thoughts, images, and ideas in a simple and secure
            way.
          </p>

          <p className="text-gray-700 text-lg mb-4">
            Users can register, upload a profile picture, and create posts
            similar to tweets. Each post belongs to its creator, so only the
            owner can edit or delete their content.
          </p>

          <p className="text-gray-700 text-lg mb-4">
            Authentication is handled securely using JWT and httpOnly cookies.
            Your data is protected, and only logged-in users can access
            protected features.
          </p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-cyan-600 mb-2">
              Key Features
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>User registration with profile picture</li>
              <li>Secure login & logout</li>
              <li>Create posts with text and images</li>
              <li>Edit & delete your own posts</li>
              <li>Responsive and modern UI</li>
            </ul>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Built with ❤️ using React, Node.js, Express, MongoDB, and Tailwind
            CSS.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
