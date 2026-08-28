
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { KPIGrid } from './KPIGrid';
import { RevenueChart } from './RevenueChart';
import { CircularChart } from './CircularChart';

export function Dashboard() {
  return (
    <div className="w-[800px] h-[500px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] border border-ink/10 overflow-hidden flex dashboard-element ring-1 ring-slate-900/5">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-panel/50">
        <Header />
        <div className="flex-1 flex flex-col min-h-0 px-8 pb-8 pt-2">
          <div className="grid grid-cols-[2fr_1fr] gap-4 mb-4">
            <KPIGrid />
            <CircularChart />
          </div>
          <div className="flex-1 min-h-0 mt-2 relative">
            <RevenueChart />
          </div>
        </div>
      </main>
      
      {/* Subtle overlay reflections */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
    </div>
  );
}
