import React from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
const Login = () => {
  const [formData, setFormData] = useState({
    email: " ",
    password: " ",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit=async e=>{
    e.preventDefault();
    try {
        const res=await axios.post('https://quotesbackend-5ten.onrender.com/api/auth/login',formData);
        localStorage.setItem('token',res.data.token);
        toast.success('Login Success');
        navigate('/quotes')
    } catch (error) {
        toast.error('login failed please check ur credentials')
    }
  }


  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm mx-auto mt-44">
      <h2 className="text-2xl mb-4 font-extrabold text-center">login</h2>
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
        placeholder="password"
        className="w-full p-2 border border-gray-400 rounded mb-4"
      />
      <div className="">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <p className="text-center mt-4">or.. </p>

        <div className="text-center mt-5">
          <Link
            to="/register"
            className="text-blue-500 hover:underline text-center "
          >
            Register
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
