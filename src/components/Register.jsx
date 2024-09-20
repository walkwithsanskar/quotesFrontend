// src/components/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'https://quotesbackend-5ten.onrender.com/api/auth/register',
        formData
      );
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm mx-auto mt-10 p-3  mt-32"
    >
      <h2 className="text-2xl mb-4 text-center font-extrabold">Register</h2>
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        placeholder="Username"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
        <div className="text-center mt-5">
        <p className="p-3">or </p>
          <Link
            to="/login"
            className="text-blue-500 hover:underline text-center "
          >
            Login instead????????????????
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Register;
