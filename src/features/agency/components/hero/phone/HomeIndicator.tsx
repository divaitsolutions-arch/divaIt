

export function HomeIndicator() {
  return (
    <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 z-30">
      <div
        className="w-[96px] h-[4px] rounded-full"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0 6px rgba(255,255,255,0.15)',
        }}
      />
    </div>
  );
}
