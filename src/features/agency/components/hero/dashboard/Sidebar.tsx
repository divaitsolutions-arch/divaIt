
import { Home, LayoutGrid, Users, FileText, Settings, Database, Cloud } from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { icon: Home, active: true },
    { icon: LayoutGrid },
    { icon: Users },
    { icon: FileText },
    { icon: Database },
    { icon: Cloud },
  ];

  return (
    <aside className="w-[60px] border-r border-ink/10 bg-white/50 flex flex-col items-center py-6 z-10 relative">
      <div className="text-[13px] font-black text-ink tracking-tighter mb-8">DIVA</div>
      
      <nav className="flex-1 flex flex-col gap-4 w-full px-3">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                item.active 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' 
                  : 'text-steel hover:bg-panel hover:text-ink'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={2.5} />
            </div>
          );
        })}
      </nav>
      
      <div className="mt-auto">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-steel hover:bg-panel hover:text-ink cursor-pointer">
          <Settings className="w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>
    </aside>
  );
}
