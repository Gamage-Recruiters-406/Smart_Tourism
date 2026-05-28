const testimonials = [
  {
    id: 'sarah',
    name: 'Sarah Uderino',
    location: 'New York, USA',
    avatar: 'SU',
    avatarBg: 'from-teal-400 to-cyan-500',
    rating: 5,
    text: '"The Maldives trip was beyond my wildest dreams. Lure Travel handled every detail with such sophistication. Truly effortless luxury."',
    destination: 'Maldives Overwater Retreat',
  },
  {
    id: 'michael',
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    avatar: 'MC',
    avatarBg: 'from-blue-400 to-indigo-500',
    rating: 5,
    text: '"Their local guides in Kyoto were exceptional. I\'ve never felt so connected to a place while still enjoying five-star comfort."',
    destination: 'Gion District, Kyoto',
  },
  {
    id: 'elena',
    name: 'Elena Rodriguez',
    location: 'Madrid, Spain',
    avatar: 'ER',
    avatarBg: 'from-rose-400 to-pink-500',
    rating: 5,
    text: '"The booking process was seamless from the search to the actual stay. Lure Travel is miles ahead of the competition!"',
    destination: 'Santorini, Greece',
  },
];

const StarRow = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-2">
          Real Experiences
        </p>
        <h2 className="text-3xl font-extrabold text-gray-900">
          What Our Travelers Say
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
          Over 10,000 happy travelers have explored the world with us. Here's what they have to say about their unforgettable journeys.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            id={`testimonial-${t.id}`}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
          >
            {/* Decorative quote mark */}
            <div className="absolute top-4 right-5 text-gray-100 text-7xl font-serif leading-none select-none group-hover:text-blue-50 transition-colors duration-300">
              "
            </div>

            {/* Stars */}
            <StarRow count={t.rating} />

            {/* Review text */}
            <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-6 relative z-10">
              {t.text}
            </p>

            {/* Destination chip */}
            <div className="flex items-center gap-1.5 mb-5">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-blue-600 text-xs font-semibold">{t.destination}</span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-4">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                </div>
                {/* Verified badge */}
                <div className="ml-auto">
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { stat: '50K+', label: 'Happy Travelers' },
          { stat: '120+', label: 'Destinations' },
          { stat: '98%', label: 'Satisfaction Rate' },
          { stat: '15+', label: 'Years of Experience' },
        ].map((s) => (
          <div
            key={s.stat}
            className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
          >
            <div className="text-3xl font-extrabold text-blue-600 mb-1">{s.stat}</div>
            <div className="text-gray-500 text-sm font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
