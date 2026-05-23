import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SlideDirection = "up" | "down" | "left" | "right";

type SlideInProps = {
  children: ReactNode;
  className?: string;
  direction?: SlideDirection;
  duration?: number;
  delay?: number;
  distance?: number;
};

const directionOffsets: Record<SlideDirection, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function SlideIn({
  children,
  className,
  direction = "up",
  duration = 0.4,
  delay = 0,
  distance = 16,
}: SlideInProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = directionOffsets[direction];

  const initial = shouldReduceMotion
    ? false
    : {
        opacity: 0,
        x: offset.x * distance,
        y: offset.y * distance,
      };

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
