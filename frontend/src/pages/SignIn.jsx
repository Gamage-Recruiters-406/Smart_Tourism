import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Compass, Loader2 } from 'lucide-react';
import backgroundImage from '../assets/sign.jpg';
import smallImage from '../assets/small.png';
import { useAuth } from '../context/AuthContext';

const PlaneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="#06b6d4"
    className="w-6 h-6 inline-block ml-1 -mt-1"
  >
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_VERSION = import.meta.env.VITE_API_VERSION;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const loginUrl = `${API_BASE_URL}${API_VERSION}/users/login`;

      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      setSuccess('Login successful! Redirecting...');
      login(data.user, data.token);

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden font-sans">
      {/* ── LEFT PANEL  */}
      <div className="relative w-full md:w-1/2 h-[40%] md:h-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* vignette  */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />

        {/* Glassmorphism branding card*/}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl px-6 md:px-10 py-5 md:py-8 text-center w-[200px] md:w-[260px] shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <div
            className="w-12 h-12 md:w-16 md:h-16 rounded-2xl mx-auto mb-2 md:mb-4 flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
            }}
          >
            <Compass className="w-7 h-7 md:w-9 md:h-9 text-white" />
          </div>

          <h2 className="text-white text-lg md:text-2xl font-bold tracking-tight mb-1">
            Smart Tourism
          </h2>
          <div className="w-8 md:w-10 h-0.5 bg-white/60 mx-auto my-1 md:my-2 rounded-full" />
          <p className="text-white/70 md:text-white/80 text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.18em] uppercase font-medium">
            Explore Intelligently
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL  */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center px-6 md:px-12 py-8 md:py-0 overflow-y-auto">
        <div className="w-full max-w-[360px]">
          {/* Heading */}
          <div className="text-center mb-6 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#06b6d4' }}>
              Welcome <PlaneIcon />
            </h1>
            <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2 tracking-wide">
              Login with Email
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs md:text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs md:text-sm text-center font-medium">
              {success}
            </div>
          )}

          {/* Fields */}
          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
            {/* Email field */}
            <div className="relative">
              <span
                className="absolute -top-2.5 left-3 text-[11px] md:text-xs font-medium px-1 bg-white z-10"
                style={{ color: '#06b6d4' }}
              >
                Email
              </span>
              <div
                className={`flex items-center gap-2 md:gap-3 border rounded-lg px-3 md:px-4 py-2.5 md:py-3 transition-all duration-200 ${
                  emailFocused
                    ? 'border-cyan-400 shadow-sm shadow-cyan-100'
                    : 'border-gray-200'
                }`}
              >
                <Mail className="w-5 h-5 shrink-0 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  disabled={loading}
                  className="flex-1 outline-none text-gray-600 text-xs md:text-sm bg-transparent disabled:opacity-50"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="relative">
              <span
                className="absolute -top-2.5 left-3 text-[11px] md:text-xs font-medium px-1 bg-white z-10"
                style={{ color: '#06b6d4' }}
              >
                Password
              </span>
              <div
                className={`flex items-center gap-2 md:gap-3 border rounded-lg px-3 md:px-4 py-2.5 md:py-3 transition-all duration-200 ${
                  passwordFocused
                    ? 'border-cyan-400 shadow-sm shadow-cyan-100'
                    : 'border-gray-200'
                }`}
              >
                <Lock className="w-5 h-5 shrink-0 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  disabled={loading}
                  className="flex-1 outline-none text-gray-600 text-xs md:text-sm bg-transparent tracking-widest disabled:opacity-50"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

            </div>

            {/* LOGIN button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 md:py-3.5 rounded-lg text-white font-semibold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{
                background:
                  'linear-gradient(90deg, #22d3ee 0%, #0891b2 50%, #1e3a5f 100%)',
                boxShadow: '0 4px 15px rgba(8,145,178,0.35)',
              }}
              onMouseEnter={(e) => {
                if (loading) return;
                e.currentTarget.style.background =
                  'linear-gradient(90deg, #0891b2 0%, #0e7490 50%, #172f4a 100%)';
                e.currentTarget.style.boxShadow =
                  '0 8px 25px rgba(8,145,178,0.5)';
              }}
              onMouseLeave={(e) => {
                if (loading) return;
                e.currentTarget.style.background =
                  'linear-gradient(90deg, #22d3ee 0%, #0891b2 50%, #1e3a5f 100%)';
                e.currentTarget.style.boxShadow =
                  '0 4px 15px rgba(8,145,178,0.35)';
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                  LOGGING IN...
                </span>
              ) : (
                'LOGIN'
              )}
            </button>

            {/* Register link */}
            <p className="text-center text-gray-400 text-xs md:text-sm">
              Don't have account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-cyan-500 font-semibold hover:text-cyan-600 transition-colors"
              >
                Register Now
              </button>
            </p>
          </form>
        </div>
      </div>
      {/* ── BOTTOM RIGHT DECORATION ── */}
      <img
        src={smallImage}
        alt=""
        className="fixed bottom-4 right-4 pointer-events-none select-none z-50 w-16 h-16 object-contain"
      />
    </div>
  );
}