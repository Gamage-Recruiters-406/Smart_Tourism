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

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Traveler',
  });
  
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_VERSION = import.meta.env.VITE_API_VERSION;

  // Validation functions
  const validateFullName = (name) => {
    if (!name) return 'Full name is required';
    if (name.length < 2) return 'Full name must be at least 2 characters';
    if (name.length > 50) return 'Full name must be less than 50 characters';
    if (!/^[a-zA-Z\s\-']+$/.test(name)) return 'Full name can only contain letters, spaces, hyphens, and apostrophes';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (email.length > 100) return 'Email must be less than 100 characters';
    return '';
  };

 const validatePhone = (phone) => {
    if (!phone) return '';
    const phoneRegex = /^\+?\(?[0-9]{1,4}\)?[-\s.]?\(?[0-9]{1,4}\)?[-\s.]?[0-9]{1,5}[-\s.]?[0-9]{1,5}$/;
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return '';
};
  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password.length > 50) return 'Password must be less than 50 characters';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    if (!/(?=.*[@$!%*?&])/.test(password)) return 'Password must contain at least one special character (@$!%*?&)';
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Validate field on change
    let errorMessage = '';
    switch (name) {
      case 'fullName':
        errorMessage = validateFullName(value);
        break;
      case 'email':
        errorMessage = validateEmail(value);
        break;
      case 'phone':
        errorMessage = validatePhone(value);
        break;
      case 'password':
        errorMessage = validatePassword(value);
        // Also validate confirm password if it has been touched
        if (touched.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: validateConfirmPassword(form.confirmPassword, value)
          }));
        }
        break;
      case 'confirmPassword':
        errorMessage = validateConfirmPassword(value, form.password);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    let errorMessage = '';
    switch (name) {
      case 'fullName':
        errorMessage = validateFullName(form.fullName);
        break;
      case 'email':
        errorMessage = validateEmail(form.email);
        break;
      case 'phone':
        errorMessage = validatePhone(form.phone);
        break;
      case 'password':
        errorMessage = validatePassword(form.password);
        break;
      case 'confirmPassword':
        errorMessage = validateConfirmPassword(form.confirmPassword, form.password);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const isFormValid = () => {
    const fullNameError = validateFullName(form.fullName);
    const emailError = validateEmail(form.email);
    const phoneError = validatePhone(form.phone);
    const passwordError = validatePassword(form.password);
    const confirmPasswordError = validateConfirmPassword(form.confirmPassword, form.password);
    
    return !fullNameError && !emailError && !phoneError && !passwordError && !confirmPasswordError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });
    
    // Validate all fields
    const fullNameError = validateFullName(form.fullName);
    const emailError = validateEmail(form.email);
    const phoneError = validatePhone(form.phone);
    const passwordError = validatePassword(form.password);
    const confirmPasswordError = validateConfirmPassword(form.confirmPassword, form.password);
    
    setErrors({
      fullName: fullNameError,
      email: emailError,
      phone: phoneError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    
    // Check if there are any validation errors
    if (fullNameError || emailError || phoneError || passwordError || confirmPasswordError) {
      setError('Please fix the validation errors before submitting.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const registerUrl = `${API_BASE_URL}${API_VERSION}/users/register`;

      let backendRole = 'traveler';
      if (form.role.toLowerCase() === 'admin') {
        backendRole = 'admin';
      }

      const payload = {
        name: form.fullName.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
        phone: form.phone.trim() || '',
        role: backendRole,
        preferences: [],
      };

      const response = await fetch(registerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || 'Registration failed. Please check details.',
        );
      }

      setSuccess('Account registered successfully! Redirecting...');
      login(data.user, data.token);

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(
        err.message || 'Something went wrong. Please check your connection.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden font-sans">
      {/* LEFT PANEL */}
      <div className="relative w-full md:w-[54%] h-[40%] md:h-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/35" />
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

      {/* RIGHT PANEL */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center px-6 md:px-12 py-8 md:py-0 overflow-y-auto">
        <div className="w-full max-w-[360px]">
          <div className="text-center mb-6 md:mb-10">
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: '#06b6d4' }}
            >
              Welcome <PlaneIcon />
            </h1>
            <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2 tracking-wide">
              Create your account
            </p>
          </div>

          {/* General Error/Success Messages */}
          {error && !errors.fullName && !errors.email && !errors.password && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs md:text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs md:text-sm text-center font-medium">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* Full Name */}
            <div className="relative">
              <span
                className="absolute -top-2.5 left-3 text-[11px] md:text-xs font-medium px-1 bg-white z-10"
                style={{ color: '#06b6d4' }}
              >
                Full Name *
              </span>
              <div className={`flex items-center gap-2 md:gap-3 border rounded-lg px-3 md:px-4 py-2.5 md:py-3 transition-all duration-200 focus-within:shadow-sm ${
                touched.fullName && errors.fullName 
                  ? 'border-red-400 focus-within:border-red-400 focus-within:shadow-red-100' 
                  : 'border-gray-200 focus-within:border-cyan-400 focus-within:shadow-cyan-100'
              }`}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  className="w-5 h-5 shrink-0"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  className="flex-1 outline-none text-gray-600 text-xs md:text-sm bg-transparent disabled:opacity-50"
                  placeholder="John Doe"
                  required
                />
              </div>
              {touched.fullName && errors.fullName && (
                <p className="text-red-500 text-[10px] md:text-xs mt-1 ml-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <span
                className="absolute -top-2.5 left-3 text-[11px] md:text-xs font-medium px-1 bg-white z-10"
                style={{ color: '#06b6d4' }}
              >
                Email *
              </span>
              <div className={`flex items-center gap-2 md:gap-3 border rounded-lg px-3 md:px-4 py-2.5 md:py-3 transition-all duration-200 focus-within:shadow-sm ${
                touched.email && errors.email 
                  ? 'border-red-400 focus-within:border-red-400 focus-within:shadow-red-100' 
                  : 'border-gray-200 focus-within:border-cyan-400 focus-within:shadow-cyan-100'
              }`}>
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
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  className="flex-1 outline-none text-gray-600 text-xs md:text-sm bg-transparent disabled:opacity-50"
                  placeholder="your@email.com"
                  required
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-red-500 text-[10px] md:text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <span
                className="absolute -top-2.5 left-3 text-[11px] md:text-xs font-medium px-1 bg-white z-10"
                style={{ color: '#06b6d4' }}
              >
                Phone
              </span>
              <div className={`flex items-center gap-2 md:gap-3 border rounded-lg px-3 md:px-4 py-2.5 md:py-3 transition-all duration-200 focus-within:shadow-sm ${
                touched.phone && errors.phone 
                  ? 'border-red-400 focus-within:border-red-400 focus-within:shadow-red-100' 
                  : 'border-gray-200 focus-within:border-cyan-400 focus-within:shadow-cyan-100'
              }`}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  className="w-5 h-5 shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  className="flex-1 outline-none text-gray-600 text-xs md:text-sm bg-transparent disabled:opacity-50"
                  placeholder="+1 234 567 8900"
                />
              </div>
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-[10px] md:text-xs mt-1 ml-1">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <span
                className="absolute -top-2.5 left-3 text-[11px] md:text-xs font-medium px-1 bg-white z-10"
                style={{ color: '#06b6d4' }}
              >
                Password *
              </span>
              <div className={`flex items-center gap-2 md:gap-3 border rounded-lg px-3 md:px-4 py-2.5 md:py-3 transition-all duration-200 focus-within:shadow-sm ${
                touched.password && errors.password 
                  ? 'border-red-400 focus-within:border-red-400 focus-within:shadow-red-100' 
                  : 'border-gray-200 focus-within:border-cyan-400 focus-within:shadow-cyan-100'
              }`}>
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
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  className="flex-1 outline-none text-gray-600 text-xs md:text-sm bg-transparent tracking-widest disabled:opacity-50"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 shrink-0"
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-[10px] md:text-xs mt-1 ml-1">{errors.password}</p>
              )}
              {touched.password && !errors.password && form.password && (
                <p className="text-green-500 text-[10px] md:text-xs mt-1 ml-1">✓ Strong password</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <span
                className="absolute -top-2.5 left-3 text-[11px] md:text-xs font-medium px-1 bg-white z-10"
                style={{ color: '#06b6d4' }}
              >
                Confirm Password *
              </span>
              <div className={`flex items-center gap-2 md:gap-3 border rounded-lg px-3 md:px-4 py-2.5 md:py-3 transition-all duration-200 focus-within:shadow-sm ${
                touched.confirmPassword && errors.confirmPassword 
                  ? 'border-red-400 focus-within:border-red-400 focus-within:shadow-red-100' 
                  : 'border-gray-200 focus-within:border-cyan-400 focus-within:shadow-cyan-100'
              }`}>
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
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  className="flex-1 outline-none text-gray-600 text-xs md:text-sm bg-transparent tracking-widest disabled:opacity-50"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-gray-400 hover:text-gray-600 shrink-0"
                >
                  {showConfirm ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500 text-[10px] md:text-xs mt-1 ml-1">{errors.confirmPassword}</p>
              )}
              {touched.confirmPassword && !errors.confirmPassword && form.confirmPassword && (
                <p className="text-green-500 text-[10px] md:text-xs mt-1 ml-1">✓ Passwords match</p>
              )}
            </div>

            {/* Role */}
            <div className="relative">
              <span
                className="absolute -top-2.5 left-3 text-[11px] md:text-xs font-medium px-1 bg-white z-10"
                style={{ color: '#06b6d4' }}
              >
                Role
              </span>
              <div className="flex items-center gap-2 md:gap-3 border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 md:py-3 transition-all duration-200 focus-within:border-cyan-400 focus-within:shadow-sm focus-within:shadow-cyan-100">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  className="w-5 h-5 shrink-0"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  disabled={loading}
                  className="flex-1 outline-none text-gray-600 text-xs md:text-sm bg-transparent cursor-pointer disabled:opacity-50 appearance-none"
                >
                  <option value="Traveler">Traveler</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Password Requirements Hint */}
            {touched.password && form.password && !errors.password && (
              <div className="text-[10px] md:text-xs text-gray-500 mt-1 px-1">
                ✓ Password meets all requirements
              </div>
            )}
            
            {touched.password && !form.password && (
              <div className="text-[10px] md:text-xs text-gray-400 mt-1 px-1">
                Password must contain: lowercase, uppercase, number & special character (@$!%*?&)
              </div>
            )}

            {/* SIGN UP button */}
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full py-3 md:py-3.5 rounded-lg text-white font-semibold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{
                background:
                  'linear-gradient(90deg, #22d3ee 0%, #0891b2 50%, #1e3a5f 100%)',
                boxShadow: '0 4px 15px rgba(8,145,178,0.35)',
              }}
              onMouseEnter={(e) => {
                if (loading || !isFormValid()) return;
                e.currentTarget.style.background =
                  'linear-gradient(90deg, #0891b2 0%, #0e7490 50%, #172f4a 100%)';
                e.currentTarget.style.boxShadow =
                  '0 8px 25px rgba(8,145,178,0.5)';
              }}
              onMouseLeave={(e) => {
                if (loading || !isFormValid()) return;
                e.currentTarget.style.background =
                  'linear-gradient(90deg, #22d3ee 0%, #0891b2 50%, #1e3a5f 100%)';
                e.currentTarget.style.boxShadow =
                  '0 4px 15px rgba(8,145,178,0.35)';
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  SIGNING UP...
                </span>
              ) : (
                'SIGN UP'
              )}
            </button>

            {/* Sign In Link */}
            <p className="text-center text-gray-400 text-xs md:text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signin')}
                className="text-cyan-500 font-semibold hover:text-cyan-600 transition-colors"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* BOTTOM RIGHT DECORATION */}
      <img
        src={smallImage}
        alt=""
        className="fixed bottom-4 right-4 pointer-events-none select-none z-50 w-16 h-16 object-contain"
      />
    </div>
  );
}