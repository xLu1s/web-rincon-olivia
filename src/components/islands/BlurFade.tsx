import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Blur Fade, el patrón de Magic UI.
 * La opacidad se queda en 1 para que el texto se lea sin JS y con movimiento reducido.
 */
export default function BlurFade({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce !== false) return <div>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      whileInView={{ filter: ['blur(5px)', 'blur(0px)'], y: [8, 0] }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
