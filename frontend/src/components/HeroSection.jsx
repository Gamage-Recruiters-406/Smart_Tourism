import { useState } from 'react';
import heroBg from '../assets/images/hero_background.png';
import CustomCalendar from './CustomCalendar';

/* ─────────────────────────────────────────────
   Travelers counter popover
───────────────────────────────────────────── */
const TravelersModal = ({ value, onChange, onClose }) => {
  const rows = [
    { key: 'adults',   label: 'Adults',   sub: 'Ages 13 or above', min: 1 },
    { key: 'children', label: 'Children', sub: 'Ages 2 – 12',      min: 0 },
    { key: 'infants',  label: 'Infants',  sub: 'Under 2',          min: 0 },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">Travelers</h3>
            <p className="text-sm text-gray-400 mt-0.5">Who's coming along?</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* counters */}
        <div className="space-y-1">
          {rows.map(({ key, label, sub, min }) => (
            <div
              key={key}
              className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="text-gray-800 font-semibold text-sm">{label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onChange({ ...value, [key]: Math.max(min, value[key] - 1) })}
                  disabled={value[key] <= min}
                  className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold
                             hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50
                             disabled:opacity-30 disabled:cursor-not-allowed
                             transition-all duration-150"
                >
                  −
                </button>
                <span className="w-5 text-center font-bold text-gray-800 text-base">{value[key]}</span>
                <button
                  onClick={() => onChange({ ...value, [key]: value[key] + 1 })}
                  className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold
                             hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50
                             transition-all duration-150"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* total + confirm */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Total:{' '}
            <span className="font-bold text-gray-800">
              {value.adults + value.children + value.infants} traveler
              {value.adults + value.children + value.infants !== 1 ? 's' : ''}
            </span>
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md shadow-blue-200 transition-all duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const formatDate = (d) =>
  d
    ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '';

const travelersText = ({ adults, children, infants }) => {
  const parts = [];
  if (adults)   parts.push(`${adults} adult${adults   > 1 ? 's' : ''}`);
  if (children) parts.push(`${children} child${children > 1 ? 'ren' : ''}`);
  if (infants)  parts.push(`${infants} infant${infants > 1 ? 's' : ''}`);
  return parts.join(', ');
};

/* ─────────────────────────────────────────────
   Field wrapper – shows error ring + message
───────────────────────────────────────────── */
const SearchField = ({ children, error, className = '' }) => (
  <div className={`flex flex-col ${className}`}>
    <div className={`flex-1 flex flex-col px-4 py-2 rounded-xl transition-all duration-200 ${error ? 'ring-2 ring-red-400 bg-red-50' : ''}`}>
      {children}
    </div>
    {error && (
      <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1 flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   Main HeroSection
───────────────────────────────────────────── */
const HeroSection = () => {
  const [destination, setDestination]   = useState('');
  const [dateRange, setDateRange]       = useState({ start: null, end: null });
  const [travelers, setTravelers]       = useState({ adults: 1, children: 0, infants: 0 });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTravelers, setShowTravelers] = useState(false);
  const [errors, setErrors]             = useState({});
  const [searched, setSearched]         = useState(false);

  /* ── validation ── */
  const validate = () => {
    const e = {};
    if (!destination.trim() || destination.trim().length < 2)
      e.destination = 'Please enter a destination (min. 2 characters)';
    if (!dateRange.start)
      e.dates = 'Please select a check-in date';
    else if (!dateRange.end)
      e.dates = 'Please select a check-out date';
    return e;
  };

  const handleSearch = () => {
    setSearched(true);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      alert(
        `Searching for: ${destination}\n` +
        `Dates: ${formatDate(dateRange.start)} → ${formatDate(dateRange.end)}\n` +
        `Travelers: ${travelersText(travelers)}`
      );
    }
  };

  /* live validation after first submit attempt */
  const handleDestChange = (val) => {
    setDestination(val);
    if (searched)
      setErrors((prev) => ({
        ...prev,
        destination: val.trim().length < 2 ? 'Please enter a destination (min. 2 characters)' : undefined,
      }));
  };

  /* dates display */
  const datesLabel = dateRange.start
    ? dateRange.end
      ? `${formatDate(dateRange.start)} → ${formatDate(dateRange.end)}`
      : `${formatDate(dateRange.start)} → ?`
    : null;

  return (
    <>
      {showCalendar && (
        <CustomCalendar
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={(r) => {
            setDateRange(r);
            if (searched)
              setErrors((prev) => ({
                ...prev,
                dates: !r.start ? 'Please select a check-in date'
                      : !r.end   ? 'Please select a check-out date'
                      : undefined,
              }));
          }}
          onClose={() => setShowCalendar(false)}
        />
      )}

      {showTravelers && (
        <TravelersModal
          value={travelers}
          onChange={setTravelers}
          onClose={() => setShowTravelers(false)}
        />
      )}

      <section
        id="hero"
        className="relative w-full min-h-[90vh] flex flex-col items-center justify-center"
      >
        {/* background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/55" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-gray-50 to-transparent" />

        {/* content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto w-full">
          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            #1 Rated Travel Platform 2025
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-5 drop-shadow-2xl">
            Explore Beautiful
            <br />
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Destinations
            </span>
          </h1>

          <p className="text-white/85 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
            Discover hidden gems, iconic landmarks, and unforgettable experiences
            around the world. Let us craft your perfect journey.
          </p>

          {/* ── search box ── */}
          <div
            id="hero-search-box"
            className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-2 flex flex-col md:flex-row items-stretch gap-2"
          >
            {/* Destination */}
            <SearchField error={errors.destination} className="flex-1">
              <label
                htmlFor="search-destination"
                className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Destination
              </label>
              <input
                id="search-destination"
                type="text"
                value={destination}
                onChange={(e) => handleDestChange(e.target.value)}
                placeholder="Where to?"
                className="text-gray-900 text-sm font-semibold bg-transparent outline-none placeholder:text-gray-500 w-full"
              />
            </SearchField>

            <div className="hidden md:block w-px bg-gray-200 my-2" />

            {/* Dates */}
            <SearchField error={errors.dates} className="flex-1">
              <label
                className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Dates
              </label>
              <button
                id="search-dates"
                type="button"
                onClick={() => setShowCalendar(true)}
                className="text-left text-sm font-medium bg-transparent outline-none w-full cursor-pointer"
              >
                {datesLabel ? (
                  <span className="text-gray-900 font-semibold">{datesLabel}</span>
                ) : (
                  <span className="text-gray-500">Select dates</span>
                )}
              </button>
            </SearchField>

            <div className="hidden md:block w-px bg-gray-200 my-2" />

            {/* Travelers */}
            <SearchField className="flex-1">
              <label
                className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Travelers
              </label>
              <button
                id="search-travelers"
                type="button"
                onClick={() => setShowTravelers(true)}
                className="text-left text-sm font-medium bg-transparent outline-none w-full cursor-pointer"
              >
                <span className="text-gray-900 font-semibold">{travelersText(travelers)}</span>
              </button>
            </SearchField>

            {/* Search button */}
            <button
              id="hero-search-btn"
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/30 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>

          {/* quick tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-white/60 text-sm">Popular:</span>
            {['Maldives', 'Santorini', 'Kyoto', 'Safari', 'Swiss Alps'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleDestChange(tag)}
                className="text-white/80 text-xs border border-white/30 px-3 py-1 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200 backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce z-10">
          <span className="text-white/50 text-xs">Scroll</span>
          <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
