"use client";

import { useAuth } from "@/context/auth-context";
import { LogOut, Settings, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function UserControls() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    const initials = user.name
        ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
        : "U";

    return (
        <div className="relative">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 border border-border flex items-center justify-center cursor-pointer relative group"
            >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-xs font-bold text-primary-foreground overflow-hidden border border-border">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt={user.name || "User"} className="h-full w-full object-cover" />
                    ) : (
                        initials
                    )}
                </div>

                {/* Chevron badge */}
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-card border border-border rounded-full flex items-center justify-center shadow-sm">
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
                            className="absolute right-0 mt-2 w-64 glass-card p-2 rounded-2xl z-50 border border-border shadow-2xl"
                        >
                            {/* Profile header */}
                            <div className="px-4 py-3 border-b border-border mb-2 bg-muted/30 rounded-t-xl">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Account Profile</p>
                                <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{user.email}</p>
                            </div>

                            {/* Settings link */}
                            <Link href="/settings" className="block w-full">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all group">
                                    <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                                        <Settings className="h-4 w-4" />
                                    </div>
                                    Settings
                                </button>
                            </Link>

                            <div className="h-px bg-border my-2" />

                            {/* Logout button */}
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    logout();
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all group"
                            >
                                <div className="p-1.5 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
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
