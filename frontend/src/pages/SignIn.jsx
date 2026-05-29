import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/sign.jpg';
import smallImage from '../assets/small.png';
import { useAuth } from '../context/AuthContext';

const CompassIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-9 h-9"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon
      points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
      fill="white"
      opacity="0.9"
    />
  </svg>
);

const PlaneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="#06b6d4"
    className="w-6 h-6 inline-block ml-1 -mt-1"
  >
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 shrink-0"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 shrink-0"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
  const API_VERSION = import.meta.env.VITE_API_VERSION || '/v1';

  const readResponseBody = async (response) => {
    const bodyText = await response.text();

    if (!bodyText) {
      return null;
    }

    try {
      return JSON.parse(bodyText);
    } catch (parseError) {
      return { message: bodyText };
    }
  };

  const performDemoLogin = () => {
    const demoUser = {
      name: 'Admin User',
      email,
      role: 'admin',
      userType: 'admin',
      isAdmin: true,
    };

    login(demoUser, 'demo-admin-token');
    setSuccess('Demo login successful! Redirecting...');

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

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
      const loginUrl = `${API_BASE_URL.replace(/\/+$/, '')}/${API_VERSION.replace(/^\/+|\/+$/g, '')}/users/login`;

      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await readResponseBody(response);

      if (!response.ok || data?.success === false) {
        if (import.meta.env.DEV) {
          performDemoLogin();
          return;
        }

        throw new Error(data?.message || 'Login failed. Please check your credentials.');
      }

      if (!data?.user || !data?.token) {
        if (import.meta.env.DEV) {
          performDemoLogin();
          return;
        }

        throw new Error('Login response was incomplete. Please try again.');
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
      {/* ── LEFT PANEL ── */}
      <div className="relative w-full md:w-[54%] h-[40%] md:h-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/35" />

        {/* Glassmorphism branding card */}
        <div
          className="absolute bottom-[10%] md:bottom-[18%] left-1/2 -translate-x-1/2 rounded-2xl px-6 md:px-10 py-5 md:py-8 text-center w-[200px] md:w-[260px] shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {/* Green compass icon tile */}
          <div
            className="w-12 h-12 md:w-16 md:h-16 rounded-2xl mx-auto mb-2 md:mb-4 flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
            }}
          >
            <CompassIcon />
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

      {/* ── RIGHT PANEL ── */}
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
                <MailIcon />
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
                <LockIcon />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  disabled={loading}
                  className="flex-1 outline-none text-gray-600 text-xs md:text-sm bg-transparent tracking-widest disabled:opacity-50"
                  placeholder="••••••••••••"
                  required
                />
              </div>

              {/* Forgot password — visual only, no functionality */}
              <div className="flex justify-end mt-1.5">
                <span className="text-gray-400 text-[11px] md:text-xs cursor-default select-none">
                  Forgot your password?
                </span>
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
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
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