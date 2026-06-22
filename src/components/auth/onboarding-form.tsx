"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, Weight, Target, Flame, Zap, ArrowRight, Loader2, Activity, Users, Dumbbell } from "lucide-react";

export function OnboardingForm() {
    const { updateProfile } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        height: "",
        weight: "",
        gender: "male",
        stepGoal: "10000",
        calorieGoal: "2500",
        distanceGoal: "5",
        Monday: "Chest",
        Tuesday: "Back",
        Wednesday: "Shoulders",
        Thursday: "Legs",
        Friday: "Biceps",
        Saturday: "Triceps",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step < steps.length) {
            nextStep();
            return;
        }

        setIsLoading(true);
        try {
            await updateProfile({
                height: parseFloat(formData.height) || 0,
                weight: parseFloat(formData.weight) || 0,
                gender: formData.gender,
                stepGoal: parseInt(formData.stepGoal) || 0,
                calorieGoal: parseInt(formData.calorieGoal) || 0,
                distanceGoal: parseFloat(formData.distanceGoal) || 0,
                // @ts-ignore - including dynamic schedule
                schedule: {
                    Monday: formData.Monday,
                    Tuesday: formData.Tuesday,
                    Wednesday: formData.Wednesday,
                    Thursday: formData.Thursday,
                    Friday: formData.Friday,
                    Saturday: formData.Saturday,
                },
                onboardingComplete: true
            });
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const workoutOptions = ["Chest", "Back", "Biceps", "Triceps", "Shoulders", "Legs", "Running", "Cycling", "Weightlifting", "Swimming", "Rest Day"];

    const steps = [
        {
            title: "Body Details",
            description: "Tell us about your physical attributes.",
            fields: [
                { id: "gender", label: "Gender", icon: <Users className="h-4 w-4" />, type: "select", options: ["male", "female", "other"] },
                { id: "height", label: "Height (cm)", icon: <Ruler className="h-4 w-4" />, type: "number", placeholder: "e.g. 175" },
                { id: "weight", label: "Weight (kg)", icon: <Weight className="h-4 w-4" />, type: "number", placeholder: "e.g. 70" }
            ]
        },
        {
            title: "Daily Goals",
            description: "What are you aiming to achieve daily?",
            fields: [
                { id: "stepGoal", label: "Step Goal", icon: <Target className="h-4 w-4" />, type: "number", placeholder: "10000" },
                { id: "calorieGoal", label: "Calories Burned Goal", icon: <Activity className="h-4 w-4" />, type: "number", placeholder: "2500" },
                { id: "distanceGoal", label: "Active Distance (km)", icon: <Zap className="h-4 w-4" />, type: "number", placeholder: "5" }
            ]
        },
        {
            title: "Weekly Workout Split",
            description: "Plan your training sessions for the week.",
            fields: [
                { id: "Monday", label: "Monday", icon: <Dumbbell className="h-4 w-4" />, type: "select", options: workoutOptions },
                { id: "Tuesday", label: "Tuesday", icon: <Dumbbell className="h-4 w-4" />, type: "select", options: workoutOptions },
                { id: "Wednesday", label: "Wednesday", icon: <Dumbbell className="h-4 w-4" />, type: "select", options: workoutOptions },
                { id: "Thursday", label: "Thursday", icon: <Dumbbell className="h-4 w-4" />, type: "select", options: workoutOptions },
                { id: "Friday", label: "Friday", icon: <Dumbbell className="h-4 w-4" />, type: "select", options: workoutOptions },
                { id: "Saturday", label: "Saturday", icon: <Dumbbell className="h-4 w-4" />, type: "select", options: workoutOptions },
            ]
        }
    ];

    const currentStepData = steps[step - 1];

    return (
        <Card className="w-full max-w-lg mx-auto border-border bg-card backdrop-blur-xl">
            <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-foreground">Let's Get Started</CardTitle>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Step {step} of 3</span>
                </div>
                <CardDescription className="text-base text-muted-foreground">
                    {currentStepData.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className={`grid gap-4 ${step === 3 ? "grid-cols-2" : "grid-cols-1"}`}>
                                {currentStepData.fields.map((field) => (
                                    <div key={field.id} className="space-y-2">
                                        <Label htmlFor={field.id} className="text-sm font-medium text-foreground/80">{field.label}</Label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-3.5 text-muted-foreground z-10">
                                                {field.icon}
                                            </div>
                                            {field.type === "select" ? (
                                                <select
                                                    id={field.id}
                                                    value={formData[field.id as keyof typeof formData]}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 h-12 bg-muted/30 border border-border rounded-xl focus:border-primary/50 text-foreground appearance-none cursor-pointer outline-none text-sm"
                                                >
                                                    {field.options?.map((opt) => (
                                                        <option key={opt} value={opt} className="bg-card text-foreground">
                                                            {opt}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <Input
                                                    id={field.id}
                                                    type="number"
                                                    value={formData[field.id as keyof typeof formData]}
                                                    onChange={handleChange}
                                                    placeholder={field.placeholder}
                                                    required
                                                    className="pl-10 h-12 bg-muted/30 border-border focus:border-primary/50 text-foreground"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex gap-4 pt-4">
                        {step > 1 && (
                            <Button type="button" variant="outline" onClick={prevStep} className="flex-1 border-border hover:bg-muted h-12">
                                Back
                            </Button>
                        )}
                        {step < 3 ? (
                            <Button type="submit" className="flex-1 bg-primary hover:opacity-90 h-12 group">
                                Next <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isLoading} className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 h-12">
                                {isLoading ? <Loader2 className="animate-spin" /> : "Complete Setup"}
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
