"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { BmiCalculator } from "@/components/bmi/bmi-calculator";
import { UserControls } from "@/components/dashboard/UserControls";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Activity } from "lucide-react";
import Link from "next/link";

export default function BmiCalculatorPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
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
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <Activity className="h-4 w-4 text-primary" />
                                <span className="text-xs font-semibold tracking-wider text-primary uppercase">FitTracker Tool</span>
                            </div>
                            <h1 className="text-3xl font-bold text-white uppercase tracking-tight">BMI Calculator</h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <UserControls />
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
                    <div className="space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                            Understand Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Body Composition</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Body Mass Index (BMI) is a simple and widely used method for categorizing weight ranges that may lead to health problems. It's a great starting point for assessing your overall fitness status.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <h4 className="font-semibold text-white mb-2 uppercase text-xs tracking-widest text-primary">Why track BMI?</h4>
                                <p className="text-sm text-muted-foreground">Identify potential health risks associated with weight and monitor your progress over time.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <h4 className="font-semibold text-white mb-2 uppercase text-xs tracking-widest text-emerald-400">Holistic View</h4>
                                <p className="text-sm text-muted-foreground">Combine BMI with other metrics like activity levels and nutrition for a complete health overview.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <BmiCalculator />
                    </div>
                </div>
            </div>
        </div>
    );
}
