"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, Camera, Cpu, Activity, Zap, Brain } from "lucide-react"
import Link from "next/link"
import { ActivityClassifier } from "@/components/activity-recognition/ActivityClassifier"

export default function ActivityRecognitionPage() {
    return (
        <div className="min-h-screen bg-transparent text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <Link
                            href="/dashboard"
                            className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group mb-4 inline-flex"
                        >
                            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50">
                            Human Activity Recognition
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Vision-based AI tool to track sitting, running, walking, and sleeping via camera.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Vision Classifier */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        <ActivityClassifier />
                    </div>

                    {/* Info Side Panel */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-6">
                        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 relative overflow-hidden group">
                            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Brain className="h-48 w-48 text-primary" />
                            </div>
                            <div className="relative space-y-4">
                                <div className="p-3 bg-primary/20 rounded-2xl w-fit">
                                    <Cpu className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Computer Vision AI</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    This tool uses high-frequency image sampling to extract joint coordinates and body orientation. Our model is trained on thousands of samples to recognize posture changes in real-time.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
                            <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <Activity className="h-4 w-4 text-emerald-400" />
                                    </div>
                                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">Pose Tracking</h4>
                                </div>
                                <p className="text-xs text-muted-foreground">Monitors 33 body keypoints to detect movement patterns.</p>
                            </div>
                            <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Zap className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">Auto-Detection</h4>
                                </div>
                                <p className="text-xs text-muted-foreground">Seamlessly switches between static and dynamic activities.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
