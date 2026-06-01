import { useState } from "react";
import heroBg from "../assets/hero-travel.jpg";

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5 19.79 19.79 0 0 1 1.6 2.87 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.91-1a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const MapPinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-3 h-3"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function ContactCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-[#D0E8F2] rounded-2xl cursor-pointer transition-all duration-300 hover:border-[#00C0E8] hover:shadow-[0_4px_20px_rgba(0,192,232,0.12)] hover:translate-x-1">
      <div className="w-11 h-11 rounded-xl bg-[#E0F7FD] flex items-center justify-center flex-shrink-0 text-[#00C0E8]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#5A7A99] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-[#1A2E44]">{value}</p>
      </div>
    </div>
  );
}

function SocialBtn({ children, href = "#" }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-xl border border-[#D0E8F2] bg-white flex items-center justify-center text-[#5A7A99] transition-all duration-200 hover:bg-[#00C0E8] hover:border-[#00C0E8] hover:text-white"
    >
      {children}
    </a>
  );
}

function FormInput({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#1A2E44]">
        {label} {required && <span className="text-[#00C0E8]">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-2.5 text-sm text-[#1A2E44] bg-[#F8FEFF] border border-[#D0E8F2] rounded-xl outline-none transition-all duration-200 placeholder:text-[#A0B8C8] focus:border-[#00C0E8] focus:bg-white focus:ring-4 focus:ring-[#00C0E8]/10";

function StatItem({ number, label, last }) {
  return (
    <div
      className={`flex-1 text-center px-5 ${!last ? "border-r border-white/25" : ""}`}
    >
      <p className="font-['Syne'] text-2xl font-black text-[#0A1628]">
        {number}
      </p>
      <p className="text-xs text-[#0A1628]/65 mt-0.5">{label}</p>
    </div>
  );
}

export default function ContactUs() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email.";
    if (!form.inquiry) errs.inquiry = "Please select an inquiry type.";
    if (!form.message.trim()) errs.message = "Message cannot be empty.";
    return errs;
  };

  // ── BACKEND CONNECTED ─────────────────────────────────────────────────────
  // API: POST /api/v1/contacts
  // Model fields: name, email, phone, subject, message, inquiry
  // ─────────────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const payload = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone || "",
        subject: form.inquiry, // backend requires "subject" — using inquiry value
        message: form.message,
        inquiry: form.inquiry,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/contacts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setErrors({
          form: data.message || "Something went wrong. Please try again.",
        });
        return;
      }

      // success
      setSuccess(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiry: "",
        message: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setErrors({ form: "Cannot connect to server. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F4FBFD] font-['DM_Sans'] min-h-screen">
      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-16 pb-24 overflow-hidden">
        <img
          src={heroBg}
          alt="Travel Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A1628]/50" />
        <div className="pointer-events-none absolute -top-24 -right-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,192,232,0.18)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-16 left-[10%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,192,232,0.10)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-[#00C0E8] border border-[#00C0E8]/30 bg-[#00C0E8]/15 mb-6">
            ✦ Get in touch with us
          </span>
          <h1 className="font-['Syne'] text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4 max-w-xl">
            We're here to make your{" "}
            <span className="text-[#00C0E8]">travel dreams</span> happen.
          </h1>
          <p className="text-sm md:text-base text-white/60 font-light leading-relaxed max-w-md">
            Have a question about your trip, need help planning your itinerary,
            or just want to say hello? Our travel experts are ready to help.
          </p>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-[#00C0E8] px-6 md:px-12 py-5 flex">
        <StatItem number="24/7" label="Support Available" />
        <StatItem number="< 2h" label="Avg. Response Time" />
        <StatItem number="50+" label="Destinations Covered" />
        <StatItem number="4.9★" label="Customer Satisfaction" last />
      </div>

      {/* MAIN */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        {/* LEFT */}
        <div>
          <p className="text-[10px] font-semibold tracking-[2px] uppercase text-[#00C0E8] mb-2">
            Contact Information
          </p>
          <h2 className="font-['Syne'] text-3xl font-bold text-[#0A1628] leading-tight mb-3">
            Let's start a conversation
          </h2>
          <p className="text-sm text-[#5A7A99] font-light leading-relaxed mb-9">
            Reach out through any of the channels below. Whether you're planning
            a solo adventure or a group tour, our team is here to guide you
            every step of the way.
          </p>
          <div className="flex flex-col gap-3 mb-9">
            <ContactCard
              icon={<PhoneIcon />}
              label="Phone Number"
              value="+94 11 234 5678"
            />
            <ContactCard
              icon={<MailIcon />}
              label="Email Address"
              value="hello@smarttour.lk"
            />
            <ContactCard
              icon={<MapPinIcon />}
              label="Our Office"
              value="45 Galle Road, Colombo 03, Sri Lanka"
            />
            <ContactCard
              icon={<ClockIcon />}
              label="Working Hours"
              value="Mon – Sat: 9:00 AM – 7:00 PM"
            />
          </div>
          <p className="text-xs font-medium text-[#5A7A99] mb-3">
            Follow us on
          </p>
          <div className="flex gap-2">
            <SocialBtn>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </SocialBtn>
            <SocialBtn>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </SocialBtn>
            <SocialBtn>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </SocialBtn>
            <SocialBtn>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </SocialBtn>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div className="relative bg-white rounded-3xl p-9 shadow-[0_4px_32px_rgba(0,192,232,0.10)] border border-[#D0E8F2] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00C0E8] to-[#0099BB]" />
          <h3 className="font-['Syne'] text-xl font-bold text-[#0A1628] mb-1">
            Send us a message
          </h3>
          <p className="text-xs text-[#5A7A99] font-light mb-7">
            Fill in the form and our team will get back to you within 2 hours.
          </p>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <FormInput label="First Name" required error={errors.firstName}>
                <input
                  className={inputClass}
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
              </FormInput>
              <FormInput label="Last Name">
                <input
                  className={inputClass}
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </FormInput>
            </div>

            <FormInput label="Email Address" required error={errors.email}>
              <input
                className={inputClass}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </FormInput>

            <FormInput label="Phone Number">
              <input
                className={inputClass}
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+94 77 000 0000"
              />
            </FormInput>

            <FormInput label="Inquiry Type" required error={errors.inquiry}>
              <select
                className={inputClass + " appearance-none cursor-pointer"}
                name="inquiry"
                value={form.inquiry}
                onChange={handleChange}
              >
                <option value="">Select inquiry type...</option>
                <option>Trip Planning Assistance</option>
                <option>Hotel &amp; Package Bookings</option>
                <option>Budget Estimation</option>
                <option>Technical Support</option>
                <option>Partnership Inquiry</option>
                <option>General Feedback</option>
              </select>
            </FormInput>

            <FormInput label="Your Message" required error={errors.message}>
              <textarea
                className={
                  inputClass + " resize-y min-h-[110px] leading-relaxed"
                }
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you plan the perfect trip..."
              />
            </FormInput>

            {errors.form && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-300 text-red-600 text-xs">
                ⚠️ {errors.form}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-400 text-green-700 text-xs">
                <CheckIcon /> Message sent! We'll get back to you within 2
                hours.
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#00C0E8] hover:bg-[#0099BB] disabled:opacity-60 text-[#0A1628] font-['Syne'] font-bold text-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,192,232,0.32)]"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <SendIcon />
                </>
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-[10px] text-[#5A7A99]">
              <LockIcon /> Your information is secure and will never be shared.
            </p>
          </div>
        </div>
      </div>

      {/* MAP */}
      <section className="bg-[#0A1628] px-6 md:px-12 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="mb-7">
            <h3 className="font-['Syne'] text-2xl font-bold text-white mb-1">
              Find Us
            </h3>
            <p className="text-xs text-white/40 font-light">
              45 Galle Road, Colombo 03, Sri Lanka
            </p>
          </div>
          <div className="w-full h-72 rounded-2xl overflow-hidden border border-[#00C0E8]/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9!2d79.8567!3d6.9147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591614000001%3A0x1!2s45+Galle+Road%2C+Colombo+03%2C+Sri+Lanka!5e0!3m2!1sen!2slk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SmartTour Office Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
