import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const API = "https://store-api.softclub.tj/Account/login";

  async function logIn() {
    setError("");

    if (!userName || !password) {
      setError("Please fill all fields.");
      return;
    }

    const user = { userName, password };

    try {
      const { data } = await axios.post(API, user);
      localStorage.setItem("access_token", data.data);
      navigate("/products");
    } catch (error) {
      setError("Incorrect username or password.");
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-[#0a1f44] to-[#091a36] text-white p-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome to admin panel</h2>
        <h1 className="text-5xl font-extrabold text-center">fastcart</h1>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Log in</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <input
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-3 p-3 border border-gray-300 rounded-md outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-3 border border-gray-300 rounded-md outline-none"
          />

          <div className="text-center mb-4">
            <Link to="/forgot" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            onClick={logIn}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Log in
            <LoginIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
