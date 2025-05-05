import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  let API = "https://store-api.softclub.tj/Account/login"

  async function logIn() {
    setError("");

    if (!userName || !password) {
      setError("Please fill all fields.");
      return;
    }

    let user = {
      userName: userName,
      password: password,
    };

    try {
      let { data } = await axios.post(
        API, user);
      navigate("/products");
      localStorage.setItem("access_token", data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Incorrect username or password");
      } else {
        setError("Incorrect username or password.");
      }
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 ml-[-50px] flex flex-col items-center justify-center bg-gradient-to-r from-[#0a1f44] to-[#091a36] text-white p-10">
        <h2 className="text-3xl font-bold mb-4">Welcome to admin panel</h2>
        <h1 className="text-5xl font-extrabold">fastcart</h1>
      </div>

      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full ml-[-100px] max-w-sm">
          <h2 className="text-2xl font-semibold mb-4 cursor-not-allowed">Log in</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <input
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(el) => setUserName(el.target.value)}
            className="w-full mb-3 p-3 border border-gray-300 rounded-md outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(el) => setPassword(el.target.value)}
            className="w-full mb-3 p-3 border border-gray-300 rounded-md outline-none"
          />

          <div className="text-center mb-4">
            <Link to="/forgot" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              onClick={logIn}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              Log in
              <LoginIcon sx={{ marginLeft: "10px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
