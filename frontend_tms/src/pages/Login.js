import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/login";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await Axios.post(API_URL, user);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-white opacity-10 rounded-full"></div>
      <div className="absolute bottom-20 right-40 w-32 h-32 bg-white opacity-10 rounded-full"></div>
      <div className="absolute bottom-32 left-60 w-24 h-24 bg-white opacity-10 rounded-full"></div>

      <div className="relative z-10 bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
        <div className="bg-blue-500 rounded-full p-3 mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m10.5 0v9A2.25 2.25 0 0116.5 20.25h-9A2.25 2.25 0 015.25 18V9m13.5 0H5.25" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-300 mb-6 text-center">Sign in to your account to continue</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="w-full" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            className="w-full mb-4 px-4 py-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            className="w-full mb-6 px-4 py-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-3 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-400">Don't have an account?</span>
          <button
            className="ml-2 text-blue-400 hover:underline font-semibold"
            onClick={() => navigate("/register")}
            type="button"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
