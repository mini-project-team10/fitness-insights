"use client";

import { useTheme } from "@/context/theme-context";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full glass-effect hover:bg-muted/50 transition-all duration-300 border border-border group"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                        <motion.div
                            key="moon"
                            initial={{ y: 20, opacity: 0, rotate: 45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.3, ease: "backOut" }}
                        >
                            <Moon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ y: 20, opacity: 0, rotate: 45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.3, ease: "backOut" }}
                        >
                            <Sun className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </button>
    );
}
