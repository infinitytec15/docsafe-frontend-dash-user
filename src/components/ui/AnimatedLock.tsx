"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";

interface AnimatedLockProps {
  isLocking: boolean;
  size?: number;
  color?: string;
}

export function AnimatedLock({
  isLocking,
  size = 24,
  color = "currentColor",
}: AnimatedLockProps) {
  const [showLock, setShowLock] = useState(!isLocking);

  useEffect(() => {
    if (isLocking) {
      setShowLock(false);
    } else {
      setShowLock(true);
    }
  }, [isLocking]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {showLock ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Unlock size={size} className={color} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [0.8, 1.1, 1],
            rotate: [0, -10, 10, -5, 5, 0],
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
          className="absolute inset-0"
        >
          <Lock size={size} className={color} />
        </motion.div>
      )}
    </div>
  );
}
