"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { LoginForm } from "@/components/auth/login-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { Activity, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  AnimatedEmojiBackground, 
  FloatingEmojiCard,
  PulsingEmoji,
  RotatingEmoji 
} from "@/components/animations/FloatingEmojis";
import { 
  AnimatedGradientBg, 
  VibrantGradientCard, 
  ColorfulBadge,
  GradientText 
} from "@/components/animations/ColorfulGradients";
import {
  EnhancedHeroSection,
  AnimatedFeatureCard,
  FitnessFeatureShowcase,
  AnimatedProgressBar
} from "@/components/animations/EnhancedHero";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-muted border-t-primary animate-spin" />
          <Activity className="absolute inset-0 m-auto text-primary w-6 h-6 animate-pulse" />
        </div>
        <p className="mt-4 text-muted-foreground font-medium animate-pulse">Syncing Aura data...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  const fitnessFeatures = [
    { emoji: "💪", label: "Strength", color: "from-rose-600/40 to-pink-900/10" },
    { emoji: "🏃", label: "Cardio", color: "from-blue-600/40 to-cyan-900/10" },
    { emoji: "🧘", label: "Flexibility", color: "from-emerald-600/40 to-green-900/10" },
    { emoji: "⚡", label: "Energy", color: "from-yellow-600/40 to-orange-900/10" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Animated gradient background */}
      <AnimatedGradientBg />

      {/* Floating emojis */}
      <AnimatedEmojiBackground />

      {/* Top Bar */}
      <div className="relative z-50 border-b border-border/10 backdrop-blur-md">
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Activity className="text-primary w-8 h-8" />
            </motion.div>
            <span className="font-bold text-2xl tracking-tighter">
              <GradientText variant="primary">AURA</GradientText>
            </span>
          </motion.div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full pt-20">
        {/* Enhanced Hero Section */}
        <div className="relative z-10 pt-12 pb-8">
          <EnhancedHeroSection
            title={
              <>
                Elevate Your <br />
                <GradientText variant="primary">Performance</GradientText>
              </>
            }
            subtitle="Harnessing the power of advanced Computer Vision and AI to track every move, analyze every set, and unlock your true biological potential."
            primaryEmoji="🎯"
          />
        </div>

        {/* Main Content Grid */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row w-full px-8 lg:px-24">
          {/* Left Section: Features */}
          <div className="flex-1 flex flex-col justify-center space-y-6 mb-12 lg:mb-0">
            {/* Features Grid */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-3xl font-bold mb-6"
              >
                Why Choose <GradientText variant="success">AURA</GradientText>?
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatedFeatureCard
                  emoji="🚀"
                  title="Real-time Recognition"
                  description="Instant skeleton tracking with AI-powered pose detection"
                  delay={0}
                />
                <AnimatedFeatureCard
                  emoji="🔒"
                  title="Private & Secure"
                  description="Edge-based processing keeps your data safe"
                  delay={0.1}
                />
                <AnimatedFeatureCard
                  emoji="📊"
                  title="Advanced Analytics"
                  description="Comprehensive insights into your fitness journey"
                  delay={0.2}
                />
                <AnimatedFeatureCard
                  emoji="💡"
                  title="Smart Recommendations"
                  description="Personalized guidance based on your performance"
                  delay={0.3}
                />
              </div>
            </div>

            {/* Fitness Features Showcase */}
            <div className="pt-8">
              <h3 className="text-xl font-bold mb-4">Available Features</h3>
              <FitnessFeatureShowcase emojis={fitnessFeatures} />
            </div>
          </div>

          {/* Right Section: Auth Container */}
          <div className="flex-1 flex items-center justify-center lg:pl-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md"
            >
              <VibrantGradientCard variant="primary">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold text-foreground"
                    >
                      Welcome Back
                    </motion.h2>
                    <p className="text-muted-foreground">Enter your credentials to continue</p>
                  </div>
                  <LoginForm />
                  <div className="space-y-3 pt-4 border-t border-border/30">
                    <p className="text-center text-xs text-muted-foreground">
                      Don't have an Aura account?
                    </p>
                    <Link href="/signup" className="block">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-primary to-cyan-500 text-white font-bold text-sm uppercase tracking-wider"
                      >
                        Get Access Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </VibrantGradientCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-6 text-xs text-muted-foreground border-t border-border/10 bg-background/50 backdrop-blur-sm">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Developed by the Mini Project Batch of Team 10 by CSE-D Students
        </motion.p>
      </footer>
    </div>
  );
}
