import React from "react";
import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 text-center">
      <Ghost size={100} className="text-primary animate-bounce mb-6" />
      <h1 className="text-6xl font-extrabold text-base-content mb-2">404</h1>
      <p className="text-xl text-base-content/60 mb-8">
        Oops! This magical page has disappeared into the void. ✨
      </p>
      <Link
        to="/"
        className="btn btn-primary btn-lg rounded-full px-8 shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
