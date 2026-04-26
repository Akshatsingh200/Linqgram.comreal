import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const EmailVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { backendUrl, getUserData } = useContext(AppContext);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, "");
    if (!val && e.nativeEvent.inputType !== "deleteContentBackward") return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pasted.forEach((char, i) => {
      if (/\d/.test(char)) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[5]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6)
      return toast.error("Please enter the complete 6-digit OTP");

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-account`,
        { otp: otpValue },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Email verified successfully! 🎉");
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("OTP resent to your email!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl top-10 left-10" />
      <div className="absolute w-72 h-72 bg-pink-600/30 rounded-full blur-3xl bottom-10 right-10" />

      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-indigo-600/40 rounded-full flex items-center justify-center text-3xl">
            📧
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Enter the 6-digit OTP sent to your email address
        </p>

        <form onSubmit={handleSubmit}>
          {/* OTP Boxes */}
          <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-12 text-center text-xl font-bold rounded-xl bg-white/10 border-2 border-white/20 text-white focus:outline-none focus:border-indigo-500 transition-all duration-200"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg font-semibold shadow-md hover:opacity-90 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Email ✓"}
          </button>
        </form>

        <p className="text-center mt-5 text-gray-400 text-sm">
          Didn't receive OTP?{" "}
          <span
            onClick={handleResend}
            className="text-indigo-400 cursor-pointer hover:underline font-medium"
          >
            Resend OTP
          </span>
        </p>

        <p className="text-center mt-3 text-gray-500 text-xs">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-gray-300 transition-colors"
          >
            ← Back to Home
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailVerify;
