
import { StatusBar } from './StatusBar';
import { AppGrid } from './AppGrid';

export function PhoneScreen() {
  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col rounded-[32px]"
      style={{
        /* Deep OLED purple gradient */
        background: 'linear-gradient(170deg, #1A0935 0%, #12081F 50%, #09060F 100%)',
        WebkitFontSmoothing: 'antialiased',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      {/* Status Bar */}
      <StatusBar />

      {/* Title Area */}
      <div className="px-6 mt-4 mb-6">
        <h2
          className="text-[22px] font-semibold text-white/90 leading-[1.15]"
          style={{ letterSpacing: '-0.02em' }}
        >
          Smarter<br />Digital Growth
        </h2>
      </div>

      {/* App Grid */}
      <div className="px-4 flex-1">
        <AppGrid />
      </div>

      {/* Bottom breathing room */}
      <div className="h-6" />
    </div>
  );
}
