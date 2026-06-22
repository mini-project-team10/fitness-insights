"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Utensils, Zap, Shield, Flame, Scale, CheckCircle2, ChevronDown, ListChecks } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const programs = [
    {
        id: "lean-bulk",
        title: "Lean Bulk",
        type: "Bulking",
        description: "Controlled muscle gain with minimal fat accumulation.",
        nutrition: "Macros: Protein (1.8-2.2g/kg), Carbs (4-5g/kg), Fats (0.8-1g/kg). Aim for a surplus of 250-300 kcal daily.",
        icon: <Zap className="h-5 w-5 text-yellow-400" />,
        color: "from-yellow-500/20 to-orange-500/20",
        badge: "Clean",
        plan: {
            diet: "Structure 4-5 high-protein meals using lean meats (chicken/turkey/fish). Pair with complex carbs like oats and brown rice to fuel workouts and optimize recovery.",
            training: "Hypertrophy focus: 8-12 reps per set, 4-5 days a week.",
            keyTip: "Consistency in surplus is more important than massive meals."
        }
    },
    {
        id: "dirty-bulk",
        title: "Dirty Bulk",
        type: "Bulking",
        description: "Rapid weight gain focusing on maximal muscle growth.",
        nutrition: "Macros: Protein (2g+/kg), Carbs (5-7g/kg), Fats (1g+/kg). Maintain a surplus of 500+ kcal daily.",
        icon: <Shield className="h-5 w-5 text-red-400" />,
        color: "from-red-500/20 to-purple-500/20",
        badge: "Aggressive",
        plan: {
            diet: "Prioritize high calorie-density foods. Aim for heavy meals with significant carb portions (pasta/potatoes). Maintain protein targets to ensure weight gain is primarily muscle.",
            training: "Heavy strength: 3-6 reps per set, focus on PRs in big lifts.",
            keyTip: "Be prepared for some fat gain to maximize strength ceilings."
        }
    },
    {
        id: "mini-cut",
        title: "Mini-Cut",
        type: "Cutting",
        description: "Short term, aggressive fat loss to prime for a bulk.",
        nutrition: "Macros: Protein (2.3-2.6g/kg), Carbs (1-2g/kg), Fats (0.5-0.7g/kg). Target a deficit of 500-750 kcal daily.",
        icon: <Flame className="h-5 w-5 text-blue-400" />,
        color: "from-blue-500/20 to-cyan-500/20",
        badge: "Short-term",
        plan: {
            diet: "Aggressive caloric deficit. Eliminate snacks and liquid calories. Focus on high-volume, low-cal foods like green vegetables and lean white fish to maintain satiety.",
            training: "Maintenance focus: Keep heavy weights but reduce total sets/volume.",
            keyTip: "Limit this phase to 3 weeks max to avoid metabolic adaptation."
        }
    },
    {
        id: "steady-cut",
        title: "Steady Cut",
        type: "Cutting",
        description: "Sustainable fat loss while preserving muscle mass.",
        nutrition: "Macros: Protein (2.2g/kg), Carbs (2.5-3.5g/kg), Fats (0.7-0.8g/kg). Target a deficit of 300-500 kcal daily.",
        icon: <Scale className="h-5 w-5 text-emerald-400" />,
        color: "from-emerald-500/20 to-teal-500/20",
        badge: "Sustainable",
        plan: {
            diet: "Moderately low calories with a focus on high fiber/protein to preserve muscle. Time your carb intake around your training sessions for better energy and performance.",
            training: "Mix of strength and steady-state cardio (LISS) 3-4 times a week.",
            keyTip: "Sustainability is the goal; allow for 1-2 flexible meals weekly."
        }
    },
    {
        id: "recomposition",
        title: "Recomposition",
        type: "Maintenance+",
        description: "Losing fat and building muscle simultaneously.",
        nutrition: "Macros: Protein (2.2g+/kg), Carbs (Cycling 2-4g/kg), Fats (0.8g/kg). Aim for maintenance calories or +/- 100 kcal.",
        icon: <Dumbbell className="h-5 w-5 text-purple-400" />,
        color: "from-purple-500/20 to-pink-500/20",
        badge: "Advanced",
        plan: {
            diet: "Maintain maintenance calories while cycling carbs. Consume higher carbs on heavy training days (legs/back) and lower carbs on rest days to optimize fat oxidation.",
            training: "High intensity resistance; mix of compound and isolation moves.",
            keyTip: "Progress is measured in the mirror and strength, not just the scale."
        }
    }
];

export function TrainingPrograms() {
    const [selectedId, setSelectedId] = useState<string>("");
    const activeProgram = programs.find(p => p.id === selectedId);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-4 text-center md:text-left">
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground flex items-center justify-center md:justify-start gap-2">
                        <ListChecks className="h-6 w-6 text-primary" />
                        Choose Your Training Focus
                    </h3>
                    <p className="text-muted-foreground text-sm">Select a body training program from the dropdown below to generate your specific strategy.</p>
                </div>

                <div className="relative group max-w-md">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative">
                        <select
                            value={selectedId}
                            onChange={(e) => setSelectedId(e.target.value)}
                            className="w-full h-14 bg-muted/50 border border-border rounded-xl px-4 text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        >
                            <option value="" disabled className="bg-card">Select Your Training Program</option>
                            {programs.map((p) => (
                                <option key={p.id} value={p.id} className="bg-card py-2">
                                    {p.title} - ({p.type})
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none group-hover:text-primary transition-colors" />
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeProgram ? (
                    <motion.div
                        key={activeProgram.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="col-span-full border-border bg-gradient-to-br from-muted/20 to-transparent backdrop-blur-3xl overflow-hidden relative group">
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${activeProgram.color} blur-[100px] opacity-20`} />
                                <CardHeader className="relative pb-2">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${activeProgram.color} shadow-xl`}>
                                            {activeProgram.icon}
                                        </div>
                                        <Badge variant="outline" className="px-4 py-1 border-border bg-muted/30 text-foreground font-bold tracking-widest uppercase text-[10px]">
                                            {activeProgram.badge}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-3xl text-foreground font-extrabold">{activeProgram.title}</CardTitle>
                                    <CardDescription className="text-primary/70 font-bold uppercase tracking-widest">{activeProgram.type} OVERVIEW</CardDescription>
                                </CardHeader>
                                <CardContent className="relative">
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                                        {activeProgram.description}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-border bg-muted/10 backdrop-blur-xl group hover:border-emerald-500/30 transition-colors">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-2 rounded-lg bg-emerald-500/10">
                                            <Utensils className="h-5 w-5 text-emerald-500" />
                                        </div>
                                        <CardTitle className="text-lg text-foreground">Dietary & Nutrition Plan</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono">Structured Habits</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                                            "{activeProgram.plan.diet}"
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1 font-mono">Daily Macro Targets</p>
                                        <p className="text-sm text-foreground/80 font-medium leading-relaxed">{activeProgram.nutrition}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border bg-muted/10 backdrop-blur-xl group hover:border-blue-500/30 transition-colors">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-2 rounded-lg bg-blue-500/10">
                                            <Dumbbell className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <CardTitle className="text-lg text-foreground">Training Strategy</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">Primary Routine</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                                            "{activeProgram.plan.training}"
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                        <div className="flex items-center gap-2 mb-1">
                                            <CheckCircle2 className="h-3 w-3 text-blue-400" />
                                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">Coach's Essential Tip</p>
                                        </div>
                                        <p className="text-sm text-foreground/80 font-medium">{activeProgram.plan.keyTip}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-3xl bg-muted/5"
                    >
                        <div className="p-4 rounded-full bg-muted/30 mb-4">
                            <ListChecks className="h-10 w-10 text-muted-foreground/30" />
                        </div>
                        <p className="text-muted-foreground text-center max-w-xs">
                            Please select a body training program from the dropdown above to generate your strategy.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
