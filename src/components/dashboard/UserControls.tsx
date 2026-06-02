"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon, Settings, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function UserControls() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    const initials = user.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "U";

    return (
        <div className="relative">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 border border-white/10 flex items-center justify-center cursor-pointer relative group"
            >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-xs font-bold text-white overflow-hidden border border-white/20">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt={user.name || "User"} className="h-full w-full object-cover" />
                    ) : (
                        initials
                    )}
                </div>

                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center">
                    <ChevronDown className={cn("h-2.5 w-2.5 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-64 glass-card p-2 rounded-2xl z-50 border border-white/10 shadow-2xl"
                        >
                            <div className="px-4 py-3 border-b border-white/5 mb-2 bg-white/[0.02] rounded-t-xl">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Account Profile</p>
                                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{user.email}</p>
                            </div>

                            <Link href="/settings" className="block w-full">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-all group">
                                    <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-blue-500/20 transition-colors">
                                        <Settings className="h-4 w-4" />
                                    </div>
                                    Settings
                                </button>
                            </Link>

                            <div className="h-px bg-white/5 my-2" />

                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    logout();
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all group"
                            >
                                <div className="p-1.5 rounded-lg bg-red-400/5 group-hover:bg-red-400/20 transition-colors">
                                    <LogOut className="h-4 w-4" />
                                </div>
                                Log Out
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
