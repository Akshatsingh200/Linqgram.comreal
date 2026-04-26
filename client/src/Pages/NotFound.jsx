import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white px-4">
      <div className="text-center">
        <h1 className="text-[120px] font-black bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent leading-none mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full font-semibold hover:opacity-90 transition-all"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
