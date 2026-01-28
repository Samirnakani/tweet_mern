import React from "react";
import "./css/nav.css";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between w-[95%] mx-auto mt-2 rounded-3xl  h-10 bg-red-200 ">
      <div className="h-full ml-4">
        <img src="/logo.png" alt="IMG" className="h-full" />
      </div>
      <input type="checkbox" id="check" />
      <label for="check" className=" ml-auto mr-10 my-auto">
        <FaBars className="text-2xl text-gray-700" />
      </label>
      <label for="check"    className="overlay"></label>
      <div className="w-2/4 navbar ml-auto justify-center items-center flex gap-10">
        <label for="check" className="mr-auto ml-4 mt-5 mb-6">
          <FaTimes />
        </label>
        <Link
          to="/home"
          className="bg-sky-600 px-5 min-w-22  rounded-[3px] hover:bg-sky-300 active:scale-95"
        >
          Home
        </Link>
        <Link
          to="/create"
          className="bg-sky-600 my-1 min-w-22 px-5 rounded-[3px] hover:bg-sky-300 active:scale-95 "
        >
          Create
        </Link>
        <Link
          to="/about"
          className="bg-sky-600 my-1 px-5 rounded-[3px] hover:bg-sky-300 active:scale-95 "
        >
          about
        </Link>

        <div className="mr-1 h-full  ">
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
