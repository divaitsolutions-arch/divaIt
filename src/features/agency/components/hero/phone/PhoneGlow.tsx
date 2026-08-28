

export function PhoneGlow() {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 pointer-events-none -z-10"
      style={{
        width: '340px',
        height: '500px',
        background:
          'radial-gradient(ellipse at center, rgba(139,92,246,0.22) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)',
        filter: 'blur(100px)',
      }}
    />
  );
}
