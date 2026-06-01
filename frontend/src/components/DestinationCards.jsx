import { useState, useRef } from 'react';
import imgVillingili from '../assets/images/villingili_island.png';
import imgZermatt    from '../assets/images/zermatt_village.png';
import imgGion       from '../assets/images/gion_district.png';
import imgOia        from '../assets/images/oia_cliffside.png';

const destinations = [
  {
    id: 'villingili',
    name: 'Villingili Island',
    country: 'Maldives',
    rating: 4.9,
    price: 2400,
    duration: '7 Nights',
    description: 'Experience unrivaled luxury in overwater villas with turquoise lagoons and vibrant marine life.',
    image: imgVillingili,
    tag: 'Exclusive',
    tagColor: 'bg-blue-500',
  },
  {
    id: 'zermatt',
    name: 'Zermatt Village',
    country: 'Switzerland',
    rating: 4.8,
    price: 1850,
    duration: '5 Nights',
    description: 'Breathtaking views of the Matterhorn and world-class ski slopes in a charming alpine village.',
    image: imgZermatt,
    tag: 'Trending',
    tagColor: 'bg-emerald-500',
  },
  {
    id: 'gion',
    name: 'Gion District',
    country: 'Japan',
    rating: 4.7,
    price: 1400,
    duration: '6 Nights',
    description: 'Immerse yourself in traditional Japanese architecture and the enchanting world of geisha culture.',
    image: imgGion,
    tag: 'Cultural',
    tagColor: 'bg-pink-500',
  },
  {
    id: 'oia',
    name: 'Oia Cliffside',
    country: 'Greece',
    rating: 4.9,
    price: 1200,
    duration: '4 Nights',
    description: 'Breathtaking sunsets and iconic white-washed architecture perched on the volcanic caldera rim.',
    image: imgOia,
    tag: 'Top Rated',
    tagColor: 'bg-amber-500',
  },
  {
    id: 'bali',
    name: 'Ubud Rainforest',
    country: 'Indonesia',
    rating: 4.8,
    price: 980,
    duration: '5 Nights',
    description: 'Spiritual retreats, emerald rice terraces, and world-class spas hidden deep in the Bali jungle.',
    image: imgZermatt,   // reuse until more images added
    tag: 'Nature',
    tagColor: 'bg-green-500',
  },
  {
    id: 'dubai',
    name: 'Dubai Desert Escape',
    country: 'UAE',
    rating: 4.6,
    price: 2100,
    duration: '4 Nights',
    description: 'Dune bashing, camel rides and stargazing from a luxury desert camp under the open sky.',
    image: imgOia,       // reuse until more images added
    tag: 'Luxury',
    tagColor: 'bg-purple-500',
  },
  {
    id: 'patagonia',
    name: 'Patagonia Trek',
    country: 'Chile',
    rating: 4.9,
    price: 3200,
    duration: '10 Nights',
    description: "Traverse the world's end — glaciers, jagged peaks, and untouched wilderness of Torres del Paine.",
    image: imgVillingili, // reuse until more images added
    tag: 'Adventure',
    tagColor: 'bg-orange-500',
  },
  {
    id: 'marrakech',
    name: 'Marrakech Medina',
    country: 'Morocco',
    rating: 4.7,
    price: 750,
    duration: '3 Nights',
    description: 'Lose yourself in vibrant souks, aromatic spice markets, and ornate riads of the Red City.',
    image: imgGion,      // reuse until more images added
    tag: 'Cultural',
    tagColor: 'bg-red-500',
  },
];

/* ── star rating ── */
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        className={`w-3.5 h-3.5 ${s <= Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-gray-500 text-xs ml-1">({rating})</span>
  </div>
);

/* ── single card ── */
const DestinationCard = ({ dest }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div
      id={`dest-card-${dest.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex-shrink-0 w-72"
    >
      {/* image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3 left-3 ${dest.tagColor} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow`}>
          {dest.tag}
        </span>
        <button
          id={`wishlist-${dest.id}`}
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200"
          aria-label="Add to wishlist"
        >
          <svg
            className={`w-4 h-4 transition-colors duration-200 ${liked ? 'text-red-500' : 'text-gray-400'}`}
            fill={liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {dest.duration}
        </div>
      </div>

      {/* content */}
      <div className="p-4">
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {dest.country}
        </div>

        <h3 className="text-gray-900 font-bold text-base mb-1 truncate">{dest.name}</h3>
        <StarRating rating={dest.rating} />
        <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-2">{dest.description}</p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div>
            <span className="text-gray-400 text-xs">From</span>
            <div className="text-blue-600 font-extrabold text-lg leading-tight">
              ${dest.price.toLocaleString()}
            </div>
          </div>
          <button
            id={`book-${dest.id}`}
            className="w-9 h-9 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200"
            aria-label={`Book ${dest.name}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── scroll arrow button ── */
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
const DestinationCards = () => {
  const scrollRef  = useRef(null);
  const CARD_W     = 288 + 24; // card width (w-72 = 288px) + gap-6 (24px)

  const [atStart,   setAtStart]   = useState(true);
  const [atEnd,     setAtEnd]     = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateArrows = () => {
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
    setTimeout(updateArrows, 350);
  };

  return (
    <section id="destinations" className="max-w-7xl mx-auto px-6 py-14">

      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-1">Top Picks</p>
          <h2 className="text-3xl font-extrabold text-gray-900">Featured Destinations</h2>
        </div>

        {/* arrow controls + view all */}
        <div className="flex items-center gap-3">
          <ArrowBtn dir="left"  onClick={() => scroll('left')}  disabled={atStart} />
          <ArrowBtn dir="right" onClick={() => scroll('right')} disabled={atEnd}   />
          <a
            href="#"
            id="view-all-destinations"
            className="hidden md:flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-200 ml-2"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* scrollable row */}
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`#destinations .scroll-row::-webkit-scrollbar { display: none; }`}</style>
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} dest={dest} />
        ))}
      </div>

      {/* scroll progress dots */}
      <div className="flex justify-center gap-2 mt-5">
        {destinations.map((_, i) => (
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
    </section>
  );
};

export default DestinationCards;
