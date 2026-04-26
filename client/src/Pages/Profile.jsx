import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData, backendUrl, getUserData, isLoggedIn, setIsLoggedIn, setUserData } =
    useContext(AppContext);
  const [name, setName] = useState(userData?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name };
      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }
      const { data } = await axios.put(`${backendUrl}/api/user/update`, payload, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("Profile updated!");
        await getUserData();
        setCurrentPassword("");
        setNewPassword("");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendVerifyOtp = async () => {
    setSendingOtp(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("OTP sent! Check your email.");
        navigate("/email-verify");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleLogout = async () => {
    await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
    setUserData(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-4 pb-12">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-indigo-900/60 to-pink-900/60 border border-white/10 rounded-2xl p-6 mb-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
            {userData?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userData?.name || "User"}</h1>
            <div className="flex items-center gap-2 mt-1">
              {userData?.isAccountVerified ? (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                  ✓ Verified
                </span>
              ) : (
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">
                  ⚠ Not Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Verify Banner */}
        {!userData?.isAccountVerified && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-yellow-400 font-medium">Email not verified</p>
              <p className="text-gray-400 text-sm">Verify your email to unlock all features</p>
            </div>
            <button
              onClick={handleSendVerifyOtp}
              disabled={sendingOtp}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
            >
              {sendingOtp ? "Sending..." : "Verify Now"}
            </button>
          </div>
        )}

        {/* Update Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Edit Profile</h2>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-sm text-gray-400 mb-3">Change Password (optional)</p>
              <div className="flex flex-col gap-3">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 rounded-xl transition-all duration-300 font-medium"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
