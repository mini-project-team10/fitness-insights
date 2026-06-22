"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, TrendingUp, Star, Target, Trophy, ChevronDown, ChevronUp, BarChart3, History, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAuth } from "@/context/auth-context";

interface GymWeeklyRecordsModalProps {
    isOpen: boolean;
    onClose: () => void;
    schedule: Record<string, string>;
    workoutGuides: Record<string, { title: string }[]>;
}

export function GymWeeklyRecordsModal({ isOpen, onClose, schedule, workoutGuides }: GymWeeklyRecordsModalProps) {
    const { user, updateProfile } = useAuth();
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const [completions, setCompletions] = useState<Record<string, Record<string, boolean>>>({});
    const [expandedDay, setExpandedDay] = useState<string | null>(null);
    const [todayDay, setTodayDay] = useState("");
    const [viewMode, setViewMode] = useState<'today' | 'weekly'>('today');

    useEffect(() => {
        setTodayDay(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
    }, [isOpen]);

    useEffect(() => {
        if (user) {
            if (user.gymCompletions) setCompletions(user.gymCompletions);
        } else {
            const saved = localStorage.getItem("gym-detailed-completions");
            if (saved) {
                try {
                    setCompletions(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse gym completions", e);
                }
            }
        }

        if (isOpen) {
            setViewMode('today');
            setExpandedDay(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
        }
    }, [isOpen, user]);

    const toggleExercise = async (day: string, exercise: string) => {
        const dayCompletions = completions[day] || {};
        const newCompletions = {
            ...completions,
            [day]: {
                ...dayCompletions,
                [exercise]: !dayCompletions[exercise]
            }
        };
        setCompletions(newCompletions);
        localStorage.setItem("gym-detailed-completions", JSON.stringify(newCompletions));

        if (user) {
            try {
                await updateProfile({ gymCompletions: newCompletions });
            } catch (error) {
                console.error("Failed to sync completions to cloud", error);
            }
        }
    };

    const toggleAllDay = async (day: string, exercises: { title: string }[]) => {
        const allDone = exercises.every(ex => completions[day]?.[ex.title]);
        const newDayCompletions: Record<string, boolean> = {};
        exercises.forEach(ex => {
            newDayCompletions[ex.title] = !allDone;
        });

        const newCompletions = {
            ...completions,
            [day]: newDayCompletions
        };
        setCompletions(newCompletions);
        localStorage.setItem("gym-detailed-completions", JSON.stringify(newCompletions));

        if (user) {
            try {
                await updateProfile({ gymCompletions: newCompletions });
            } catch (error) {
                console.error("Failed to sync completions to cloud", error);
            }
        }
    };

    const getDailyAccuracy = (day: string) => {
        const focus = schedule[day];
        if (!focus || focus === "Rest Day") return 0;
        const exercises = workoutGuides[focus] || [];
        if (exercises.length === 0) return 0;
        const completed = exercises.filter(ex => completions[day]?.[ex.title]).length;
        return Math.round((completed / exercises.length) * 100);
    };

    let weeklyTotal = 0;
    let weeklyCompleted = 0;
    DAYS.forEach(day => {
        const focus = schedule[day];
        if (focus && focus !== "Rest Day") {
            const exercises = workoutGuides[focus] || [];
            weeklyTotal += exercises.length;
            exercises.forEach(ex => {
                if (completions[day]?.[ex.title]) {
                    weeklyCompleted++;
                }
            });
        }
    });

    const todayAccuracy = getDailyAccuracy(todayDay);
    const todayFocusKey = schedule[todayDay];
    const todayExercises = (todayFocusKey && todayFocusKey !== "Rest Day") ? (workoutGuides[todayFocusKey] || []) : [];
    const todayTotal = todayExercises.length;
    const todayCompleted = todayExercises.filter(ex => completions[todayDay]?.[ex.title]).length;

    const accuracy = viewMode === 'today' ? todayAccuracy : (weeklyTotal > 0 ? Math.round((weeklyCompleted / weeklyTotal) * 100) : 0);
    const displayTotal = viewMode === 'today' ? todayTotal : weeklyTotal;
    const displayCompleted = viewMode === 'today' ? todayCompleted : weeklyCompleted;
    const displayLabel = viewMode === 'today' ? "Today's Score" : "Weekly Average";
    const subLabel = viewMode === 'today' ? "Current Workouts" : "Global Movements";

    const getRating = (acc: number) => {
        if (acc >= 90) return { label: "Muscle Master", color: "text-purple-400", icon: <Trophy className="h-5 w-5" /> };
        if (acc >= 70) return { label: "Gym Warrior", color: "text-emerald-400", icon: <Star className="h-5 w-5" /> };
        if (acc >= 50) return { label: "Steady Gainer", color: "text-blue-400", icon: <TrendingUp className="h-5 w-5" /> };
        return { label: "Consistency Seeker", color: "text-orange-400", icon: <Target className="h-5 w-5" /> };
    };

    const rating = getRating(accuracy);

    const renderDayRow = (day: string, isAlwaysExpanded = false, readOnly = false) => {
        const focus = schedule[day] || "Rest Day";
        const exercises = workoutGuides[focus] || [];
        const dayCompletions = completions[day] || {};
        const completedCount = exercises.filter(ex => dayCompletions[ex.title]).length;
        const isDayFullyDone = exercises.length > 0 && completedCount === exercises.length;
        const isExpanded = isAlwaysExpanded || expandedDay === day;
        const dayAcc = getDailyAccuracy(day);

        const dayIdx = DAYS.indexOf(day);
        const todayIdx = DAYS.indexOf(todayDay);
        const isFuture = dayIdx > todayIdx && viewMode === 'weekly';

        return (
            <div key={day} className="space-y-2">
                <div
                    onClick={() => !isAlwaysExpanded && setExpandedDay(isExpanded ? null : day)}
                    className={`p-5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${isDayFullyDone ? 'bg-purple-500/10 border-purple-500/30 shadow-lg shadow-purple-500/5' : 'bg-white/[0.02] border-white/5 hover:border-white/10'} ${day === todayDay && viewMode === 'weekly' ? 'ring-2 ring-purple-500/50' : ''}`}
                >
                    <div className="flex items-center gap-4">
                        <div
                            onClick={(e) => {
                                if (readOnly || focus === "Rest Day") return;
                                e.stopPropagation();
                                toggleAllDay(day, exercises);
                            }}
                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isDayFullyDone ? 'bg-purple-500 border-purple-500' : 'border-white/20'} ${!readOnly && !isDayFullyDone && focus !== "Rest Day" ? 'hover:border-purple-500/50' : ''}`}
                        >
                            {isDayFullyDone && <CheckCircle2 className="h-4 w-4 text-white" />}
                        </div>
                        <div>
                            <p className="font-black italic uppercase tracking-tight text-white flex items-center gap-2">
                                {day}
                                {day === todayDay && <Badge className="bg-purple-500 text-white text-[8px] h-4">TODAY</Badge>}
                                {!isAlwaysExpanded && (isExpanded ? <ChevronUp className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />)}
                            </p>
                            <p className={`text-xs font-bold uppercase tracking-widest ${isDayFullyDone ? 'text-purple-400' : 'text-muted-foreground'}`}>
                                {focus} {exercises.length > 0 && `• ${completedCount}/${exercises.length} Exercises`}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {exercises.length > 0 && (
                            <Badge className={`${dayAcc >= 100 ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-muted-foreground'} border-none text-[10px] font-black`}>
                                {isFuture ? '0%' : `${dayAcc}%`}
                            </Badge>
                        )}
                        {isDayFullyDone ? (
                            <Badge className="bg-purple-500 text-white border-none text-[8px] font-black uppercase">DONE</Badge>
                        ) : (
                            <Badge variant="outline" className="text-muted-foreground/30 border-white/5 text-[8px] font-black uppercase">
                                {focus === "Rest Day" ? "RECOVER" : "PENDING"}
                            </Badge>
                        )}
                    </div>
                </div>

                <AnimatePresence initial={false}>
                    {isExpanded && exercises.length > 0 && (
                        <motion.div
                            initial={isAlwaysExpanded ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden px-4"
                        >
                            <div className="py-2 space-y-2 border-l-2 border-purple-500/20 ml-3 pl-6">
                                {exercises.map((ex) => (
                                    <div
                                        key={ex.title}
                                        onClick={() => !readOnly && toggleExercise(day, ex.title)}
                                        className={`flex items-center justify-between group/ex py-1 ${!readOnly ? 'cursor-pointer' : 'cursor-default'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${dayCompletions[ex.title] ? 'bg-purple-500/40 border-purple-500/60' : 'border-white/10'} ${!readOnly && !dayCompletions[ex.title] ? 'group-hover/ex:border-purple-500/40' : ''}`}>
                                                {dayCompletions[ex.title] && <CheckCircle2 className="h-3 w-3 text-white" />}
                                            </div>
                                            <span className={`text-sm font-medium transition-colors ${dayCompletions[ex.title] ? 'text-white' : 'text-muted-foreground'} ${!readOnly && !dayCompletions[ex.title] ? 'group-hover/ex:text-white' : ''}`}>
                                                {ex.title}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const todayIdx = DAYS.indexOf(todayDay);
    const activeWeekGraphData = DAYS.map((day, index) => {
        const acc = getDailyAccuracy(day);
        return {
            day: day.slice(0, 3),
            accuracy: index <= todayIdx ? acc : 0,
            fullDay: day,
            isFuture: index > todayIdx
        };
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0d0d0d] border border-purple-500/20 rounded-[3rem] shadow-[0_0_100px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase flex items-center gap-3">
                                        <Trophy className="h-8 w-8 text-purple-400" />
                                        Records
                                    </h2>
                                    <p className="text-muted-foreground text-sm font-medium">Log your session progress</p>
                                </div>
                                <Button
                                    variant="glass"
                                    size="icon"
                                    onClick={onClose}
                                    className="rounded-full hover:bg-white/10"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="flex p-1 bg-white/5 rounded-2xl mb-6">
                                <button
                                    onClick={() => setViewMode('today')}
                                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'today' ? 'bg-purple-600 text-white' : 'text-muted-foreground hover:text-white'}`}
                                >
                                    Logging
                                </button>
                                <button
                                    onClick={() => setViewMode('weekly')}
                                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'weekly' ? 'bg-purple-600 text-white' : 'text-muted-foreground hover:text-white'}`}
                                >
                                    Review
                                </button>
                            </div>

                            <div className="space-y-4">
                                {viewMode === 'today' ? (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Zap className="h-5 w-5 text-purple-400" />
                                                <h3 className="text-lg font-bold text-white uppercase tracking-tight italic">Live Logging</h3>
                                            </div>
                                            <Badge variant="outline" className="border-purple-500/30 text-purple-400">{todayDay}</Badge>
                                        </div>
                                        {renderDayRow(todayDay, true, false)}
                                        {schedule[todayDay] === "Rest Day" && (
                                            <div className="p-8 text-center space-y-3 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl mt-4">
                                                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                                                    <Star className="h-6 w-6 text-purple-400" />
                                                </div>
                                                <p className="text-muted-foreground text-sm italic">It's your rest day! Focus on recovery and nutrition.</p>
                                            </div>
                                        )}

                                        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h4 className="text-white font-bold uppercase italic text-sm">Finish Weekly Cycle</h4>
                                                    <p className="text-[10px] text-muted-foreground">Archive current progress and start fresh next week.</p>
                                                </div>
                                                <Button
                                                    onClick={() => {}}
                                                    disabled={weeklyCompleted === 0}
                                                    className="bg-purple-600 hover:bg-purple-700 h-10 px-6 rounded-xl text-[10px] font-black uppercase italic shadow-lg shadow-purple-500/20"
                                                >
                                                    Archive Week
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white uppercase tracking-tight italic">Weekly Performance</h3>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Daily Accuracy Breakdown</p>
                                            </div>
                                        </div>
                                        {DAYS.map((day) => renderDayRow(day, false, true))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{displayLabel}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-5xl font-black italic text-white tracking-tighter">{accuracy}%</span>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-purple-400 leading-none">{displayCompleted}/{displayTotal}</p>
                                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{subLabel}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{viewMode === 'today' ? 'Session Rank' : 'Volume Rating'}</p>
                                    <div className={`flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 ${rating.color}`}>
                                        {rating.icon}
                                        <span className="text-xl font-bold italic tracking-tight">{rating.label}</span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground italic leading-tight">
                                        {viewMode === 'today' ? 'Calculated for today\'s specific movements.' : 'Calculated across all scheduled movements.'}
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={onClose}
                                className="w-full mt-8 h-16 bg-purple-600 hover:bg-purple-700 text-white font-black italic uppercase tracking-tight rounded-2xl shadow-2xl shadow-purple-500/40 transition-all active:scale-[0.98]"
                            >
                                {viewMode === 'today' ? 'Done for Today' : 'Save & Exit Records'}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
