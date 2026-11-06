"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Subtle fade-up reveal when the element scrolls into view.
// Uses a `mounted` flag to prevent hydration mismatches — framer-motion's
// useInView can return `true` on the client during hydration for elements
// already in the viewport, but `false` on the server, causing the `style`
// attribute (opacity/transform) to differ between server HTML and client.
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const Tag = motion[as] as typeof motion.div;

  // During hydration (mounted=false), always render "hidden" to match the
  // server. After mount, use the actual inView value.
  const animateState = mounted && inView ? "visible" : "hidden";

  return (
    <Tag
      ref={ref as never}
      initial="hidden"
      animate={animateState}
      variants={variants}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </Tag>
  );
}

// Stagger container for grids of items.
export function RevealStagger({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={mounted && inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

// Each child of a RevealStagger should be wrapped in this.
export function RevealItem({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}
