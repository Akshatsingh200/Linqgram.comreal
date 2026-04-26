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
  const [focused, setFocused] = useState("");
  const navigate = useNavigate();

  const { backendUrl, isLoggedIn, setIsLoggedIn, getUserData, loadingAuth } = useContext(AppContext);

  useEffect(() => {
    if (!loadingAuth && isLoggedIn) navigate("/", { replace: true });
  }, [isLoggedIn, loadingAuth, navigate]);

  if (loadingAuth) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.spinner} />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.defaults.withCredentials = true;
    try {
      const endpoint = state === "sign up"
        ? `${backendUrl}/api/auth/register`
        : `${backendUrl}/api/auth/login`;
      const payload = state === "sign up" ? { name, email, password } : { email, password };
      const res = await axios.post(endpoint, payload);
      if (res.data.success) {
        toast.success(state === "sign up" ? "Welcome to LinqGram! 🎉" : "Welcome back! 👋");
        setIsLoggedIn(true);
        await getUserData();
        navigate("/", { replace: true });
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Animated background grid */}
      <div style={styles.gridBg} />

      {/* Glowing orbs */}
      <div style={{ ...styles.orb, top: "-100px", left: "-100px", background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)", width: "500px", height: "500px" }} />
      <div style={{ ...styles.orb, bottom: "-150px", right: "-100px", background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)", width: "600px", height: "600px" }} />

      <div style={styles.container}>
        {/* Left panel — branding */}
        <div style={styles.leftPanel}>
          <div style={styles.logoMark}>
            <span style={styles.logoIcon}>⬡</span>
          </div>
          <h1 style={styles.brandName}>LinqGram</h1>
          <p style={styles.brandTagline}>Your hub for the best tools in design, dev & AI</p>

          <div style={styles.features}>
            {[
              { icon: "🔧", text: "200+ curated tools" },
              { icon: "🎨", text: "Design & dev resources" },
              { icon: "🤖", text: "Latest AI tools" },
              { icon: "🚀", text: "Always updated" },
            ].map((f, i) => (
              <div key={i} style={styles.featureItem}>
                <span style={styles.featureIcon}>{f.icon}</span>
                <span style={styles.featureText}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div style={styles.rightPanel}>
          <div style={styles.card}>
            {/* Tab switcher */}
            <div style={styles.tabBar}>
              {["login", "sign up"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setState(tab)}
                  style={{
                    ...styles.tab,
                    ...(state === tab ? styles.tabActive : {}),
                  }}
                >
                  {tab === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            <h2 style={styles.formTitle}>
              {state === "sign up" ? "Create your account" : "Welcome back"}
            </h2>
            <p style={styles.formSubtitle}>
              {state === "sign up" ? "Join thousands of creators & developers" : "Sign in to continue your journey"}
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              {state === "sign up" && (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <div style={{ ...styles.inputWrap, ...(focused === "name" ? styles.inputWrapFocused : {}) }}>
                    <span style={styles.inputIcon}>👤</span>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused("")}
                      required
                      style={styles.input}
                    />
                  </div>
                </div>
              )}

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <div style={{ ...styles.inputWrap, ...(focused === "email" ? styles.inputWrapFocused : {}) }}>
                  <span style={styles.inputIcon}>✉️</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={styles.label}>Password</label>
                  {state === "login" && (
                    <span onClick={() => navigate("/reset-password")} style={styles.forgotLink}>
                      Forgot password?
                    </span>
                  )}
                </div>
                <div style={{ ...styles.inputWrap, ...(focused === "pass" ? styles.inputWrapFocused : {}) }}>
                  <span style={styles.inputIcon}>🔒</span>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("pass")}
                    onBlur={() => setFocused("")}
                    required
                    style={styles.input}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} style={{ ...styles.submitBtn, ...(loading ? styles.submitBtnLoading : {}) }}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                    <span style={styles.btnSpinner} /> Processing...
                  </span>
                ) : state === "sign up" ? "Create Account →" : "Sign In →"}
              </button>
            </form>

            <p style={styles.switchText}>
              {state === "sign up" ? "Already have an account? " : "Don't have an account? "}
              <span
                onClick={() => setState(state === "sign up" ? "login" : "sign up")}
                style={styles.switchLink}
              >
                {state === "sign up" ? "Sign in" : "Sign up free"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#060608",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  gridBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    pointerEvents: "none",
    animation: "pulse 4s ease-in-out infinite",
  },
  container: {
    display: "flex",
    width: "100%",
    maxWidth: "900px",
    minHeight: "560px",
    borderRadius: "24px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
    animation: "fadeIn 0.6s ease-out",
    position: "relative",
    zIndex: 1,
    flexWrap: "wrap",
  },
  leftPanel: {
    flex: "1 1 300px",
    background: "linear-gradient(135deg, #1a1a3e 0%, #0d0d1f 50%, #1a0d2e 100%)",
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRight: "1px solid rgba(255,255,255,0.06)",
  },
  logoMark: {
    width: "52px",
    height: "52px",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    fontSize: "26px",
  },
  logoIcon: { filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))" },
  brandName: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "10px",
    letterSpacing: "-1px",
  },
  brandTagline: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.5)",
    marginBottom: "36px",
    lineHeight: "1.6",
    maxWidth: "260px",
  },
  features: { display: "flex", flexDirection: "column", gap: "14px" },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  featureIcon: { fontSize: "18px" },
  featureText: { color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "500" },
  rightPanel: {
    flex: "1 1 320px",
    background: "#0c0c10",
    padding: "48px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: { width: "100%", maxWidth: "380px" },
  tabBar: {
    display: "flex",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    padding: "4px",
    marginBottom: "28px",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  tab: {
    flex: 1,
    padding: "8px 16px",
    border: "none",
    borderRadius: "7px",
    background: "transparent",
    color: "rgba(255,255,255,0.4)",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    textTransform: "capitalize",
  },
  tabActive: {
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    color: "#fff",
    boxShadow: "0 2px 12px rgba(99,102,241,0.4)",
  },
  formTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "6px",
    letterSpacing: "-0.5px",
  },
  formSubtitle: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "28px",
  },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px" },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "0 14px",
    transition: "all 0.2s",
  },
  inputWrapFocused: {
    borderColor: "rgba(99,102,241,0.6)",
    background: "rgba(99,102,241,0.05)",
    boxShadow: "0 0 0 3px rgba(99,102,241,0.1)",
  },
  inputIcon: { fontSize: "15px", flexShrink: 0 },
  input: {
    flex: 1,
    padding: "13px 0",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "inherit",
  },
  eyeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    padding: "0",
    flexShrink: 0,
  },
  forgotLink: {
    fontSize: "12px",
    color: "#6366f1",
    cursor: "pointer",
    textDecoration: "none",
  },
  submitBtn: {
    padding: "14px",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop: "4px",
    boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
    fontFamily: "inherit",
  },
  submitBtnLoading: { opacity: 0.7, cursor: "not-allowed" },
  btnSpinner: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  switchText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
  },
  switchLink: {
    color: "#6366f1",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "underline",
  },
  loadingScreen: {
    minHeight: "100vh",
    background: "#060608",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: "3px solid rgba(99,102,241,0.2)",
    borderTop: "3px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};

export default Login;
