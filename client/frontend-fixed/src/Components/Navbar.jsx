import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedIn, getUserData, isLoggedIn, loadingAuth } =
    useContext(AppContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLoggedIn && !userData) getUserData();
  }, [isLoggedIn, userData]);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      if (data.success) {
        setUserData(null);
        setIsLoggedIn(false);
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  // ✅ Fixed: /contact (was /contect)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  if (loadingAuth) {
    return (
      <nav className="fixed top-0 left-0 w-full py-5 flex items-center justify-center bg-black text-white z-50">
        <span className="text-sm text-gray-400">Loading...</span>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between pl-[60px] pr-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg py-3 md:py-4"
          : "bg-gradient-to-r from-gray-950 via-black to-gray-900 py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <h2
        onClick={() => navigate("/")}
        className="text-white text-2xl font-bold cursor-pointer select-none bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"
      >
        LinqGram
      </h2>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10">
        {navLinks.map((link, i) => (
          <button
            key={i}
            onClick={() => navigate(link.path)}
            className="group flex flex-col gap-0.5 text-gray-300 hover:text-white transition-colors"
          >
            {link.name}
            <div className="bg-indigo-400 h-0.5 w-0 group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <div className="relative">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                {userData?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <span className="text-gray-300 text-sm">{userData?.name?.split(" ")[0]}</span>
              {userData?.isAccountVerified && (
                <span className="text-xs text-green-400">✓</span>
              )}
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl w-44 overflow-hidden z-50">
                <button
                  onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition-colors text-sm"
                >
                  👤 Profile
                </button>
                {!userData?.isAccountVerified && (
                  <button
                    onClick={() => { navigate("/email-verify"); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-3 text-yellow-400 hover:bg-yellow-500/10 transition-colors text-sm"
                  >
                    ⚠ Verify Email
                  </button>
                )}
                <div className="border-t border-white/10" />
                <button
                  onClick={() => { handleLogout(); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90 transition-all duration-300 text-sm font-medium"
          >
            Login / Sign Up
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[#0a0a0a] text-white flex flex-col md:hidden items-center justify-center gap-6 font-medium transition-all duration-500 z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navLinks.map((link, i) => (
          <button
            key={i}
            onClick={() => { navigate(link.path); setIsMenuOpen(false); }}
            className="text-lg text-gray-300 hover:text-white transition-colors"
          >
            {link.name}
          </button>
        ))}

        {isLoggedIn ? (
          <>
            <button
              onClick={() => { navigate("/profile"); setIsMenuOpen(false); }}
              className="text-lg text-gray-300 hover:text-white transition-colors"
            >
              👤 Profile
            </button>
            <button
              onClick={() => { handleLogout(); setIsMenuOpen(false); }}
              className="bg-red-500/20 border border-red-500/30 text-red-400 px-8 py-2.5 rounded-full hover:bg-red-500/30 transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-8 py-2.5 rounded-full hover:opacity-90 transition-all"
          >
            Login / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
