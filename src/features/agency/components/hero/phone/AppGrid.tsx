
import { Globe, Smartphone, Sparkles, Box } from 'lucide-react';

const apps = [
  { icon: Globe, name: 'Web', gradient: 'from-purple-600/30 to-purple-500/10', iconColor: 'text-purple-400', active: true },
  { icon: Smartphone, name: 'App', gradient: 'from-blue-600/25 to-blue-500/10', iconColor: 'text-blue-400' },
  { icon: Sparkles, name: 'AI', gradient: 'from-amber-500/25 to-amber-400/10', iconColor: 'text-amber-400' },
  { icon: Box, name: 'Automation', gradient: 'from-pink-600/25 to-pink-500/10', iconColor: 'text-pink-400' },
];

export function AppGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {apps.map((app, i) => {
        const Icon = app.icon;
        return (
          <div
            key={i}
            className="rounded-[16px] p-4 flex flex-col items-center justify-center gap-3 aspect-square cursor-pointer transition-all duration-200 hover:bg-white/[0.08]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${app.gradient} ${app.iconColor}`}
              style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[13px] font-medium text-white/70">{app.name}</span>
          </div>
        );
      })}
    </div>
  );
}
