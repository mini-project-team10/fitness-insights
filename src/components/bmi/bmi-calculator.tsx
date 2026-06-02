"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, RotateCcw, Info, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function BmiCalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [weight, setWeight] = useState<string>("");
    const [heightCm, setHeightCm] = useState<string>("");
    const [feet, setFeet] = useState<string>("");
    const [inches, setInches] = useState<string>("");

    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState<string>("");
    const [action, setAction] = useState<{ title: string; details: string; type: string }>({ title: "", details: "", type: "" });

    const calculateBmi = () => {
        let hInMeters = 0;
        const w = parseFloat(weight);

        if (unit === "metric") {
            hInMeters = parseFloat(heightCm) / 100;
        } else {
            const f = parseFloat(feet) || 0;
            const i = parseFloat(inches) || 0;
            const totalInches = (f * 12) + i;
            hInMeters = totalInches * 0.0254; // inches to meters
        }

        if (w > 0 && hInMeters > 0) {
            const bmiValue = w / (hInMeters * hInMeters);
            const finalBmi = parseFloat(bmiValue.toFixed(1));
            setBmi(finalBmi);

            if (bmiValue < 18.5) {
                setCategory("Underweight");
                setAction({
                    title: "Action: Mass Bulk",
                    type: "Gain Weight",
                    details: "Your priority is to gain mass. Focus on a significant caloric surplus (+500 kcal) with high-protein nutrient-dense foods and heavy strength training."
                });
            } else if (bmiValue < 21.5) {
                setCategory("Normal weight");
                setAction({
                    title: "Action: Lean Bulk",
                    type: "Muscle Growth",
                    details: "You are lean and in a prime position to grow. Maintain a small surplus (+200 kcal) to build muscle while keeping your body fat percentage low."
                });
            } else if (bmiValue < 25) {
                setCategory("Normal weight");
                setAction({
                    title: "Action: Balanced Weight",
                    type: "Body Recomposition",
                    details: "Your weight is ideal. Focus on 'Maingaining'—eating at maintenance calories with high protein to swap fat for muscle mass simultaneously."
                });
            } else if (bmiValue < 30) {
                setCategory("Overweight");
                setAction({
                    title: "Action: Lean Cut",
                    type: "Lean Fat Loss",
                    details: "Focus on dropping body fat while preserving muscle. Use a moderate deficit (-300 kcal) and maintain high protein intake with resistance training."
                });
            } else {
                setCategory("Obese");
                setAction({
                    title: "Action: Cut",
                    type: "Weight Reduction",
                    details: "Priority is fat loss. Maintain a consistent deficit (-500 kcal). Focus on high volume low-intensity cardio (walking) and keep training with weights."
                });
            }
        }
    };

    const reset = () => {
        setWeight("");
        setHeightCm("");
        setFeet("");
        setInches("");
        setBmi(null);
        setCategory("");
        setAction({ title: "", details: "", type: "" });
    };

    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case "Underweight": return "text-blue-400";
            case "Normal weight": return "text-emerald-400";
            case "Overweight": return "text-yellow-400";
            case "Obese": return "text-red-400";
            default: return "text-white";
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto overflow-hidden border-white/10 bg-black/40 backdrop-blur-xl">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Calculator className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            BMI Calculator
                        </CardTitle>
                    </div>
                </div>
                <CardDescription>
                    Fill in your details below. We'll provide a custom fitness recommendation based on your results.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Unit Toggle */}
                <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                    <button
                        onClick={() => setUnit("metric")}
                        className={cn(
                            "flex-1 py-1.5 text-xs font-medium rounded-lg transition-all",
                            unit === "metric" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        Metric (cm)
                    </button>
                    <button
                        onClick={() => setUnit("imperial")}
                        className={cn(
                            "flex-1 py-1.5 text-xs font-medium rounded-lg transition-all",
                            unit === "imperial" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        Imperial (ft/in)
                    </button>
                </div>

                <div className="grid gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                            id="weight"
                            type="number"
                            placeholder="e.g. 70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="bg-white/5 border-white/10 focus:border-primary/50 h-11"
                        />
                    </div>

                    {unit === "metric" ? (
                        <div className="space-y-2">
                            <Label htmlFor="heightCm">Height (cm)</Label>
                            <Input
                                id="heightCm"
                                type="number"
                                placeholder="e.g. 175"
                                value={heightCm}
                                onChange={(e) => setHeightCm(e.target.value)}
                                className="bg-white/5 border-white/10 focus:border-primary/50 h-11"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="feet">Feet</Label>
                                <Input
                                    id="feet"
                                    type="number"
                                    placeholder="e.g. 5"
                                    value={feet}
                                    onChange={(e) => setFeet(e.target.value)}
                                    className="bg-white/5 border-white/10 focus:border-primary/50 h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="inches">Inches</Label>
                                <Input
                                    id="inches"
                                    type="number"
                                    placeholder="e.g. 9"
                                    value={inches}
                                    onChange={(e) => setInches(e.target.value)}
                                    className="bg-white/5 border-white/10 focus:border-primary/50 h-11"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={calculateBmi}
                        className="flex-1 h-11 bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 font-semibold"
                        disabled={!weight || (unit === "metric" ? !heightCm : (!feet && !inches))}
                    >
                        Calculate & Suggest
                    </Button>
                    <Button variant="outline" size="icon" onClick={reset} className="border-white/10 hover:bg-white/5 h-11 w-11">
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>

                <AnimatePresence mode="wait">
                    {bmi && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-4"
                        >
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">BMI Score</div>
                                <div className="text-5xl font-black text-white mb-2">{bmi}</div>
                                <div className={cn("font-bold text-xl uppercase tracking-tight", getCategoryColor(category))}>
                                    {category}
                                </div>

                                <div className="mt-6 grid grid-cols-4 gap-1">
                                    <div className={cn("h-1.5 rounded-full", bmi < 18.5 ? "bg-blue-400" : "bg-white/10")} />
                                    <div className={cn("h-1.5 rounded-full", bmi >= 18.5 && bmi < 25 ? "bg-emerald-400" : "bg-white/10")} />
                                    <div className={cn("h-1.5 rounded-full", bmi >= 25 && bmi < 30 ? "bg-yellow-400" : "bg-white/10")} />
                                    <div className={cn("h-1.5 rounded-full", bmi >= 30 ? "bg-red-400" : "bg-white/10")} />
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="p-4 rounded-2xl bg-primary/10 border border-primary/20 relative group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-primary">
                                        <Sparkles className="h-4 w-4" />
                                        <span className="text-sm font-bold uppercase tracking-tight">{action.title}</span>
                                    </div>
                                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase">{action.type}</span>
                                </div>
                                <p className="text-sm text-white/80 leading-relaxed font-medium">
                                    {action.details}
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[11px] text-blue-200/60 leading-relaxed">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    <p>
                        This is an automated suggestion based on your BMI. For the best results, consult with a fitness professional or nutritionist.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
