"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Circle, TrendingUp, Star, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";

interface WeeklyRecordsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WEEKLY_DATA = [
    { day: "Monday", steps: 8432, goal: 8000, calories: 420 },
    { day: "Tuesday", steps: 7120, goal: 8000, calories: 310 },
    { day: "Wednesday", steps: 9540, goal: 8000, calories: 512 },
    { day: "Thursday", steps: 8100, goal: 8000, calories: 390 },
    { day: "Friday", steps: 6500, goal: 8000, calories: 280 },
    { day: "Saturday", steps: 10200, goal: 8000, calories: 650 },
    { day: "Sunday", steps: 8800, goal: 8000, calories: 440 },
];

export function WeeklyRecordsModal({ isOpen, onClose }: WeeklyRecordsModalProps) {
    const totalGoals = WEEKLY_DATA.length;
    const completedGoals = WEEKLY_DATA.filter(d => d.steps >= d.goal).length;
    const accuracy = Math.round((completedGoals / totalGoals) * 100);

    const getRating = (acc: number) => {
        if (acc >= 90) return { label: "Elite Athlete", color: "text-yellow-400", icon: <Award className="h-5 w-5" /> };
        if (acc >= 70) return { label: "Performance Pro", color: "text-emerald-400", icon: <Star className="h-5 w-5" /> };
        if (acc >= 50) return { label: "Consistent Achiever", color: "text-blue-400", icon: <TrendingUp className="h-5 w-5" /> };
        return { label: "Developing Grit", color: "text-orange-400", icon: <Target className="h-5 w-5" /> };
    };

    const rating = getRating(accuracy);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header Decoration */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">
                                        Weekly Records
                                    </h2>
                                    <p className="text-muted-foreground text-sm font-medium">Performance tracking for the current week</p>
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

                            <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/[0.03]">
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Day</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Daily Goal</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Status</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Activity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {WEEKLY_DATA.map((item, idx) => (
                                            <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4 font-bold text-sm text-white">{item.day}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-mono text-muted-foreground">{item.goal} steps</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.steps >= item.goal ? (
                                                        <div className="flex items-center gap-2 text-emerald-400">
                                                            <CheckCircle2 className="h-4 w-4" />
                                                            <span className="text-[10px] font-black uppercase tracking-tighter">Completed</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-muted-foreground/40">
                                                            <Circle className="h-4 w-4" />
                                                            <span className="text-[10px] font-black uppercase tracking-tighter">Pending</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className={`text-sm font-black italic ${item.steps >= item.goal ? 'text-primary' : 'text-muted-foreground'}`}>
                                                        {item.steps}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer Stats */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Weekly Accuracy</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl font-black italic text-white tracking-tighter">{accuracy}%</span>
                                        <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">
                                            {completedGoals}/{totalGoals} Days
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Complement Rating</p>
                                    <div className={`flex items-center gap-2 text-xl font-bold italic tracking-tight ${rating.color}`}>
                                        {rating.icon}
                                        {rating.label}
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={onClose}
                                className="w-full mt-8 h-14 bg-white text-black hover:bg-white/90 rounded-2xl font-black italic uppercase tracking-tight shadow-xl transition-all active:scale-[0.98]"
                            >
                                Dismiss Records
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
