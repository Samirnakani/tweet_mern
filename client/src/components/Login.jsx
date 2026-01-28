import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    
    setEmailError("");
    setPassError("");
    setSuccessMsg("");

    try {
      await axios.post(
        "/api/login",
        { email, pass },
        { withCredentials: true },
      );

      setSuccessMsg("Login successful");

      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";

   
      if (msg.toLowerCase().includes("email")) {
        setEmailError(msg);
      } else if (msg.toLowerCase().includes("password")) {
        setPassError(msg);
      } else {
        setPassError(msg); 
      }
    }
  };
  return (
    <div className="h-screen w-full bg-amber-100 flex justify-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-80 h-auto my-auto rounded-3xl bg-lime-200"
      >
        <h2 className="mx-auto text-[30px] font-bold">Login</h2>
        {successMsg && (
          <p className="text-green-600 text-center font-semibold text-[12px] mb-2">
            {successMsg}
          </p>
        )}
        <input
          className="w-4/5 h-8 text-[20px] pl-2 font-semibold mt-10  mx-auto rounded-[3px] bg-white"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="w-full pl-9">
          {emailError && (
            <p className="text-red-600 text-[10px] font-semibold mt-1">
              {emailError}
            </p>
          )}
        </div>
        <div className="relative w-4/5 font-semibold mx-auto mt-5 ">
          <input
            className="w-full h-8 pl-2 pr-10 rounded-[3px] bg-white"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="w-full pl-9">
          {passError && (
            <p className="text-red-600 text-[10px] font-semibold mt-1">
              {passError}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-amber-400 mx-auto mt-8 rounded-[3px] w-4/5 font-semibold py-1"
        >
          Login
        </button>
        <p className="text-center text-sm mt-4 mb-5   ">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
