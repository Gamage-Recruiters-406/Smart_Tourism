import { useState, useRef } from 'react';
import imgAmazon   from '../assets/images/amazon_eco_resort.png';
import imgSerengeti from '../assets/images/serengeti_safari.png';
import imgMaldives from '../assets/images/maldives_overwater.png';

const featured = [
  {
    id: 'amazon',
    title: 'Amazonia Eco-Resort',
    subtitle: 'Brazil',
    description:
      "Discover the heart of the world's largest rainforest. Live every detail with nature, sustainability, and luxury treehouse living.",
    image: imgAmazon,
    badge: "Editor's Pick",
    badgeColor: 'bg-emerald-500',
  },
  {
    id: 'serengeti',
    title: 'Serengeti Private Safari',
    subtitle: 'Tanzania',
    description:
      "Africa's greatest wildlife spectacle awaits. Track the Big Five with expert guides on an exclusive private conservancy.",
    image: imgSerengeti,
    badge: 'Trending Now',
    badgeColor: 'bg-orange-500',
  },
  {
    id: 'maldives',
    title: 'Maldives Overwater Retreat',
    subtitle: 'Maldives',
    description:
      'Breathe in paradise from your own private overwater villa. Crystal lagoons, sunsets, and five-star ocean comforts await.',
    image: imgMaldives,
    badge: 'Trending Now',
    badgeColor: 'bg-orange-500',
  },
  {
    id: 'patagonia',
    title: 'Patagonia Wild Trek',
    subtitle: 'Chile',
    description:
      "Traverse the world's end — glaciers, jagged peaks, and untouched wilderness of Torres del Paine National Park.",
    image: imgAmazon,
    badge: 'Adventure',
    badgeColor: 'bg-blue-500',
  },
  {
    id: 'kyoto-autumn',
    title: 'Kyoto Autumn Retreat',
    subtitle: 'Japan',
    description:
      'Witness the breathtaking crimson maples of Arashiyama, ancient tea ceremonies, and serene bamboo forests.',
    image: imgSerengeti,
    badge: 'Seasonal',
    badgeColor: 'bg-red-500',
  },
];

/* ── single featured card ── */
const FeaturedCard = ({ item }) => (
  <div
    id={`featured-${item.id}`}
    className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer flex-shrink-0 w-80"
  >
    {/* image */}
    <div className="h-80 overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
    </div>

    {/* gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

    {/* badge */}
    <span
      className={`absolute top-4 left-4 ${item.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}
    >
      {item.badge}
    </span>

    {/* content */}
    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
      <p className="text-white/60 text-xs font-medium flex items-center gap-1 mb-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {item.subtitle}
      </p>
      <h3 className="font-extrabold text-xl mb-2 leading-tight">{item.title}</h3>
      <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        {item.description}
      </p>
      <button
        id={`book-exp-${item.id}`}
        className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2.5 rounded-full border border-white/30 transition-all duration-200 hover:scale-105"
      >
        Book Experience
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
);

/* ── arrow button (same as DestinationCards) ── */
const ArrowBtn = ({ dir, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={dir === 'left' ? 'Scroll left' : 'Scroll right'}
    className={`
      w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0
      transition-all duration-200
      ${disabled
        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
        : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:scale-110'
      }
    `}
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d={dir === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
);

/* ── main section ── */
const FeaturedSection = () => {
  const scrollRef = useRef(null);
  const CARD_W    = 320 + 24; // w-80 (320px) + gap-6 (24px)

  const [atStart,   setAtStart]   = useState(true);
  const [atEnd,     setAtEnd]     = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    setActiveIdx(Math.round(el.scrollLeft / CARD_W));
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? CARD_W * 2 : -CARD_W * 2, behavior: 'smooth' });
    setTimeout(updateState, 350);
  };

  return (
    <section id="featured" className="bg-gray-50/80 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-1">
              Curated For You
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Most Popular This Month
            </h2>
          </div>

          {/* arrows + view all */}
          <div className="flex items-center gap-3">
            <ArrowBtn dir="left"  onClick={() => scroll('left')}  disabled={atStart} />
            <ArrowBtn dir="right" onClick={() => scroll('right')} disabled={atEnd}   />
            <a
              href="#"
              id="view-all-featured"
              className="hidden md:flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-200 ml-2"
            >
              View All Featured
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* scrollable row */}
        <div
          ref={scrollRef}
          onScroll={updateState}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featured.map((item) => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </div>

        {/* animated progress dots */}
        <div className="flex justify-center gap-2 mt-5">
          {featured.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? 'w-6 bg-blue-500'
                  : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedSection;
