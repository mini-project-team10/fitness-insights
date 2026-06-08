"use client";

import { motion } from "framer-motion";
import React from "react";

interface FloatingEmojiProps {
  emoji: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  size?: number;
}

export function FloatingEmoji({
  emoji,
  delay = 0,
  duration = 6,
  x = 0,
  y = -100,
  size = 48,
}: FloatingEmojiProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, y, y - 50],
        x: [0, x, x - 20],
        rotate: [0, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "fixed",
        fontSize: size,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {emoji}
    </motion.div>
  );
}

export function AnimatedEmojiBackground() {
  const emojis = [
    { emoji: "💪", x: 100, y: -150, delay: 0 },
    { emoji: "🏃", x: -120, y: -180, delay: 0.5 },
    { emoji: "🧘", x: 80, y: -160, delay: 1 },
    { emoji: "⚡", x: -100, y: -140, delay: 1.5 },
    { emoji: "🚀", x: 140, y: -200, delay: 2 },
    { emoji: "❤️", x: -150, y: -120, delay: 2.5 },
    { emoji: "🏋️", x: 90, y: -170, delay: 3 },
    { emoji: "🎯", x: -110, y: -150, delay: 3.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {emojis.map((item, idx) => (
        <FloatingEmoji
          key={idx}
          emoji={item.emoji}
          delay={item.delay}
          duration={8}
          x={item.x}
          y={item.y}
          size={40}
        />
      ))}
    </div>
  );
}

export function FloatingEmojiCard({
  emoji,
  label,
}: {
  emoji: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.2,
        rotate: [0, -5, 5, -5, 0],
      }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/10 border border-primary/30 hover:border-primary/60 transition-all"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="text-5xl"
      >
        {emoji}
      </motion.div>
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export function RotatingEmoji({ emoji, size = 64 }: { emoji: string; size?: number }) {
  return (
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity },
      }}
      style={{ fontSize: size }}
    >
      {emoji}
    </motion.div>
  );
}

export function PulsingEmoji({ emoji, size = 48 }: { emoji: string; size?: number }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
      style={{ fontSize: size }}
    >
      {emoji}
    </motion.div>
  );
}
