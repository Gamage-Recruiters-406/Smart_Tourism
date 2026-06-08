import React from 'react';
import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Column */}
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="bg-[#10a37f] text-white p-1.5 rounded-lg flex items-center justify-center shadow-sm">
              <Compass size={20} strokeWidth={2.5} />
            </div>
            <div className="text-lg font-bold flex gap-1 items-center">
              <span className="text-white">Smart<span className="text-[#10a37f]">Tourism</span></span>
              <span className="text-sm font-medium text-slate-400">& Travel Planner</span>
            </div>
          </Link>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
            Simplifying travel — plan smarter trips, discover hotels and packages, track your budget, and explore the world with confidence.
          </p>
          <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-[#1e293b] border border-slate-700 text-sm text-white px-4 py-2.5 rounded-lg outline-none focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f] w-full max-w-[220px]"
            />
            <button 
              type="submit" 
              className="bg-[#20c997] hover:bg-[#1bb88a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Space Column to match image layout */}
        <div className="hidden md:block md:col-span-2"></div>

        {/* Resources Column */}
        <div className="md:col-span-2">
          <h4 className="text-white font-semibold mb-5 text-sm tracking-wide">Resources</h4>
          <ul className="space-y-3.5 text-sm text-slate-400">
            <li><Link to="#" className="hover:text-white transition-colors">User Guides</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Tutorials</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Help Center</Link></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="md:col-span-3">
          <h4 className="text-white font-semibold mb-5 text-sm tracking-wide">Legal</h4>
          <ul className="space-y-3.5 text-sm text-slate-400">
            <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-slate-500">
          © 2026 Smart Tourism & Travel Planner. All rights reserved.
        </p>
        <div className="flex gap-3">
          <a href="#" className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-slate-700 transition-colors text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-slate-700 transition-colors text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-slate-700 transition-colors text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
