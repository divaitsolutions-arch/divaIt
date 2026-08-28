
import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between p-6 pb-4">
      <div className="relative group w-64">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-steel group-focus-within:text-purple-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full h-9 pl-9 pr-3 text-[13px] bg-panel/50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all placeholder:text-steel text-ink"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center text-[13px] font-bold shadow-sm">
          JD
        </div>
      </div>
    </header>
  );
}
