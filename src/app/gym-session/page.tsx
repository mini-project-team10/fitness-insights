"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/auth-context";
import {
    ChevronLeft,
    Dumbbell,
    Calendar,
    Target,
    Activity,
    Save,
    LayoutDashboard,
    Zap,
    ArrowRight,
    Play,
    Edit3,
    Trophy
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GymWeeklyRecordsModal } from "@/components/gym/GymWeeklyRecordsModal";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const WORKOUT_OPTIONS = ["Chest", "Back", "Biceps", "Triceps", "Shoulders", "Legs", "Running", "Cycling", "Weightlifting", "Swimming", "Rest Day"];

const WORKOUT_GUIDES: Record<string, { title: string, gif: string }[]> = {
    "Chest": [
        { title: "Flat Bench Press", gif: "https://media.giphy.com/media/3o7TKMGpxxXLyK7T3i/giphy.gif" },
        { title: "Incline Dumbbell Press", gif: "https://media.giphy.com/media/l0HlxO0E6fK0H5L8s/giphy.gif" },
        { title: "Chest Flyes", gif: "https://media.giphy.com/media/3o7TKv6Gz7t5XhL7mE/giphy.gif" },
        { title: "Dips for Chest", gif: "https://media.giphy.com/media/3o7TKpGvD3NUPv7f96/giphy.gif" },
        { title: "Pushups", gif: "https://media.giphy.com/media/3o7TKLJI8mR7Vz9YlO/giphy.gif" },
        { title: "Cable Crossover", gif: "https://media.giphy.com/media/3o7TKMGpxxXLyK7T3i/giphy.gif" }
    ],
    "Back": [
        { title: "Lat Pulldown", gif: "https://media.giphy.com/media/3o7TKLJI8mR7Vz9YlO/giphy.gif" },
        { title: "Seated Cable Row", gif: "https://media.giphy.com/media/3o7TKv6Gz7t5XhL7mE/giphy.gif" },
        { title: "Barbell Rows", gif: "https://media.giphy.com/media/3o7TKpGvD3NUPv7f96/giphy.gif" },
        { title: "Pullups", gif: "https://media.giphy.com/media/3o7TKMGpxxXLyK7T3i/giphy.gif" },
        { title: "Single Arm Row", gif: "https://media.giphy.com/media/l0HlxO0E6fK0H5L8s/giphy.gif" },
        { title: "Face Pulls", gif: "https://media.giphy.com/media/3o7TKv6Gz7t5XhL7mE/giphy.gif" }
    ],
    "Biceps": [
        { title: "Barbell Curls", gif: "https://media.giphy.com/media/3o7TKpGvD3NUPv7f96/giphy.gif" },
        { title: "Hammer Curls", gif: "https://media.giphy.com/media/3o7TKv6Gz7t5XhL7mE/giphy.gif" },
        { title: "Preacher Curls", gif: "https://media.giphy.com/media/l0HlxO0E6fK0H5L8s/giphy.gif" },
        { title: "Incline Curls", gif: "https://media.giphy.com/media/3o7TKMGpxxXLyK7T3i/giphy.gif" },
        { title: "Concentration Curls", gif: "https://media.giphy.com/media/3o7TKLJI8mR7Vz9YlO/giphy.gif" },
        { title: "Reverse Curls", gif: "https://media.giphy.com/media/3o7TKpGvD3NUPv7f96/giphy.gif" }
    ],
    "Triceps": [
        { title: "Tricep Pushdown", gif: "https://media.giphy.com/media/3o7TKLJI8mR7Vz9YlO/giphy.gif" },
        { title: "Skull Crushers", gif: "https://media.giphy.com/media/3o7TKv6Gz7t5XhL7mE/giphy.gif" },
        { title: "Tricep Dips", gif: "https://media.giphy.com/media/l0HlxO0E6fK0H5L8s/giphy.gif" },
        { title: "Overhead Extension", gif: "https://media.giphy.com/media/3o7TKMGpxxXLyK7T3i/giphy.gif" },
        { title: "Kickbacks", gif: "https://media.giphy.com/media/3o7TKpGvD3NUPv7f96/giphy.gif" },
        { title: "Close Grip Press", gif: "https://media.giphy.com/media/3o7TKMGpxxXLyK7T3i/giphy.gif" }
    ],
    "Shoulders": [
        { title: "Overhead Press", gif: "https://media.giphy.com/media/3o7TKMGpxxXLyK7T3i/giphy.gif" },
        { title: "Lateral Raises", gif: "https://media.giphy.com/media/3o7TKv6Gz7t5XhL7mE/giphy.gif" },
        { title: "Front Raises", gif: "https://media.giphy.com/media/3o7TKpGvD3NUPv7f96/giphy.gif" },
        { title: "Reverse Flyes", gif: "https://media.giphy.com/media/l0HlxO0E6fK0H5L8s/giphy.gif" },
        { title: "Shoulder Shrugs", gif: "https://media.giphy.com/media/3o7TKLJI8mR7Vz9YlO/giphy.gif" },
        { title: "Arnold Press", gif: "https://media.giphy.com/media/3o7TKv6Gz7t5XhL7mE/giphy.gif" }
    ],
    "Legs": [
        { title: "Barbell Squats", gif: "https://media.giphy.com/media/3o7TKpGvD3NUPv7f96/giphy.gif" },
        { title: "Deadlifts", gif: "https://media.giphy.com/media/l0HlxO0E6fK0H5L8s/giphy.gif" },
        { title: "Leg Press", gif: "https://media.giphy.com/media/3o7TKLJI8mR7Vz9YlO/giphy.gif" },
        { title: "Leg Extensions", gif: "https://media.giphy.com/media/3o7TKv6Gz7t5XhL7mE/giphy.gif" },
        { title: "Standing Calf Raise", gif: "https://media.giphy.com/media/3o7TKMGpxxXLyK7T3i/giphy.gif" },
        { title: "Lunges", gif: "https://media.giphy.com/media/3o7TKpGvD3NUPv7f96/giphy.gif" }
    ],
    "Rest Day": [
        { title: "Gentle Yoga", gif: "https://media.giphy.com/media/3o7TKMGpxxXLyK7T3i/giphy.gif" },
        { title: "Full Body Stretch", gif: "https://media.giphy.com/media/l0HlxO0E6fK0H5L8s/giphy.gif" },
        { title: "Foam Rolling", gif: "https://media.giphy.com/media/3o7TKv6Gz7t5XhL7mE/giphy.gif" },
        { title: "Light Walking", gif: "https://media.giphy.com/media/3o7TKpGvD3NUPv7f96/giphy.gif" },
        { title: "Mobility Drills", gif: "https://media.giphy.com/media/3o7TKLJI8mR7Vz9YlO/giphy.gif" },
        { title: "Deep Breathing", gif: "https://media.giphy.com/media/3o7TKMGpxxXLyK7T3i/giphy.gif" }
    ],
    "Running": [
        { title: "Jogging", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/3o7TKMGpxxXLyK7T3i/giphy.gif" },
        { title: "Sprint Intervals", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/l0HlxO0E6fK0H5L8s/giphy.gif" },
        { title: "Hill Runs", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/3o7TKv6Gz7t5XhL7mE/giphy.gif" },
        { title: "Tempo Run", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/3o7TKpGvD3NUPv7f96/giphy.gif" }
    ],
    "Cycling": [
        { title: "Steady Cycling", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/3o7TKLJI8mR7Vz9YlO/giphy.gif" },
        { title: "Interval Training", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/3o7TKMGpxxXLyK7T3i/giphy.gif" },
        { title: "Hill Climbing", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/l0HlxO0E6fK0H5L8s/giphy.gif" }
    ],
    "Weightlifting": [
        { title: "Clean and Jerk", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/3o7TKv6Gz7t5XhL7mE/giphy.gif" },
        { title: "Snatch", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/3o7TKpGvD3NUPv7f96/giphy.gif" },
        { title: "Overhead Squat", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/3o7TKLJI8mR7Vz9YlO/giphy.gif" }
    ],
    "Swimming": [
        { title: "Freestyle", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/3o7TKMGpxxXLyK7T3i/giphy.gif" },
        { title: "Breaststroke", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/l0HlxO0E6fK0H5L8s/giphy.gif" },
        { title: "Backstroke", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I1ZmI5ODliNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNmE5YjZiNiZjdD1n/3o7TKv6Gz7t5XhL7mE/giphy.gif" }
    ]
};

export default function GymSessionPage() {
    const { user, updateProfile } = useAuth();
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'session' | 'manage' | 'guides'>('session');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showWeeklyRecords, setShowWeeklyRecords] = useState(false);

    const [schedule, setSchedule] = useState<Record<string, string>>(() => {
        return user?.schedule || {
            Monday: "Chest",
            Tuesday: "Back",
            Wednesday: "Shoulders",
            Thursday: "Legs",
            Friday: "Biceps",
            Saturday: "Triceps",
        };
    });

    // Sync schedule with user data when it loads
    useEffect(() => {
        if (user?.schedule) {
            setSchedule(user.schedule);
        }
    }, [user?.schedule]);

    const handleSelectChange = (day: string, value: string) => {
        setSchedule(prev => ({ ...prev, [day]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateProfile({
                schedule: schedule
            });
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayFocus = user?.schedule?.[todayDay] || "Rest Day";
    const guides = WORKOUT_GUIDES[todayFocus] || WORKOUT_GUIDES["Rest Day"];

    return (
        <div className="min-h-screen bg-transparent p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <Link
                            href="/dashboard"
                            className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 group mb-4 inline-flex"
                        >
                            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500/50">
                            Gym Session
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Track your progress and stay focused on your goals.
                        </p>
                    </div>
                </div>

                <Card className="border-border bg-card/50 backdrop-blur-3xl overflow-hidden relative min-h-[500px]">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] -translate-y-1/2 translate-x-1/2" />

                    <CardHeader className="relative border-b border-border pb-8 flex flex-row items-center justify-between space-y-0">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-purple-500/10">
                                    <Dumbbell className="h-6 w-6 text-purple-400" />
                                </div>
                                <Badge variant="outline" className="text-[10px] font-bold tracking-widest uppercase border-purple-500/20 bg-purple-500/5 text-purple-400">
                                    {viewMode === 'session' ? 'SESSION ACTIVE' : (viewMode === 'guides' ? 'FORM GUIDES' : (isEditing ? 'EDITING SPLIT' : 'WEEKLY OVERVIEW'))}
                                </Badge>
                            </div>
                            <CardTitle className="text-2xl font-bold italic tracking-tight uppercase transition-all duration-300">
                                {viewMode === 'session' ? "Today's Routine" : (viewMode === 'guides' ? `${todayFocus} Mastery` : (isEditing ? 'Configure Split' : 'Weekly Split'))}
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => setShowWeeklyRecords(true)}
                                variant="glass"
                                size="icon"
                                title="Weekly Records"
                                className="h-12 w-12 rounded-2xl border-white/10 transition-all hover:bg-white/10 text-purple-400"
                            >
                                <Trophy className="h-5 w-5" />
                            </Button>
                            <Button
                                onClick={() => setViewMode(viewMode === 'session' ? 'manage' : 'session')}
                                variant="glass"
                                size="icon"
                                title={viewMode === 'session' ? "Show Weekly Split" : "Hide Weekly Split"}
                                className={`h-12 w-12 rounded-2xl border-white/10 transition-all ${viewMode === 'manage' ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-white/10'}`}
                            >
                                {viewMode === 'session' ? <Edit3 className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                            </Button>
                            {(viewMode === 'manage' || viewMode === 'guides') && (
                                <Button
                                    onClick={() => {
                                        if (viewMode === 'guides') {
                                            setViewMode('session');
                                        } else if (isEditing) {
                                            handleSave();
                                        } else {
                                            setIsEditing(true);
                                        }
                                    }}
                                    disabled={isSaving}
                                    size="icon"
                                    className={`h-12 w-12 rounded-2xl shadow-xl border border-white/10 transition-all hover:scale-105 active:scale-95 ${isEditing ? 'bg-green-600 hover:bg-green-700 shadow-green-500/20' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/40'}`}
                                >
                                    {isSaving ? (
                                        <Activity className="h-5 w-5 animate-spin text-white" />
                                    ) : (
                                        viewMode === 'guides' ? <ChevronLeft className="h-5 w-5 text-white" /> : (isEditing ? <Save className="h-5 w-5 text-white" /> : <Edit3 className="h-5 w-5 text-white" />)
                                    )}
                                </Button>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="relative pt-8 space-y-6">
                        <AnimatePresence mode="wait">
                            {viewMode === 'session' ? (
                                <motion.div
                                    key="session"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex flex-col items-center justify-center space-y-12 py-10"
                                >
                                    <div className="text-center space-y-4">
                                        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1.5 text-sm font-black uppercase tracking-[0.2em]">
                                            {todayDay}
                                        </Badge>
                                        <h2 className="text-7xl md:text-8xl font-black italic tracking-tighter text-white uppercase translate-y-2">
                                            {todayFocus}
                                        </h2>
                                        <div className="h-1.5 w-24 bg-purple-500 mx-auto rounded-full blur-[1px]" />
                                    </div>

                                    <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-6 rounded-[2rem] bg-muted/20 border border-border space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-emerald-500/10 rounded-xl">
                                                    <Target className="h-5 w-5 text-emerald-400" />
                                                </div>
                                                <h4 className="font-bold text-foreground tracking-tight uppercase text-xs">Primary Goal</h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {todayFocus === "Rest Day"
                                                    ? "Active recovery: Focus on mobility, light stretching, and long walks to refresh your CNS."
                                                    : todayFocus === "Running" || todayFocus === "Cycling" || todayFocus === "Swimming"
                                                        ? `Cardiovascular focus on ${todayFocus}. Maintain a consistent heart rate zone to optimize endurance and fat oxidation.`
                                                        : todayFocus === "Weightlifting"
                                                            ? "Strength and explosive power focus. Prioritize compound movements and technical precision."
                                                            : `Hypertrophy focus on ${todayFocus}. Target 3-4 sets per exercise with 8-12 reps for maximum muscle volume.`}
                                            </p>
                                        </div>
                                        <div className="p-6 rounded-[2rem] bg-muted/20 border border-border space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-500/10 rounded-xl">
                                                    <Activity className="h-5 w-5 text-blue-400" />
                                                </div>
                                                <h4 className="font-bold text-foreground tracking-tight uppercase text-xs">Pro Tip</h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {todayFocus === "Legs"
                                                    ? "Leg day generates the highest metabolic demand. Hydrate well and ensure a quality pre-workout meal."
                                                    : todayFocus === "Rest Day"
                                                        ? "Quality sleep is your anabolic tool today. Aim for 8+ hours to lock in your gains."
                                                        : todayFocus === "Running"
                                                            ? "Proper footwear and surface choice are key to joint health. Focus on a steady cadence."
                                                            : todayFocus === "Cycling"
                                                                ? "Maintain a consistent RPM and adjust resistance to challenge your aerobic threshold."
                                                                : todayFocus === "Swimming"
                                                                    ? "Focus on your breathing rhythm and long, efficient strokes to minimize drag."
                                                                    : todayFocus === "Weightlifting"
                                                                        ? "Quality over quantity. Perfect your form on big lifts before increasing the load."
                                                                        : "Focus on the mind-muscle connection. Squeeze at the peak of each rep to recruit maximum motor units."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                                        <Button
                                            onClick={() => setViewMode('guides')}
                                            className="w-full h-20 bg-white text-black hover:bg-white/90 text-2xl font-black italic uppercase tracking-tight shadow-[0_20px_50px_rgba(255,255,255,0.1)] rounded-[2rem] group"
                                            className="w-full h-20 bg-foreground text-background hover:bg-foreground/90 text-2xl font-black italic uppercase tracking-tight rounded-[2rem] group"
                                        >
                                            Let's Go
                                            <ArrowRight className="h-8 w-8 ml-3 transition-transform group-hover:translate-x-2" />
                                        </Button>
                                        <Link href="/dashboard" className="w-full">
                                            <Button variant="ghost" className="w-full h-14 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-muted/50 font-bold">
                                                Return to Home
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : viewMode === 'guides' ? (
                                <motion.div
                                    key="guides"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-8 py-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                                                <Zap className="h-5 w-5 text-yellow-400" />
                                                Form Guides
                                            </h3>
                                            <p className="text-sm text-muted-foreground italic">Instant visual guides for {todayFocus} movements.</p>
                                        </div>
                                        <Button
                                            onClick={() => setViewMode('session')}
                                            variant="outline"
                                            className="rounded-xl border-border hover:bg-muted"
                                        >
                                            Close Guides
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {guides.map((guide, index) => (
                                            <div key={index} className="space-y-4 group">
                                                <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-white/5 aspect-square relative shadow-2xl transition-all duration-500 group-hover:border-purple-500/30 group-hover:scale-[1.02] flex items-center justify-center">
                                                    <img
                                                        src={guide.gif}
                                                        alt={guide.title}
                                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                                        referrerPolicy="no-referrer"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = "https://media.giphy.com/media/3o7TKpGvD3NUPv7f96/giphy.gif";
                                                            target.className = "w-1/2 h-1/2 object-contain opacity-20 grayscale";
                                                        }}
                                                    />
                                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
                                                    <div className="absolute bottom-4 left-6 right-6">
                                                        <h4 className="text-sm font-black italic text-white uppercase tracking-tight truncate">
                                                            {guide.title}
                                                        </h4>
                                                        <p className="text-[8px] font-bold text-purple-400/80 uppercase tracking-widest mt-0.5">Guide #{index + 1}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <Button
                                            onClick={() => setViewMode('session')}
                                            className="w-full h-16 bg-purple-600 hover:bg-purple-700 text-white font-black italic uppercase tracking-tight rounded-2xl gap-3 shadow-2xl shadow-purple-500/40 transition-all hover:scale-[1.02]"
                                        >
                                            Let's Start Training
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="manage"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-6"
                                >
                                    {isEditing ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            {DAYS.map((day) => (
                                                <div key={day} className="space-y-3">
                                                    <div className="flex items-center gap-2 text-sm font-bold text-purple-400 uppercase tracking-wider">
                                                        <Calendar className="h-4 w-4" />
                                                        {day}
                                                    </div>
                                                    <div className="relative group">
                                                        <select
                                                            value={schedule[day]}
                                                            onChange={(e) => handleSelectChange(day, e.target.value)}
                                                            className="w-full h-14 pl-5 pr-10 bg-muted/30 border border-border rounded-2xl focus:border-purple-500/50 text-foreground appearance-none cursor-pointer outline-none transition-all hover:bg-muted/50 text-lg font-medium"
                                                        >
                                                            {WORKOUT_OPTIONS.map((option) => (
                                                                <option key={option} value={option} className="bg-card text-foreground">
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-hover:text-purple-400 transition-colors">
                                                            <ChevronLeft className="h-5 w-5 rotate-[270deg]" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {DAYS.map((day) => (
                                                <div
                                                    key={day}
                                                    className={`p-8 rounded-3xl border flex flex-col items-center justify-center space-y-2 transition-all hover:scale-[1.02] group text-center ${day === todayDay ? 'bg-purple-600/20 border-purple-500 shadow-xl shadow-purple-500/10' : 'bg-muted/10 border-border hover:bg-muted/20 hover:border-purple-500/20'}`}
                                                >
                                                    <span className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${day === todayDay ? 'text-purple-400' : 'text-muted-foreground group-hover:text-purple-400'}`}>
                                                        {day.slice(0, 3)}
                                                    </span>
                                                    <span className="text-2xl font-bold text-foreground tracking-tight">
                                                        {user?.schedule?.[day] || "Rest"}
                                                    </span>
                                                    {day === todayDay && (
                                                        <div className="mt-2 text-[10px] font-black italic text-purple-400 uppercase tracking-widest">Today</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex gap-4 pt-4">
                                        <Button
                                            onClick={() => setViewMode('session')}
                                            variant="outline"
                                            className="flex-1 h-14 rounded-2xl border-border hover:bg-muted font-bold"
                                        >
                                            Back to Focus
                                        </Button>
                                        <Button
                                            onClick={() => setViewMode('session')}
                                            className="flex-1 h-14 bg-white text-black hover:bg-white/90 rounded-2xl font-black italic uppercase tracking-tight shadow-xl"
                                        >
                                            Let's Go
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-3xl bg-muted/10 border border-border space-y-3">
                        <LayoutDashboard className="h-6 w-6 text-blue-400" />
                        <h4 className="font-bold text-foreground">Instant Sync</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">Your daily focus updates immediately across your entire dashboard.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-muted/10 border border-border space-y-3 md:col-span-2">
                        <Target className="h-6 w-6 text-emerald-400" />
                        <h4 className="font-bold text-foreground">Smart Split Advice</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Try to avoid training two large muscle groups (like Back and Legs) on consecutive days to ensure optimal CNS recovery and muscle growth.
                        </p>
                    </div>
                </div>
            </div>

            <GymWeeklyRecordsModal
                isOpen={showWeeklyRecords}
                onClose={() => setShowWeeklyRecords(false)}
                schedule={user?.schedule || {
                    Monday: "Chest",
                    Tuesday: "Back",
                    Wednesday: "Shoulders",
                    Thursday: "Legs",
                    Friday: "Biceps",
                    Saturday: "Triceps",
                    Sunday: "Rest Day"
                }}
                workoutGuides={WORKOUT_GUIDES}
            />
        </div>
    );
}
