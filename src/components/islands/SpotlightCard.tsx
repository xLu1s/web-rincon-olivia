import { useRef, useState, type ReactNode } from 'react';

/**
 * Tarjeta con foco de luz al pasar el cursor, patrón de Aceternity UI.
 * El contenido es HTML normal; el foco es decorativo y no sigue al puntero si se pide menos movimiento.
 */
export default function SpotlightCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 40, y: 40, on: false });

  return (
    <div
      ref={ref}
      className="aside-card"
      onMouseMove={(event) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        setSpot({ x: event.clientX - box.left, y: event.clientY - box.top, on: true });
      }}
      onMouseLeave={() => setSpot((current) => ({ ...current, on: false }))}
    >
      <div className="spotlight" style={{ left: spot.x, top: spot.y, opacity: spot.on ? 1 : 0 }} aria-hidden="true" />
      <div className="inner">{children}</div>
    </div>
  );
}
