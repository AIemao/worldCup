import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ScaleInProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  initialScale?: number;
};

export function ScaleIn({
  children,
  className,
  duration = 0.3,
  delay = 0,
  initialScale = 0.95,
}: ScaleInProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: initialScale }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
