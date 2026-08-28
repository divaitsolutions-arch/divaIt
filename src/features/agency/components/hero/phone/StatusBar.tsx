

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-[42px] pb-2">
      {/* Time */}
      <span className="text-[13px] font-semibold text-white/90 tracking-tight">
        9:41
      </span>

      {/* Right icons */}
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="0" y="7" width="2.5" height="3" rx="0.5" fill="white" fillOpacity="0.9" />
          <rect x="3.5" y="5" width="2.5" height="5" rx="0.5" fill="white" fillOpacity="0.9" />
          <rect x="7" y="2.5" width="2.5" height="7.5" rx="0.5" fill="white" fillOpacity="0.9" />
          <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="white" fillOpacity="0.35" />
        </svg>

        {/* WiFi */}
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M6 9.5a1 1 0 100-2 1 1 0 000 2z" fill="white" fillOpacity="0.9" />
          <path d="M3.17 6.83a4 4 0 015.66 0" stroke="white" strokeOpacity="0.9" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M1.05 4.71a7 7 0 019.9 0" stroke="white" strokeOpacity="0.9" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        {/* Battery */}
        <div className="flex items-center gap-[2px]">
          <div className="w-[20px] h-[9px] rounded-[2px] border border-white/40 p-[1.5px]">
            <div className="h-full w-[75%] rounded-[1px] bg-white/90" />
          </div>
          <div className="w-[1.5px] h-[4px] rounded-r-sm bg-white/40" />
        </div>
      </div>
    </div>
  );
}
