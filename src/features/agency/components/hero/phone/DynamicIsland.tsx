

export function DynamicIsland() {
  return (
    <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30">
      <div
        className="relative w-[82px] h-[24px] rounded-full flex items-center justify-between px-3"
        style={{
          background: 'linear-gradient(180deg, #0a0a0e 0%, #050508 100%)',
          boxShadow: 'inset 0 0.5px 1px rgba(255,255,255,0.06), 0 1px 3px rgba(0,0,0,0.4)',
        }}
      >
        {/* Camera lens */}
        <div className="relative w-[9px] h-[9px] rounded-full bg-[#0c0c12]"
          style={{
            boxShadow: 'inset 0 0 2px rgba(255,255,255,0.08), 0 0 1px rgba(100,80,180,0.3)',
          }}
        >
          <div className="absolute top-[1.5px] left-[1.5px] w-[3px] h-[3px] rounded-full bg-[#1a1540]/80" />
          <div className="absolute top-[1px] right-[1px] w-[1.5px] h-[1.5px] rounded-full bg-white/10" />
        </div>

        {/* Speaker grille */}
        <div className="flex gap-[1.5px]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[1px] h-[3px] rounded-full bg-[#1a1a22]" />
          ))}
        </div>

        {/* IR sensor */}
        <div className="w-[5px] h-[5px] rounded-full bg-[#0e0e15]"
          style={{
            boxShadow: 'inset 0 0 1px rgba(255,255,255,0.04)',
          }}
        />
      </div>
    </div>
  );
}
