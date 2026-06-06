"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { LoginForm } from "@/components/auth/login-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { Activity, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

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

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex flex-col justify-between">

      {/* Top Bar */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <Activity className="text-primary w-8 h-8" />
          <span className="font-bold text-2xl tracking-tighter text-gradient">AURA</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row w-full pt-20 lg:pt-0">
        {/* Left Perspective: Brand & Features */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 z-10 pt-24 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Next-Gen Fitness Recognition</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Elevate Your <br />
              <span className="text-gradient">Performance.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Harnessing the power of advanced Computer Vision and AI to track every move, analyze every set, and unlock your true biological potential.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
              {[
                { icon: Zap, title: "Real-time recognition", desc: "Instant skeleton tracking" },
                { icon: ShieldCheck, title: "Private & Secure", desc: "Edge-based processing" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl glass-effect border-border/50">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Perspective: Auth Container */}
        <div className="flex-1 flex items-center justify-center p-8 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <div className="relative p-1 rounded-[2rem] bg-gradient-to-br from-primary via-border to-secondary shadow-2xl">
              <div className="bg-card rounded-[1.8rem] p-8 md:p-10 backdrop-blur-3xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold">Welcome Back</h2>
                  <p className="text-muted-foreground mt-2">Enter your credentials to continue</p>
                </div>
                <LoginForm />
              </div>
            </div>
            <p className="text-center mt-8 text-sm text-muted-foreground">
              Don't have an Aura account?{" "}
              <Link href="/signup" className="text-primary font-bold cursor-pointer hover:underline">
                Get Access
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-muted-foreground z-10 border-t border-border/10 bg-background/50 backdrop-blur-sm">
        Developed by the Mini Project Batch of Team 10 by CSE-D Students
      </footer>
    </div>
  );
}
