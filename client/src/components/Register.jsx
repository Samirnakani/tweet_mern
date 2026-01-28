import React, { useRef, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState("");

  const fileRef = useRef(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerMsg("");

    const newErrors = {};
    if (!uname.trim()) newErrors.uname = "Username required";
    if (!email.trim()) newErrors.email = "Email required";
    if (pass.length < 6) newErrors.pass = "Password must be at least 6 chars";
    if (!gender) newErrors.gender = "Select gender";
    if (!dob) newErrors.dob = "Date of birth required";
    if (!profilePic) newErrors.profilePic = "Profile picture required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("uname", uname);
    formData.append("email", email);
    formData.append("pass", pass);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("profilePic", profilePic);

    try {
      setLoading(true);

      await axios.post("/api/register", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/home");
    } catch (err) {
      setServerMsg(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-amber-100 flex justify-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-80 my-auto rounded-3xl bg-lime-200 py-6"
      >
        <h2 className="mx-auto text-[28px] font-bold mb-2">Register</h2>

        {serverMsg && (
          <p className="text-red-600 text-sm text-center mb-2 font-semibold">
            {serverMsg}
          </p>
        )}

        <input
          className="w-4/5 h-8 text-[16px] pl-2 font-semibold mx-auto mt-3 rounded bg-white"
          type="text"
          placeholder="Username"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
        />
        {errors.uname && <p className="error ml-10 text-[12px]">{errors.uname}</p>}

        <input
          className="w-4/5 h-8 text-[16px] pl-2 font-semibold mx-auto mt-3 rounded bg-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error ml-10 text-[12px]">{errors.email}</p>}

        <div className="relative w-4/5 mx-auto mt-3">
          <input
            className="w-full h-8 pl-2 pr-10 rounded font-semibold bg-white"
            type={showPass ? "text" : "password"}
            placeholder="Password"
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
        {errors.pass && <p className="error ml-10 text-[12px]">{errors.pass}</p>}

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-4/5 h-8 text-[16px] pl-2 font-semibold mx-auto mt-3 rounded bg-white"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="error ml-10 text-[12px]">{errors.gender}</p>}

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-4/5 h-8 text-[15px] pl-2 font-semibold mx-auto mt-3 rounded bg-white"
        />
        {errors.dob && <p className="error ml-10 text-[12px]">{errors.dob}</p>}

        {/* Image Upload Button */}
        <div className="w-4/5 mx-auto mt-4 flex items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current.click()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            <FaImage />
            Set Profile pic
          </button>
          {profilePic && (
            <span className="text-xs text-gray-600 truncate">
              {profilePic.name}
            </span>
          )}
        </div>
        {errors.profilePic && <p className="error ml-10 text-[12px]">{errors.profilePic}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-400 mx-auto mt-6 rounded w-4/5 font-semibold py-1 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
