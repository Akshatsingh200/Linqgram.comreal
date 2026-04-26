import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedIn, getUserData, isLoggedIn, loadingAuth } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isLoggedIn && !userData) getUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      setUserData(null);
      setIsLoggedIn(false);
      toast.success("Logged out!");
      navigate("/login");
    } catch { toast.error("Logout failed"); }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInNav { from { opacity: 0; } to { opacity: 1; } }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #ec4899);
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .nav-link-underline:hover::after, .nav-link-underline.active::after { width: 100%; }
      `}</style>

      <nav style={{
        ...navStyle.nav,
        ...(scrolled ? navStyle.navScrolled : navStyle.navTop),
      }}>
        {/* Logo */}
        <div onClick={() => navigate("/")} style={navStyle.logo}>
          <div style={navStyle.logoBox}>⬡</div>
          <span style={navStyle.logoText}>LinqGram</span>
        </div>

        {/* Desktop Links */}
        <div style={navStyle.links}>
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`nav-link-underline ${isActive(link.path) ? "active" : ""}`}
              style={{
                ...navStyle.link,
                color: isActive(link.path) ? "#fff" : "rgba(255,255,255,0.55)",
              }}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop Right */}
        <div style={navStyle.right}>
          {loadingAuth ? null : isLoggedIn ? (
            <div ref={dropRef} style={{ position: "relative" }}>
              <button onClick={() => setDropOpen(!dropOpen)} style={navStyle.avatarBtn}>
                <div style={navStyle.avatar}>
                  {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span style={navStyle.userName}>{userData?.name?.split(" ")[0]}</span>
                {userData?.isAccountVerified && <span style={navStyle.verifiedBadge}>✓</span>}
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>{dropOpen ? "▲" : "▼"}</span>
              </button>

              {dropOpen && (
                <div style={navStyle.dropdown}>
                  <div style={navStyle.dropHeader}>
                    <div style={navStyle.dropAvatar}>{userData?.name?.charAt(0)?.toUpperCase() || "U"}</div>
                    <div>
                      <p style={navStyle.dropName}>{userData?.name}</p>
                      <p style={navStyle.dropRole}>Member</p>
                    </div>
                  </div>
                  <div style={navStyle.dropDivider} />
                  <button onClick={() => { navigate("/profile"); setDropOpen(false); }} style={navStyle.dropItem}>
                    <span>👤</span> My Profile
                  </button>
                  {!userData?.isAccountVerified && (
                    <button onClick={() => { navigate("/email-verify"); setDropOpen(false); }} style={{ ...navStyle.dropItem, color: "#f59e0b" }}>
                      <span>⚠</span> Verify Email
                    </button>
                  )}
                  <div style={navStyle.dropDivider} />
                  <button onClick={handleLogout} style={{ ...navStyle.dropItem, color: "#f87171" }}>
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => navigate("/login")} style={navStyle.loginBtn}>Sign In</button>
              <button onClick={() => navigate("/login")} style={navStyle.signupBtn}>Get Started →</button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={navStyle.hamburger}>
          <div style={{ ...navStyle.bar, transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <div style={{ ...navStyle.bar, opacity: menuOpen ? 0 : 1 }} />
          <div style={{ ...navStyle.bar, transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={navStyle.mobileMenu}>
          <div style={navStyle.mobileInner}>
            {navLinks.map((link) => (
              <button key={link.path} onClick={() => navigate(link.path)} style={{
                ...navStyle.mobileLink,
                color: isActive(link.path) ? "#6366f1" : "rgba(255,255,255,0.8)",
              }}>
                {link.name}
              </button>
            ))}
            <div style={navStyle.mobileDivider} />
            {isLoggedIn ? (
              <>
                <button onClick={() => navigate("/profile")} style={navStyle.mobileLink}>👤 Profile</button>
                <button onClick={handleLogout} style={{ ...navStyle.mobileLink, color: "#f87171" }}>🚪 Sign Out</button>
              </>
            ) : (
              <button onClick={() => navigate("/login")} style={navStyle.mobileSignup}>
                Get Started →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const navStyle = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: "64px",
    transition: "all 0.3s ease",
  },
  navTop: {
    background: "rgba(6,6,8,0.5)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid transparent",
  },
  navScrolled: {
    background: "rgba(6,6,8,0.92)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    userSelect: "none",
  },
  logoBox: {
    width: "34px",
    height: "34px",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    borderRadius: "9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
  logoText: {
    fontSize: "17px",
    fontWeight: "800",
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  link: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    padding: "6px 14px",
    borderRadius: "7px",
    position: "relative",
    transition: "color 0.2s",
    fontFamily: "inherit",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatarBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "100px",
    padding: "5px 14px 5px 5px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "700",
  },
  userName: { color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: "500" },
  verifiedBadge: { color: "#4ade80", fontSize: "11px" },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    width: "210px",
    background: "#111115",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    animation: "slideDown 0.2s ease-out",
    zIndex: 100,
  },
  dropHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 16px",
    background: "rgba(99,102,241,0.06)",
  },
  dropAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "700",
    flexShrink: 0,
  },
  dropName: { color: "#fff", fontSize: "13px", fontWeight: "600", margin: 0 },
  dropRole: { color: "rgba(255,255,255,0.4)", fontSize: "11px", margin: "2px 0 0" },
  dropDivider: { height: "1px", background: "rgba(255,255,255,0.06)", margin: "4px 0" },
  dropItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "11px 16px",
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.15s",
    textAlign: "left",
    fontFamily: "inherit",
  },
  loginBtn: {
    padding: "7px 16px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  signupBtn: {
    padding: "7px 16px",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 12px rgba(99,102,241,0.35)",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  bar: {
    width: "22px",
    height: "2px",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  },
  mobileMenu: {
    position: "fixed",
    top: "64px",
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(6,6,8,0.98)",
    backdropFilter: "blur(20px)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "fadeInNav 0.2s ease",
  },
  mobileInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    padding: "0 40px",
  },
  mobileLink: {
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.8)",
    fontSize: "18px",
    fontWeight: "500",
    padding: "14px 24px",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    borderRadius: "12px",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  mobileDivider: {
    width: "60px",
    height: "1px",
    background: "rgba(255,255,255,0.1)",
    margin: "10px 0",
  },
  mobileSignup: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
    marginTop: "8px",
    fontFamily: "inherit",
  },
};

export default Navbar;
