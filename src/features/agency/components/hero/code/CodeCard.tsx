

export function CodeCard() {
  return (
    <div className="code-element rounded-2xl bg-[#0d0d12] border border-slate-700/60 p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] w-[310px] relative overflow-hidden group">
      {/* Header controls */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="text-[13px] text-steel ml-2 font-mono">api.ts</span>
      </div>
      
      {/* Subtle Glow Behind Code */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-purple-500/20 hidden pointer-events-none group-hover:bg-purple-500/30 transition-colors" />

      {/* Code Content — matching target syntax colors */}
      <pre className="text-[13px] font-mono leading-[1.8] relative z-10 text-steel">
        <div className="flex">
          <span className="text-ink select-none w-5 shrink-0">1</span>
          <code><span className="text-[#ec4899]">export</span> <span className="text-[#ec4899]">async</span> <span className="text-[#ec4899]">function</span> <span className="text-[#60a5fa]">getData</span>() {'{'}</code>
        </div>
        <div className="flex">
          <span className="text-ink select-none w-5 shrink-0">2</span>
          <code>{'  '}<span className="text-[#c084fc]">const</span> res = <span className="text-[#ec4899]">await</span> <span className="text-[#60a5fa]">fetch</span>(<span className="text-[#f97316]">{'"'}/api/data{'"'}</span>);</code>
        </div>
        <div className="flex">
          <span className="text-ink select-none w-5 shrink-0">3</span>
          <code>{'  '}<span className="text-[#c084fc]">const</span> data = <span className="text-[#ec4899]">await</span> res.<span className="text-[#60a5fa]">json</span>();</code>
        </div>
        <div className="flex">
          <span className="text-ink select-none w-5 shrink-0">4</span>
          <code>{'  '}<span className="text-[#ec4899]">return</span> data;</code>
        </div>
        <div className="flex relative">
          <span className="text-ink select-none w-5 shrink-0">5</span>
          <code>{'}'}</code>
          <div className="absolute top-0.5 left-7 w-[2px] h-3.5 bg-slate-400 animate-cursor" />
        </div>
      </pre>
    </div>
  );
}
