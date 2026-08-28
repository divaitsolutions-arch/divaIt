
import { PhoneFrame } from './PhoneFrame';
import { PhoneScreen } from './PhoneScreen';
import { DynamicIsland } from './DynamicIsland';
import { HomeIndicator } from './HomeIndicator';
import { GlassReflection } from './GlassReflection';
import { PhoneGlow } from './PhoneGlow';

export function PhoneMockup() {
  return (
    <div
      className="relative z-20 phone-element"
      style={{ 
        perspective: '900px',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Ambient purple glow behind phone */}
      <PhoneGlow />

      {/* Phone with 3D perspective — no fake edge panels */}
      <div
        style={{
          transform: 'rotateY(-15deg) rotateX(2deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <PhoneFrame>
          <DynamicIsland />
          <div className="w-full h-full rounded-[32px] overflow-hidden relative border border-white/[0.04]">
            <PhoneScreen />
          </div>
          <HomeIndicator />
        </PhoneFrame>

        {/* Glass reflections — top layer */}
        <div className="absolute inset-0 pointer-events-none">
          <GlassReflection />
        </div>
      </div>
    </div>
  );
}
