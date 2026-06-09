"use client";

import { motion } from "framer-motion";
import React from "react";

export function EnhancedHeroSection({
  title,
  subtitle,
  primaryEmoji,
}: {
  title: React.ReactNode;
  subtitle: string;
  primaryEmoji: string;
}) {
  return (
    <div className="relative overflow-hidden py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-cyan-500/20 to-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 relative z-10"
      >
        {/* Main Emoji */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex justify-center"
        >
          <div className="text-8xl filter drop-shadow-2xl">{primaryEmoji}</div>
        </motion.div>

        {/* Title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            {title}
          </motion.h1>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-cyan-500 rounded-full"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>
  );
}

export function EmojiStatCard({
  emoji,
  label,
  value,
  trend,
}: {
  emoji: string;
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
}) {
  const trendColor = {
    up: "text-emerald-500",
    down: "text-rose-500",
    neutral: "text-muted-foreground",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gradient-to-br from-card/80 to-card/40 rounded-2xl p-6 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-4xl"
        >
          {emoji}
        </motion.div>
        {trend && (
          <span className={`text-sm font-bold ${trendColor[trend]}`}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "neutral" && "→"}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </motion.div>
  );
}

export function AnimatedFeatureCard({
  emoji,
  title,
  description,
  delay = 0,
}: {
  emoji: string;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-card/60 to-card/20 rounded-2xl p-8 border border-border/50 hover:border-primary/50 backdrop-blur-sm transition-all overflow-hidden"
    >
      {/* Animated background glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/5 transition-all duration-300 -z-10"
      />

      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="text-5xl mb-4"
      >
        {emoji}
      </motion.div>

      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function FitnessFeatureShowcase({
  emojis,
}: {
  emojis: Array<{ emoji: string; label: string; color: string }>;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {emojis.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br ${item.color} border border-white/10 cursor-pointer transition-all`}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: idx * 0.2,
            }}
            className="text-5xl mb-2"
          >
            {item.emoji}
          </motion.div>
          <p className="text-xs font-semibold text-white text-center">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function AnimatedProgressBar({
  emoji,
  label,
  value,
  max = 100,
  color = "from-primary to-cyan-500",
}: {
  emoji: string;
  label: string;
  value: number;
  max?: number;
  color?: string;
}) {
  const percentage = (value / max) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <span className="font-semibold text-sm">{label}</span>
        </div>
        <span className="text-xs font-bold text-primary">{value}/{max}</span>
      </div>
      <div className="h-2 bg-card rounded-full overflow-hidden border border-border/50">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-full bg-gradient-to-r ${color} rounded-full shadow-lg shadow-primary/50`}
        />
      </div>
    </motion.div>
  );
}
