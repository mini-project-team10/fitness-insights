"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/Badge";
import { Overview } from "@/components/dashboard/Overview"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { UserControls } from "@/components/dashboard/UserControls"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Dumbbell, Calendar as CalendarIcon, Brain, Camera, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { TrainingPrograms } from "@/components/dashboard/TrainingPrograms"
import { WeeklyRecordsModal } from "@/components/dashboard/WeeklyRecordsModal"
import { Navbar } from "@/components/navbar"

export default function DashboardPage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showWeeklyRecords, setShowWeeklyRecords] = useState(false);
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, isLoading, router]);
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }
    if (!isAuthenticated) {
        return null;
    }
    const todayDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = currentTime.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const todayFocus = user?.schedule?.[todayDay] || "Rest Day";
    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <Navbar />
            <main className="flex-1 space-y-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-reveal">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
                            <Sparkles className="w-3 h-3" />
                            Live Insights
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Welcome, <span className="text-gradient leading-relaxed">{user?.name?.split(' ')[0] || "Athlete"}</span>
                        </h1>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{todayDay}, {formattedDate}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-border" />
                            <div className="flex items-center gap-2 text-sm text-primary font-mono font-bold tracking-wider">
                                <Activity className="h-4 w-4 animate-pulse" />
                                <span>{formattedTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="outline" className="glass-effect" onClick={() => setShowWeeklyRecords(true)}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Weekly History
                        </Button>
                        <Button className="bg-gradient-primary text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform border-none">
                            <Zap className="mr-2 h-4 w-4" />
                            Sync Device
                        </Button>
                        <UserControls />
                    </div>
                </div>
                <div className="animate-reveal" style={{ animationDelay: "0.1s" }}>
                    <StatsCards />
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7 animate-reveal" style={{ animationDelay: "0.2s" }}>
                    <Card className="col-span-4 glass-effect border-none shadow-xl overflow-hidden group">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Weekly Overview</CardTitle>
                            <CardDescription>
                                Your activity and consistency over the last 7 days.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3 glass-effect border-none shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-gradient">Quick Actions</CardTitle>
                            <CardDescription>
                                Advanced tools for performance optimization.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Gym Session Card */}
                            <div className="relative overflow-hidden group p-6 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-transparent transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Dumbbell className="h-24 w-24 text-primary rotate-12" />
                                </div>
                                <div className="relative space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-primary/20 rounded-lg">
                                                <Dumbbell className="h-5 w-5 text-primary" />
                                            </div>
                                            <h4 className="text-xl font-bold tracking-tight">Gym Session</h4>
                                        </div>
                                        <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-bold uppercase">
                                            {todayDay}
                                        </Badge>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-background/50 border border-border backdrop-blur-sm">
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Today's Focus</p>
                                        <h3 className="text-2xl font-black italic leading-tight tracking-tighter truncate">
                                            {todayFocus}
                                        </h3>
                                    </div>
                                    <Link href="/gym-session" className="block">
                                        <Button className="w-full h-14 bg-gradient-primary text-white font-bold rounded-2xl gap-3 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                                            <Activity className="h-5 w-5" />
                                            Start Session
                                            <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            {/* Activity Recognition Card */}
                            <Link href="/activity-recognition" className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-center justify-between group cursor-pointer hover:bg-secondary/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-xl bg-secondary/20">
                                        <Sparkles className="h-5 w-5 text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold group-hover:text-secondary transition-colors">Aura Vision AI</h4>
                                        <p className="text-xs text-muted-foreground italic">Pose & Activity Tracking</p>
                                    </div>
                                </div>
                                <div className="p-2 rounded-full glass-effect group-hover:translate-x-1 transition-transform">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </Link>
                            {/* BMI Calculator Card */}
                            <Link href="/bmi-calculator" className="p-4 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-between group cursor-pointer hover:bg-accent/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-xl bg-accent/20">
                                        <Activity className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold group-hover:text-accent transition-colors">Body Metrics</h4>
                                        <p className="text-xs text-muted-foreground">BMI & Composition</p>
                                    </div>
                                </div>
                                <div className="p-2 rounded-full glass-effect group-hover:translate-x-1 transition-transform">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
                <div className="pt-4 animate-reveal" style={{ animationDelay: "0.3s" }}>
                    <TrainingPrograms />
                </div>
            </main>
            <WeeklyRecordsModal
                isOpen={showWeeklyRecords}
                onClose={() => setShowWeeklyRecords(false)}
            />
        </div>
    )
}
