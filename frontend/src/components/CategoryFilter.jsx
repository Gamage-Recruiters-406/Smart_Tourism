import { useState } from 'react';
import CustomDropdown from './CustomDropdown';

/* ─────────────────────────────────────────────
   Category data
───────────────────────────────────────────── */
const categories = [
  {
    id: 'beaches',
    label: 'Beaches',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707" />
        <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
      </svg>
    ),
  },
  {
    id: 'mountains',
    label: 'Mountains',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 21l4-8 4 8M4 21l8-17 8 17" />
      </svg>
    ),
  },
  {
    id: 'cultural',
    label: 'Cultural',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" />
      </svg>
    ),
  },
  {
    id: 'adventure',
    label: 'Adventure',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    id: 'wildlife',
    label: 'Wildlife',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'city-tours',
    label: 'City Tours',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'luxury',
    label: 'Luxury',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: 'historical',
    label: 'Historical',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   Dropdown option data
───────────────────────────────────────────── */
const countryOptions = [
  { label: 'All Countries',   value: 'All Countries',   icon: '🌍' },
  { label: 'Indonesia',       value: 'Indonesia',       icon: '🇮🇩' },
  { label: 'Switzerland',     value: 'Switzerland',     icon: '🇨🇭' },
  { label: 'Japan',           value: 'Japan',           icon: '🇯🇵' },
  { label: 'Greece',          value: 'Greece',          icon: '🇬🇷' },
  { label: 'Tanzania',        value: 'Tanzania',        icon: '🇹🇿' },
  { label: 'Maldives',        value: 'Maldives',        icon: '🇲🇻' },
  { label: 'Brazil',          value: 'Brazil',          icon: '🇧🇷' },
];

const budgetOptions = [
  { label: 'All Budgets',          value: 'All Budgets',          icon: '💰' },
  { label: 'Under $1,000',         value: 'Under $1,000',         icon: '💵' },
  { label: '$1,000 – $2,000',      value: '$1,000 – $2,000',      icon: '💳' },
  { label: '$2,000 – $5,000',      value: '$2,000 – $5,000',      icon: '🏷️' },
  { label: '$5,000+',              value: '$5,000+',              icon: '💎' },
];

const ratingOptions = [
  { label: 'All Ratings',    value: 'All Ratings',    icon: '⭐' },
  { label: '5 Stars only',   value: '5 Stars only',   icon: '🏆' },
  { label: '4 Stars & up',   value: '4 Stars & up',   icon: '😊' },
  { label: '3 Stars & up',   value: '3 Stars & up',   icon: '👍' },
];

const sortOptions = [
  { label: 'Popularity',         value: 'Popularity',         icon: '🔥' },
  { label: 'Price: Low → High',  value: 'Price: Low → High',  icon: '↑' },
  { label: 'Price: High → Low',  value: 'Price: High → Low',  icon: '↓' },
  { label: 'Highest Rating',     value: 'Highest Rating',     icon: '⭐' },
  { label: 'Newest First',       value: 'Newest First',       icon: '🆕' },
];

/* ─────────────────────────────────────────────
   CategoryFilter component
───────────────────────────────────────────── */
const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState('beaches');
  const [country, setCountry] = useState('All Countries');
  const [budget,  setBudget]  = useState('All Budgets');
  const [rating,  setRating]  = useState('All Ratings');
  const [sort,    setSort]    = useState('Popularity');

  return (
    <section id="category-filter" className="bg-white shadow-sm py-5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── category tabs ── */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-xl
                text-xs font-semibold transition-all duration-200
                whitespace-nowrap min-w-[70px] border-2
                ${activeCategory === cat.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                  : 'text-gray-500 border-gray-200 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50'
                }
              `}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* ── filters row ── */}
        <div className="flex flex-wrap items-center gap-3">

          {/* divider label */}
          <span className="hidden md:flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-widest mr-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filter
          </span>

          <CustomDropdown
            id="filter-country"
            value={country}
            onChange={setCountry}
            options={countryOptions}
            prefix="Country"
          />

          <CustomDropdown
            id="filter-budget"
            value={budget}
            onChange={setBudget}
            options={budgetOptions}
            prefix="Budget"
          />

          <CustomDropdown
            id="filter-rating"
            value={rating}
            onChange={setRating}
            options={ratingOptions}
            prefix="Rating"
          />

          {/* reset filters */}
          {(country !== 'All Countries' || budget !== 'All Budgets' || rating !== 'All Ratings') && (
            <button
              id="reset-filters"
              onClick={() => { setCountry('All Countries'); setBudget('All Budgets'); setRating('All Ratings'); }}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl border-2 border-red-200 hover:border-red-400 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset
            </button>
          )}

          {/* spacer */}
          <div className="flex-1" />

          {/* sort */}
          <div className="flex items-center gap-2">
            <CustomDropdown
              id="sort-select"
              value={sort}
              onChange={setSort}
              options={sortOptions}
              prefix="Sort"
              variant="solid"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
