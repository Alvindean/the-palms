// Palms decorative SVG — abstract spiky palm fronds inspired by the original artwork
// Rendered procedurally so we can animate every blade independently.
var { useMemo } = React;

function Palm({ side = 'left', count = 22, length = 360, color = 'var(--orange)', sway = 1 }) {
  // Generate fronds spreading from a hub, fan-shape
  const fronds = useMemo(() => {
    const arr = [];
    // Range of angles for fan; left side fans rightward, right side fans leftward
    const startAngle = side === 'left' ? -55 : 125;
    const endAngle = side === 'left' ? 55 : 235;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const angle = startAngle + (endAngle - startAngle) * t;
      // Vary length subtly along the fan; longest in the middle
      const variance = 0.78 + 0.22 * Math.sin(t * Math.PI);
      const len = length * variance * (0.92 + Math.random() * 0.16);
      // Width tapers
      const w = 5 + Math.sin(t * Math.PI) * 3.5;
      arr.push({ angle, len, w, delay: i * 0.04, dir: i % 2 === 0 ? 1 : -1 });
    }
    return arr;
  }, [count, length, side]);

  const hubX = side === 'left' ? 0 : 0; // hub at the side; container handles position
  const hubY = 0;

  // Square viewBox centered on hub for predictable scaling
  const vb = length + 40;
  return (
    <svg
      viewBox={`${side === 'left' ? -20 : -vb + 20} ${-vb / 2} ${vb} ${vb}`}
      preserveAspectRatio={side === 'left' ? 'xMinYMid meet' : 'xMaxYMid meet'}
      style={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}
    >
      <defs>
        <radialGradient id={`palm-glow-${side}`} cx={side === 'left' ? '0%' : '100%'} cy="50%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={hubX} cy={hubY} r={length * 0.7} fill={`url(#palm-glow-${side})`} />
      {fronds.map((f, i) => {
        const x2 = hubX + Math.cos((f.angle * Math.PI) / 180) * f.len;
        const y2 = hubY + Math.sin((f.angle * Math.PI) / 180) * f.len;
        // The blade is a tapered triangle — drawn as a path
        const perpAngle = f.angle + 90;
        const dx = (Math.cos((perpAngle * Math.PI) / 180) * f.w) / 2;
        const dy = (Math.sin((perpAngle * Math.PI) / 180) * f.w) / 2;
        const tipX = x2 + Math.cos((f.angle * Math.PI) / 180) * 4;
        const tipY = y2 + Math.sin((f.angle * Math.PI) / 180) * 4;
        const d = `M ${hubX - dx} ${hubY - dy} L ${tipX} ${tipY} L ${hubX + dx} ${hubY + dy} Z`;
        return (
          <path
            key={i}
            d={d}
            fill={color}
            style={{
              transformOrigin: `${hubX}px ${hubY}px`,
              animation: `palm-sway-${f.dir > 0 ? 'a' : 'b'} ${5 + (i % 5)}s ease-in-out ${f.delay}s infinite`,
              animationPlayState: 'running',
              opacity: 0.92 + Math.sin(i) * 0.05,
            }}
          />
        );
      })}
    </svg>
  );
}

window.Palm = Palm;
