

export function GlassReflection() {
  return (
    <>
      {/* Reflection 1 — large soft left side */}
      <div
        className="absolute inset-0 rounded-[38px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 40%)',
        }}
      />

      {/* Reflection 2 — thin right edge */}
      <div
        className="absolute top-[10%] right-0 w-[12%] h-[70%] rounded-r-[42px] pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(255,255,255,0.04) 0%, transparent 100%)',
        }}
      />

      {/* Reflection 3 — top corner highlight */}
      <div
        className="absolute top-0 left-[15%] w-[40%] h-[8%] rounded-t-[42px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
        }}
      />

      {/* Inner edge highlight — subtle inset glow */}
      <div
        className="absolute inset-0 rounded-[38px] pointer-events-none"
        style={{
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.08), inset 1px 0 0 rgba(255,255,255,0.04), inset -1px 0 0 rgba(255,255,255,0.03), inset 0 -1px 0 rgba(255,255,255,0.02)',
        }}
      />
    </>
  );
}
