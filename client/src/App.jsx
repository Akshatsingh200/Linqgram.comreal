import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import EmailVerify from "./Pages/EmailVerify";
import Resetpassword from "./Pages/Resetpassword";
import Navbar from "./Components/Navbar";
import ContactFeed from "./Components/Feeds/ContactFeed";
import About from "./Components/About";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";
import { ToolContextProvider } from "./Context/ToolContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ToolContextProvider>
      <div>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <ToastContainer position="top-right" autoClose={3000} theme="dark" />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/email-verify" element={<EmailVerify />} />
                  <Route path="/reset-password" element={<Resetpassword />} />
                  <Route path="/contact" element={<ContactFeed />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </ToolContextProvider>
  );
};

export default App;
