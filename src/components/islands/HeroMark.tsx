import { motion, useReducedMotion } from 'motion/react';

/** Entrada del hero con Motion. El filete ya se ve sin JS: no parte de opacidad 0. */
export default function HeroMark() {
  const reduce = useReducedMotion();
  const allow = reduce === false;
  return (
    <motion.span
      className="filete"
      style={{ transformOrigin: 'left', display: 'block' }}
      initial={false}
      animate={allow ? { scaleX: [1, 0.55, 1] } : { scaleX: 1 }}
      transition={allow ? { duration: 1.3, ease: 'easeInOut' } : { duration: 0 }}
    />
  );
}
