import { useState, useRef, useEffect } from 'react';

/**
 * CustomDropdown
 * Props:
 *  id        – button id for accessibility/testing
 *  value     – currently selected value (string)
 *  onChange  – (value: string) => void
 *  options   – Array of string | { label, value, icon? }
 *  placeholder – label shown when no value selected
 *  prefix    – small prefix text e.g. "Sort:"
 *  variant   – 'default' | 'solid' (solid = filled blue button, default = outlined)
 */
const CustomDropdown = ({
  id,
  value,
  onChange,
  options = [],
  prefix,
  variant = 'default',
}) => {
  const [open, setOpen]     = useState(false);
  const containerRef        = useRef(null);

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getLabel = (opt) => (typeof opt === 'string' ? opt : opt.label);
  const getValue = (opt) => (typeof opt === 'string' ? opt : opt.value);
  const getIcon  = (opt) => (typeof opt === 'object' ? opt.icon : null);

  const selectedLabel = options.find((o) => getValue(o) === value);
  const displayLabel  = selectedLabel ? getLabel(selectedLabel) : value;

  const isSolid = variant === 'solid';

  return (
    <div ref={containerRef} className="relative">
      {/* trigger button */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl
          border-2 transition-all duration-200 whitespace-nowrap
          ${isSolid
            ? open
              ? 'bg-blue-700 border-blue-700 text-white'
              : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700'
            : open
              ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50'
          }
        `}
      >
        {prefix && (
          <span className={`text-xs font-bold uppercase tracking-wider mr-0.5 ${isSolid ? 'text-blue-100' : 'text-gray-400'}`}>
            {prefix}
          </span>
        )}
        <span>{displayLabel}</span>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${isSolid ? 'text-blue-100' : 'text-gray-400'}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* dropdown panel */}
      {open && (
        <div
          className={`
            absolute z-50 mt-2 bg-white rounded-2xl shadow-xl
            border border-gray-100 py-2 min-w-[190px] overflow-hidden
            ${isSolid ? 'right-0' : 'left-0'}
          `}
          style={{ animation: 'dropdownIn 0.18s ease-out both' }}
        >
          {/* subtle header bar */}
          <div className="px-4 pb-1.5 pt-0.5 mb-1 border-b border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {prefix || 'Select option'}
            </p>
          </div>

          {options.map((opt) => {
            const label    = getLabel(opt);
            const val      = getValue(opt);
            const icon     = getIcon(opt);
            const selected = val === value;

            return (
              <button
                key={val}
                type="button"
                onClick={() => { onChange(val); setOpen(false); }}
                className={`
                  w-full text-left px-4 py-2.5 text-sm transition-all duration-150
                  flex items-center gap-2.5 group
                  ${selected
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium'
                  }
                `}
              >
                {icon && <span className="text-base leading-none">{icon}</span>}
                <span className="flex-1">{label}</span>
                {selected && (
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* keyframe animation injected once via a style tag */}
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </div>
  );
};

export default CustomDropdown;
