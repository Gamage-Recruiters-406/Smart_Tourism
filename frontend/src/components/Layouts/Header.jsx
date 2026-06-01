import React from 'react';
import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn = false }) => {
  return (
    <header className="bg-white border-b border-gray-100 py-3 px-6 flex items-center justify-between shadow-sm">
      {/* Logo Area */}
      <Link to="/" className="flex items-center gap-3">
        <div className="bg-[#10a37f] text-white p-2 rounded-xl flex items-center justify-center shadow-sm">
          <Compass size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <div className="text-[22px] font-bold leading-tight flex tracking-tight">
            <span className="text-gray-900">Smart</span>
            <span className="text-[#10a37f]">Tourism</span>
          </div>
          <span className="text-[11px] text-gray-400 font-semibold tracking-wide uppercase mt-0.5">Travel Planner</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-600">
        <Link to="/planner" className="hover:text-[#10a37f] transition-colors">Trip Planner</Link>
        <Link to="/hotels" className="hover:text-[#10a37f] transition-colors">Hotels & Packages</Link>
        <Link to="/budget" className="hover:text-[#10a37f] transition-colors">Budget</Link>
        <Link to="/maps" className="hover:text-[#10a37f] transition-colors">Maps</Link>
      </nav>

      {/* new */}
      <div className="flex items-center gap-5 font-semibold text-sm">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
              Log In
            </Link>
            <Link to="/signup" className="bg-[#10a37f] text-white px-5 py-2.5 rounded-lg hover:bg-[#0e906f] transition-colors shadow-sm">
              Sign Up
            </Link>
          </>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#10a37f] text-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#0e906f] transition-colors">
            JD
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
