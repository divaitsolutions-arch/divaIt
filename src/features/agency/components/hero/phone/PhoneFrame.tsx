

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-[240px] h-[490px] rounded-[38px] p-[7px]"
      style={{
        /* Titanium-style vertical gradient */
        background: 'linear-gradient(180deg, #2B2B31 0%, #18181F 45%, #09090C 100%)',
      }}
    >
      {/* Top edge metallic highlight */}
      <div
        className="absolute top-0 left-[15%] right-[15%] h-[1px] rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 70%, transparent 100%)',
        }}
      />

      {/* Outer dark ring */}
      <div
        className="absolute inset-[-1px] rounded-[39px] pointer-events-none"
        style={{
          border: '1px solid rgba(0,0,0,0.5)',
        }}
      />

      {/* Outer thin white border */}
      <div
        className="absolute inset-0 rounded-[38px] pointer-events-none"
        style={{
          border: '0.5px solid rgba(255,255,255,0.05)',
        }}
      />

      {/* Side buttons — left */}
      {/* Mute switch */}
      <div
        className="absolute left-[-2.5px] top-[90px] w-[3px] h-[14px] rounded-l-[2px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #38383e 0%, #1a1a20 100%)',
          boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
        }}
      />
      {/* Volume Up */}
      <div
        className="absolute left-[-2.5px] top-[124px] w-[3px] h-[26px] rounded-l-[2px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #38383e 0%, #1a1a20 100%)',
          boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
        }}
      />
      {/* Volume Down */}
      <div
        className="absolute left-[-2.5px] top-[158px] w-[3px] h-[26px] rounded-l-[2px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #38383e 0%, #1a1a20 100%)',
          boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
        }}
      />

      {/* Side button — right: Power */}
      <div
        className="absolute right-[-2.5px] top-[138px] w-[3px] h-[38px] rounded-r-[2px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #38383e 0%, #1a1a20 100%)',
          boxShadow: '1px 0 2px rgba(0,0,0,0.3)',
        }}
      />

      {/* Right-edge depth gradient — simulates 3D thickness */}
      <div
        className="absolute inset-0 rounded-[38px] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, transparent 70%, rgba(0,0,0,0.25) 100%)',
        }}
      />

      {children}
    </div>
  );
}
