import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { backendUrl, isLoggedIn, setIsLoggedIn, getUserData, loadingAuth } =
    useContext(AppContext);

  useEffect(() => {
    if (!loadingAuth && isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, loadingAuth, navigate]);

  if (loadingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.defaults.withCredentials = true;
    try {
      const endpoint =
        state === "sign up"
          ? `${backendUrl}/api/auth/register`
          : `${backendUrl}/api/auth/login`;

      const payload =
        state === "sign up" ? { name, email, password } : { email, password };

      const res = await axios.post(endpoint, payload);

      if (res.data.success) {
        toast.success(state === "sign up" ? "Account Created! 🎉" : "Welcome back! 👋");
        setIsLoggedIn(true);
        await getUserData();
        navigate("/", { replace: true });
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-pink-600/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />

      {/* Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Toggle Tabs */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          <button
            onClick={() => setState("login")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              state === "login"
                ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setState("sign up")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              state === "sign up"
                ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1">
          {state === "sign up" ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-400 mb-6 text-sm">
          {state === "sign up"
            ? "Join LinqGram and discover the best tools 🚀"
            : "Login to continue your experience"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {state === "sign up" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>

          {/* ✅ Forgot password link */}
          {state === "login" && (
            <div className="text-right -mt-2">
              <span
                onClick={() => navigate("/reset-password")}
                className="text-indigo-400 text-xs cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl font-semibold shadow-md hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : state === "sign up" ? (
              "Create Account →"
            ) : (
              "Login →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
