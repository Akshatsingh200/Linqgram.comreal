import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const Resetpassword = () => {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  // Step 1 — Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success("OTP sent to your email!");
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // OTP input handlers
  const handleOtpChange = (e, i) => {
    const val = e.target.value.replace(/\D/, "");
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputRefs.current[i - 1]?.focus();
  };

  // Step 2 — Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.join("").length < 6) return toast.error("Enter complete OTP");
    setStep(3);
  };

  // Step 3 — Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp: otp.join(""),
        newpassword: newPassword,
      });
      if (data.success) {
        toast.success("Password reset successfully! 🎉");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = ["Enter Email", "Verify OTP", "New Password"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white px-4 relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-purple-600/30 rounded-full blur-3xl top-10 right-10" />
      <div className="absolute w-72 h-72 bg-blue-600/30 rounded-full blur-3xl bottom-10 left-10" />

      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step > i + 1
                    ? "bg-green-500 text-white"
                    : step === i + 1
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={`text-xs ${step === i + 1 ? "text-indigo-300" : "text-gray-500"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1 — Email */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              Forgot Password?
            </h2>
            <p className="text-center text-gray-400 mb-6 text-sm">
              Enter your email and we'll send you a reset OTP
            </p>
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP →"}
              </button>
            </form>
          </>
        )}

        {/* Step 2 — OTP */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              Enter OTP
            </h2>
            <p className="text-center text-gray-400 mb-6 text-sm">
              OTP sent to <span className="text-indigo-400">{email}</span>
            </p>
            <form onSubmit={handleVerifyOtp}>
              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className="w-12 h-12 text-center text-xl font-bold rounded-xl bg-white/10 border-2 border-white/20 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
              >
                Verify OTP →
              </button>
            </form>
            <p className="text-center mt-4 text-gray-400 text-sm">
              Wrong email?{" "}
              <span onClick={() => setStep(1)} className="text-indigo-400 cursor-pointer hover:underline">
                Go back
              </span>
            </p>
          </>
        )}

        {/* Step 3 — New Password */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              Set New Password
            </h2>
            <p className="text-center text-gray-400 mb-6 text-sm">
              Choose a strong password for your account
            </p>
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3.5 text-gray-400 cursor-pointer text-sm"
                >
                  {showPass ? "🙈" : "👁️"}
                </span>
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {/* Password strength bar */}
              {newPassword && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          newPassword.length >= i * 3
                            ? i <= 1 ? "bg-red-500" : i <= 2 ? "bg-yellow-500" : i <= 3 ? "bg-blue-500" : "bg-green-500"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    {newPassword.length < 6 ? "Too short" : newPassword.length < 9 ? "Fair" : newPassword.length < 12 ? "Good" : "Strong 💪"}
                  </p>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password ✓"}
              </button>
            </form>
          </>
        )}

        <p className="text-center mt-4 text-gray-500 text-xs">
          <span onClick={() => navigate("/login")} className="cursor-pointer hover:text-gray-300">
            ← Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Resetpassword;
