"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Ruler, Weight, Target, Activity, Zap, ArrowLeft, Save, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
    const { user, updateProfile, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [formData, setFormData] = useState({
        height: "",
        weight: "",
        stepGoal: "",
        calorieGoal: "",
        distanceGoal: ""
    });

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, authLoading, router]);

    useEffect(() => {
        if (user) {
            setFormData({
                height: user.height?.toString() || "",
                weight: user.weight?.toString() || "",
                stepGoal: user.stepGoal?.toString() || "",
                calorieGoal: user.calorieGoal?.toString() || "",
                distanceGoal: user.distanceGoal?.toString() || ""
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setIsSaved(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateProfile({
                height: parseFloat(formData.height) || 0,
                weight: parseFloat(formData.weight) || 0,
                stepGoal: parseInt(formData.stepGoal) || 0,
                calorieGoal: parseInt(formData.calorieGoal) || 0,
                distanceGoal: parseFloat(formData.distanceGoal) || 0,
            });
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-transparent p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Account Settings</h1>
                            <p className="text-muted-foreground text-sm">Manage your personal details and fitness goals.</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 space-y-4">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <Target className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold text-white">Daily Targets</h3>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Updating your goals will adjust your progress tracking on the dashboard.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                    <Ruler className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold text-white">Body Metrics</h3>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Accurate metrics help us calculate more precise calorie and health insights.
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-xl text-white">Fitness Goals & Profile</CardTitle>
                                    <CardDescription>Adjust your daily achievement targets.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="height" className="text-white/80">Height (cm)</Label>
                                            <div className="relative">
                                                <Ruler className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input id="height" type="number" value={formData.height} onChange={handleChange} className="pl-10 bg-white/5 border-white/10 text-white h-11" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="weight" className="text-white/80">Weight (kg)</Label>
                                            <div className="relative">
                                                <Weight className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input id="weight" type="number" value={formData.weight} onChange={handleChange} className="pl-10 bg-white/5 border-white/10 text-white h-11" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-white/10 my-2" />

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="stepGoal" className="text-white/80">Daily Step Goal</Label>
                                            <div className="relative">
                                                <Target className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input id="stepGoal" type="number" value={formData.stepGoal} onChange={handleChange} className="pl-10 bg-white/5 border-white/10 text-white h-11" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="calorieGoal" className="text-white/80">Daily Calorie Goal</Label>
                                            <div className="relative">
                                                <Activity className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input id="calorieGoal" type="number" value={formData.calorieGoal} onChange={handleChange} className="pl-10 bg-white/5 border-white/10 text-white h-11" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="distanceGoal" className="text-white/80">Daily Distance Goal (km)</Label>
                                            <div className="relative">
                                                <Zap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input id="distanceGoal" type="number" step="0.1" value={formData.distanceGoal} onChange={handleChange} className="pl-10 bg-white/5 border-white/10 text-white h-11" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <div className="p-6 border-t border-white/10 bg-white/[0.02] flex items-center justify-between rounded-b-xl">
                                    <div className="flex items-center gap-2">
                                        {isSaved && (
                                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                                                <CheckCircle2 className="h-4 w-4" />
                                                Changes saved successfully!
                                            </motion.div>
                                        )}
                                    </div>
                                    <Button type="submit" disabled={isLoading} className="bg-primary hover:opacity-90 h-11 px-8 min-w-[140px]">
                                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                                            <>
                                                <Save className="h-4 w-4 mr-2" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Card>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
