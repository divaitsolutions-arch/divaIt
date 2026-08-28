

export function RevenueChart() {
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-ink/10 p-5 flex flex-col relative overflow-hidden">
      <div className="relative flex-1 w-full flex items-end">
        {/* SVG Chart */}
        <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          <path d="M0,50 L600,50 M0,100 L600,100 M0,150 L600,150" stroke="#f1f5f9" strokeWidth="1" />

          {/* Area Fill */}
          <path 
            d="M0,150 Q50,140 100,160 T200,130 T300,150 T400,90 T500,110 T600,30 L600,220 L0,220 Z" 
            fill="url(#chartGradient)"
            className="chart-area opacity-80"
          />
          {/* Line */}
          <path 
            d="M0,150 Q50,140 100,160 T200,130 T300,150 T400,90 T500,110 T600,30" 
            fill="none" 
            stroke="url(#lineGradient)" 
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#glow)"
            className="chart-line"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{ animation: 'draw-line 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' }}
          />

          {/* Data points */}
          <circle cx="200" cy="130" r="4.5" fill="#d946ef" stroke="white" strokeWidth="2.5" className="chart-dot opacity-0" style={{ animation: 'fade-up 0.5s ease-out 1.2s forwards' }} />
          <circle cx="400" cy="90" r="4.5" fill="#a855f7" stroke="white" strokeWidth="2.5" className="chart-dot opacity-0" style={{ animation: 'fade-up 0.5s ease-out 1.8s forwards' }} />
          <circle cx="600" cy="30" r="5.5" fill="#8b5cf6" stroke="white" strokeWidth="3" className="chart-dot opacity-0" style={{ animation: 'fade-up 0.5s ease-out 2.4s forwards' }} />
        </svg>
      </div>
      
      {/* X Axis Labels */}
      <div className="flex justify-between items-center text-[13px] font-bold text-steel mt-3 px-2 relative z-10">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  );
}
