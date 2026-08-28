import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

function Counter({ endValue, prefix = '', suffix = '' }: { endValue: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1500; // 1.5s
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * endValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [endValue]);

  return (
    <span>{prefix}{count.toLocaleString()}{suffix}</span>
  );
}

export function KPIGrid() {
  const kpis = [
    { title: 'Total Revenue', value: 98765, prefix: '$', growth: '+23.6%', sub: 'vs last month' },
    { title: 'Active Users', value: 23678, prefix: '', growth: '+18.2%', sub: '' },
    { title: 'Conversion Rate', value: 4.32, prefix: '', suffix: '%', growth: '+8.7%', sub: '' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {kpis.slice(0, 2).map((kpi, index) => (
        <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-ink/10 flex flex-col justify-center transition-transform hover:-translate-y-1">
          <h4 className="text-[13px] font-bold text-ink mb-2">{kpi.title}</h4>
          <div className="text-xl font-black text-ink tracking-tight mb-2">
            <Counter endValue={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-bold" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
            <span className="text-emerald-500 flex items-center bg-emerald-50 px-2 py-0.5 rounded-md">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              {kpi.growth}
            </span>
            {kpi.sub && <span className="text-steel font-medium">{kpi.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
