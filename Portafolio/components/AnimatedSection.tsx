"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedSection({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, transform: reduce ? "translateY(0px)" : "translateY(10px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
                reduce
                    ? {
                          duration: 0.15,
                          delay,
                          ease: [0.23, 1, 0.32, 1],
                      }
                    : {
                          type: "spring",
                          stiffness: 170,
                          damping: 24,
                          mass: 0.8,
                          delay,
                      }
            }
        >
            {children}
        </motion.div>
    );
}
