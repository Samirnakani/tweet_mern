import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const submitHandler = async () => {
    await axios.get("/api/logout", {
      withCredentials: true,
    });

    navigate("/login"); 
  };

  return (
   
      <button onClick={submitHandler} className="h-8 w-22 bg-red-600 mr-5  rounded-2xl hover:bg-red-700 active:scale-95 ">Log out</button>
   
  );
};

export default Logout;
