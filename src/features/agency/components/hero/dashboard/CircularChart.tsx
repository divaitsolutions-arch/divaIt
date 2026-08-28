

export function CircularChart() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-ink/10 flex flex-col items-center justify-center h-full transition-transform hover:-translate-y-0.5">
      <h4 className="text-[13px] font-bold text-ink mb-3 w-full text-left">Traffic Sources</h4>
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* SVG Circular Chart */}
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="3"
          />
          {/* Segment 1 */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ec4899"
            strokeWidth="3"
            strokeDasharray="45, 100"
          />
          {/* Segment 2 */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#a855f7"
            strokeWidth="3"
            strokeDasharray="30, 100"
            strokeDashoffset="-45"
          />
          {/* Segment 3 */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
            strokeDasharray="25, 100"
            strokeDashoffset="-75"
          />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-black text-ink leading-none">100%</span>
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 text-[13px] font-bold text-steel">
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-pink-500" />Direct</div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" />Organic</div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" />Referral</div>
      </div>
    </div>
  );
}
