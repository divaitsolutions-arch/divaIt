

export function BackgroundGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-950">
      {/* Orange Glow */}
      <div
        className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full hidden opacity-20 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.6) 0%, rgba(249,115,22,0) 70%)' }}
      />
      {/* Purple Glow */}
      <div
        className="absolute -top-1/4 left-1/4 w-[1000px] h-[1000px] rounded-full hidden opacity-20 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(168,85,247,0) 70%)' }}
      />
      {/* Blue Glow */}
      <div
        className="absolute top-1/2 right-0 w-[900px] h-[900px] rounded-full hidden opacity-15 mix-blend-screen transform translate-x-1/4"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0) 70%)' }}
      />
      {/* Pink Glow */}
      <div
        className="absolute bottom-0 left-1/2 w-[700px] h-[700px] rounded-full hidden opacity-15 mix-blend-screen transform -translate-x-1/2 translate-y-1/4"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, rgba(236,72,153,0) 70%)' }}
      />
    </div>
  );
}
