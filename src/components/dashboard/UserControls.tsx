"use client";

import { useAuth } from "@/context/auth-context";
<<<<<<< HEAD
=======
import { Button } from "@/components/ui/button";
>>>>>>> 2a696a50aa9d9b6d123f279ec00a9adbb65f0ee7
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
<<<<<<< HEAD
                className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 border border-border flex items-center justify-center cursor-pointer relative group"
            >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-xs font-bold text-primary-foreground overflow-hidden border border-border">
=======
                className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/40 to-blue-500/40 border border-primary/30 flex items-center justify-center cursor-pointer relative group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
            >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary via-blue-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white overflow-hidden border border-white/30 shadow-md">
>>>>>>> 2a696a50aa9d9b6d123f279ec00a9adbb65f0ee7
                    {user.photoURL ? (
                        <img src={user.photoURL} alt={user.name || "User"} className="h-full w-full object-cover" />
                    ) : (
                        initials
                    )}
                </div>

<<<<<<< HEAD
                {/* Chevron badge */}
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-card border border-border rounded-full flex items-center justify-center shadow-sm">
                    <ChevronDown className={cn("h-2.5 w-2.5 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
=======
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-primary/60 border border-primary/50 rounded-full flex items-center justify-center shadow-lg">
                    <ChevronDown className={cn("h-2.5 w-2.5 text-white transition-transform duration-200", isOpen && "rotate-180")} />
>>>>>>> 2a696a50aa9d9b6d123f279ec00a9adbb65f0ee7
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
<<<<<<< HEAD
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-64 glass-card p-2 rounded-2xl z-50 border border-border shadow-2xl"
                        >
                            {/* Profile header */}
                            <div className="px-4 py-3 border-b border-border mb-2 bg-muted/30 rounded-t-xl">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Account Profile</p>
                                <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{user.email}</p>
=======
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute right-0 top-full mt-2 w-64 glass-card p-3 rounded-2xl z-50 border border-primary/20 shadow-2xl shadow-primary/30 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5"
                        >
                            <div className="px-4 py-3 border-b border-primary/15 mb-2 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-t-xl">
                                <p className="text-[10px] font-bold text-primary/90 uppercase tracking-[0.2em] mb-1">Account Profile</p>
                                <p className="text-sm font-semibold text-white/95 truncate">{user.name}</p>
                                <p className="text-[11px] text-primary/60 truncate mt-0.5">{user.email}</p>
>>>>>>> 2a696a50aa9d9b6d123f279ec00a9adbb65f0ee7
                            </div>

                            {/* Settings link */}
                            <Link href="/settings" className="block w-full">
<<<<<<< HEAD
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all group">
                                    <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                                        <Settings className="h-4 w-4" />
=======
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/90 hover:text-white bg-gradient-to-r from-blue-500/10 to-primary/10 hover:from-blue-500/20 hover:to-primary/20 rounded-xl transition-all duration-200 group font-medium shadow-sm hover:shadow-md hover:shadow-primary/20">
                                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/40 to-primary/40 group-hover:from-blue-500/60 group-hover:to-primary/60 transition-all shadow-md">
                                        <Settings className="h-4 w-4 text-white/90" />
>>>>>>> 2a696a50aa9d9b6d123f279ec00a9adbb65f0ee7
                                    </div>
                                    Settings
                                </button>
                            </Link>

<<<<<<< HEAD
                            <div className="h-px bg-border my-2" />
=======
                            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-2" />
>>>>>>> 2a696a50aa9d9b6d123f279ec00a9adbb65f0ee7

                            {/* Logout button */}
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    logout();
                                }}
<<<<<<< HEAD
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all group"
                            >
                                <div className="p-1.5 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                                    <LogOut className="h-4 w-4" />
=======
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-300 hover:text-red-100 bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/25 hover:to-red-600/25 rounded-xl transition-all duration-200 group font-medium shadow-sm hover:shadow-md hover:shadow-red-500/20"
                            >
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500/40 to-red-600/40 group-hover:from-red-500/60 group-hover:to-red-600/60 transition-all shadow-md">
                                    <LogOut className="h-4 w-4 text-red-200" />
>>>>>>> 2a696a50aa9d9b6d123f279ec00a9adbb65f0ee7
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
