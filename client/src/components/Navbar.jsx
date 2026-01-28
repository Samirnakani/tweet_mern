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
          className="px-5 min-w-22  rounded-[3px] active:scale-95 font-semibold"
        >
          Home
        </Link>
        <Link
          to="/create"
          className="px-5 min-w-22  rounded-[3px] active:scale-95 font-semibold"
        >
          Create
        </Link>
        <Link
          to="/about"
          className="px-5 min-w-22  rounded-[3px] active:scale-95 font-semibold "
        >
          about
        </Link>

        <div className=" h-full flex justify-center items-center">
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
