"use client";

import { motion } from "framer-motion";
import React from "react";

export function AnimatedGradientBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 via-blue-600/20 to-transparent rounded-full blur-3xl"
      />

      {/* Secondary Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-emerald-500/20 via-green-600/10 to-transparent rounded-full blur-3xl"
      />

      {/* Accent Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.3, 0.5, 0.2, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-l from-rose-500/20 via-pink-600/10 to-transparent rounded-full blur-3xl"
      />
    </div>
  );
}

export function VibrantGradientCard({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "success" | "accent" | "energy";
}) {
  const gradients = {
    primary:
      "bg-gradient-to-br from-blue-600/40 via-cyan-500/20 to-blue-900/10 border border-blue-500/30",
    success:
      "bg-gradient-to-br from-emerald-600/40 via-green-500/20 to-emerald-900/10 border border-emerald-500/30",
    accent:
      "bg-gradient-to-br from-rose-600/40 via-pink-500/20 to-rose-900/10 border border-rose-500/30",
    energy:
      "bg-gradient-to-br from-yellow-500/40 via-amber-400/20 to-orange-900/10 border border-yellow-500/30",
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-6 backdrop-blur-lg ${gradients[variant]} transition-all`}
    >
      {children}
    </motion.div>
  );
}

export function ColorfulBadge({
  text,
  variant = "primary",
  icon,
}: {
  text: string;
  variant?: "primary" | "success" | "accent" | "energy";
  icon?: React.ReactNode;
}) {
  const colors = {
    primary: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white",
    success: "bg-gradient-to-r from-emerald-600 to-green-500 text-white",
    accent: "bg-gradient-to-r from-rose-600 to-pink-500 text-white",
    energy: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${colors[variant]}`}
    >
      {icon}
      {text}
    </motion.div>
  );
}

export function GradientText({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "success" | "accent" | "energy";
}) {
  const gradients = {
    primary: "bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400",
    success: "bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-400",
    accent: "bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400",
    energy: "bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500",
  };

  return (
    <span
      className={`${gradients[variant]} bg-clip-text text-transparent font-bold`}
    >
      {children}
    </span>
  );
}
