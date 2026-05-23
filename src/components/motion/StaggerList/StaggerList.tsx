import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Children } from "react";

type StaggerListProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
};

const containerVariants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay, delayChildren: 0 },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function StaggerList({
  children,
  className,
  staggerDelay = 0.06,
  initialDelay = 0,
}: StaggerListProps) {
  const shouldReduceMotion = useReducedMotion();
  const childrenArray = Children.toArray(children);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      custom={staggerDelay}
      variants={containerVariants}
      transition={{ delayChildren: initialDelay }}
    >
      {childrenArray.map((child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
