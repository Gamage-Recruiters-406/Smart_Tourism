import { useState } from 'react';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const isSameDay = (a, b) =>
  a && b && a.toDateString() === b.toDateString();

const formatShort = (d) =>
  d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

const CustomCalendar = ({ startDate, endDate, onChange, onClose }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [hoverDate, setHoverDate] = useState(null);
  // selecting: 'start' or 'end'
  const [selecting, setSelecting] = useState(startDate && !endDate ? 'end' : 'start');

  /* ── navigation ── */
  const nextViewMonth = viewMonth === 11 ? 0  : viewMonth + 1;
  const nextViewYear  = viewMonth === 11 ? viewYear + 1 : viewYear;

  const goPrev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const goNext = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };
  const canGoPrev =
    new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

  /* ── click handler ── */
  const handleClick = (date) => {
    if (date < today) return;

    if (selecting === 'start' || (startDate && endDate)) {
      onChange({ start: date, end: null });
      setSelecting('end');
    } else {
      if (date <= startDate) {
        onChange({ start: date, end: null });
        setSelecting('end');
      } else {
        onChange({ start: startDate, end: date });
        setSelecting('start');
      }
    }
  };

  const handleClear = () => {
    onChange({ start: null, end: null });
    setSelecting('start');
    setHoverDate(null);
  };

  /* ── render a single month grid ── */
  const renderMonth = (year, month) => {
    const daysInMonth  = new Date(year, month + 1, 0).getDate();
    const firstDayOfWk = new Date(year, month, 1).getDay();
    const effectiveEnd = endDate ?? (selecting === 'end' ? hoverDate : null);
    const cells = [];

    // empty leading cells
    for (let i = 0; i < firstDayOfWk; i++) {
      cells.push(<div key={`e${i}`} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date    = new Date(year, month, d);
      const isPast  = date < today;
      const isStart = isSameDay(date, startDate);
      const isEnd   = isSameDay(date, endDate) ||
                      (selecting === 'end' && isSameDay(date, hoverDate) &&
                       startDate && date > startDate);
      const inRange = startDate && effectiveEnd &&
                      date > startDate && date < effectiveEnd;
      const isToday = isSameDay(date, today);

      /* wrapper classes – background strip for the in-range highlight */
      let wrapCls = 'relative flex items-center justify-center h-9 ';
      if (!isPast) {
        if (isStart && effectiveEnd && effectiveEnd > startDate)
          wrapCls += 'bg-blue-100 rounded-l-full ';
        else if (isEnd && startDate)
          wrapCls += 'bg-blue-100 rounded-r-full ';
        else if (inRange)
          wrapCls += 'bg-blue-100 ';
      }

      /* inner circle classes */
      let btnCls =
        'w-9 h-9 flex items-center justify-center text-[13px] font-medium rounded-full z-10 transition-all duration-150 select-none ';

      if (isPast) {
        btnCls += 'text-gray-300 cursor-not-allowed ';
      } else if (isStart || isEnd) {
        btnCls += 'bg-blue-600 text-white shadow-md font-semibold cursor-pointer ';
      } else if (inRange) {
        btnCls += 'text-blue-700 cursor-pointer hover:bg-blue-200 ';
      } else {
        btnCls += 'text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-600 ';
        if (isToday) btnCls += 'ring-2 ring-blue-400 ';
      }

      cells.push(
        <div key={d} className={wrapCls}>
          <div
            className={btnCls}
            onClick={() => !isPast && handleClick(date)}
            onMouseEnter={() =>
              !isPast && selecting === 'end' && startDate && !endDate && setHoverDate(date)
            }
            onMouseLeave={() => setHoverDate(null)}
          >
            {d}
          </div>
        </div>,
      );
    }
    return cells;
  };

  const nights =
    startDate && endDate
      ? Math.ceil((endDate - startDate) / 86_400_000)
      : 0;

  return (
    /* ── backdrop ── */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      {/* ── panel ── */}
      <div
        className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-[720px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-0.5">
              Select Travel Dates
            </h3>
            <p className="text-sm text-gray-500">
              {!startDate && 'Choose your check-in date to get started'}
              {startDate && !endDate && (
                <span className="text-blue-600 font-medium">
                  ✓ Check-in set — now choose check-out
                </span>
              )}
              {startDate && endDate && (
                <span className="text-emerald-600 font-semibold">
                  ✓ {formatShort(startDate)} → {formatShort(endDate)} &nbsp;·&nbsp;
                  <span className="text-blue-600">{nights} night{nights !== 1 ? 's' : ''}</span>
                </span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700 flex-shrink-0 mt-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* step indicators */}
        <div className="flex gap-3 mb-6">
          {[
            { label: 'Check-in',  value: startDate, active: selecting === 'start' },
            { label: 'Check-out', value: endDate,   active: selecting === 'end' },
          ].map(({ label, value, active }) => (
            <div
              key={label}
              className={`flex-1 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                value
                  ? 'border-blue-600 bg-blue-50'
                  : active
                  ? 'border-blue-400 bg-blue-50/50 border-dashed'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <p className={`text-[11px] font-bold uppercase tracking-wider mb-0.5 ${value ? 'text-blue-600' : 'text-gray-400'}`}>
                {label}
              </p>
              <p className={`text-sm font-semibold ${value ? 'text-gray-800' : 'text-gray-400'}`}>
                {value ? formatShort(value) : active ? 'Select date…' : '—'}
              </p>
            </div>
          ))}
          {nights > 0 && (
            <div className="px-4 py-2.5 rounded-xl border-2 border-emerald-400 bg-emerald-50 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Duration</p>
                <p className="text-sm font-semibold text-gray-800">{nights} night{nights !== 1 ? 's' : ''}</p>
              </div>
            </div>
          )}
        </div>

        {/* month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goPrev}
            disabled={!canGoPrev}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex flex-1 justify-around px-4">
            <span className="font-bold text-gray-800">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <span className="font-bold text-gray-800 hidden sm:block">
              {MONTHS[nextViewMonth]} {nextViewYear}
            </span>
          </div>

          <button
            onClick={goNext}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* two-month grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:divide-x divide-gray-100">
          {[
            [viewYear, viewMonth],
            [nextViewYear, nextViewMonth],
          ].map(([yr, mo], idx) => (
            <div key={idx} className={idx === 1 ? 'hidden sm:block sm:pl-6' : ''}>
              {/* weekday row */}
              <div className="grid grid-cols-7 mb-1">
                {WEEKDAYS.map((d) => (
                  <div
                    key={d}
                    className="text-center text-[11px] font-bold text-gray-400 py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>
              {/* day cells */}
              <div className="grid grid-cols-7">{renderMonth(yr, mo)}</div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-gray-400">
            * Dates in the past cannot be selected
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors font-medium"
            >
              Clear dates
            </button>
            <button
              onClick={() => { if (startDate && endDate) onClose(); }}
              disabled={!startDate || !endDate}
              className="text-sm font-bold bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-blue-200"
            >
              Confirm dates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
