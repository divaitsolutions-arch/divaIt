

interface FloatingIconProps {
  icon: React.ElementType;
  className?: string;
  color?: string;
  shape?: 'box' | 'circle';
}

export function FloatingIcon({ icon: Icon, className = '', color = 'currentColor', shape = 'box' }: FloatingIconProps) {
  const roundedClass = shape === 'circle' ? 'rounded-full' : 'rounded-xl';
  return (
    <div
      className={`flex items-center justify-center w-11 h-11 ${roundedClass} bg-white cursor-pointer ${className}`}
      style={{
        /* Crisp, sharp shadow — no blur spread */
        boxShadow: [
          '0 1px 3px rgba(0,0,0,0.08)',
          '0 4px 12px rgba(0,0,0,0.06)',
          '0 0 0 1px rgba(0,0,0,0.04)',
        ].join(', '),
        /* Force GPU layer for pixel-perfect rendering */
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <Icon
        className="w-[18px] h-[18px]"
        style={{
          color,
          /* Ensure crisp icon rendering */
          shapeRendering: 'geometricPrecision',
        }}
      />
    </div>
  );
}
