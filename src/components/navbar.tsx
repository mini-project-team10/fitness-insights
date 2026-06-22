"use client";

import { ThemeToggle } from "./theme-toggle";
import { Activity, Bell } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { UserControls } from "./dashboard/UserControls";

export function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/50 glass-effect">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/dashboard" className="flex items-center space-x-2 group">
                        <div className="p-2 bg-gradient-primary rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <span className="hidden font-bold sm:inline-block text-xl tracking-tight text-gradient">
                            AURA FITNESS
                        </span>
                    </Link>
                    <nav className="hidden md:flex gap-6 text-sm font-medium">
                        <Link href="/dashboard" className="text-foreground/70 hover:text-primary transition-colors">Overview</Link>
                        <Link href="/gym-session" className="text-foreground/70 hover:text-primary transition-colors">Workouts</Link>
                        <Link href="/activity-recognition" className="text-foreground/70 hover:text-primary transition-colors">Recognition</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
                        <Bell className="h-5 w-5 text-foreground/70" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
                    </button>
                    <ThemeToggle />
                    {user && (
                        <div className="flex items-center gap-3 pl-4 border-l border-border">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-semibold">{user.name || "Athlete"}</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Pro Member</p>
                            </div>
                            <UserControls />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
