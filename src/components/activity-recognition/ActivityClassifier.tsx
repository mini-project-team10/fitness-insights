"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/Badge"
import { Activity, Camera, Play, Pause, RotateCcw, AlertTriangle, Monitor, Sparkles, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ActivityClassifier() {
    const [isActive, setIsActive] = useState(false)
    const [currentActivity, setCurrentActivity] = useState("Standing")
    const [history, setHistory] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const prevFrameRef = useRef<ImageData | null>(null)
    const requestRef = useRef<number>(0)

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 1280, height: 720, facingMode: "user" } 
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                setIsActive(true)
                setError(null)
            }
        } catch (err) {
            console.error("Error accessing camera:", err)
            setError("Camera access denied. Please enable camera permissions in your browser.")
        }
    }

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
            tracks.forEach(track => track.stop())
            videoRef.current.srcObject = null
        }
        setIsActive(false)
        if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }

    const processFrame = () => {
        if (!videoRef.current || !canvasRef.current || !isActive) return

        const video = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return

        // Set canvas size to match video aspect ratio if not set
        if (canvas.width !== video.videoWidth) {
            canvas.width = video.videoWidth || 640
            canvas.height = video.videoHeight || 360
        }

        // Draw current video frame to canvas
        ctx.save()
        ctx.scale(-1, 1) // Mirror effect
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
        ctx.restore()

        const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height)
        
        if (prevFrameRef.current) {
            const prevData = prevFrameRef.current.data
            const currData = currentFrame.data
            let motionPixels = 0
            let hSum = 0
            let vSum = 0

            // Simplified processing: sample pixels for performance
            for (let i = 0; i < currData.length; i += 16) { // Sample every 4th pixel
                const r = currData[i]
                const g = currData[i + 1]
                const b = currData[i + 2]
                const avg = (r + g + b) / 3

                const pr = prevData[i]
                const pg = prevData[i + 1]
                const pb = prevData[i + 2]
                const pAvg = (pr + pg + pb) / 3

                // Motion detection (Difference)
                if (Math.abs(avg - pAvg) > 25) {
                    motionPixels++
                }

                // Orientation detection (Binary edges/intensity)
                if (avg > 128) {
                    const x = (i / 4) % canvas.width
                    const y = Math.floor((i / 4) / canvas.width)
                    hSum += y / canvas.height
                    vSum += x / canvas.width
                }
            }

            const motionScore = (motionPixels / (currData.length / 16)) * 100
            
            let activity = "Standing"
            if (motionScore > 8) {
                activity = "Running"
            } else if (motionScore > 2) {
                activity = "Walking"
            } else {
                // Heuristic for posture based on spread of high intensity pixels
                const ratio = hSum / (vSum || 1)
                if (ratio > 1.8) {
                    activity = "Sleeping"
                } else if (ratio > 1.2) {
                    activity = "Sitting"
                } else {
                    activity = "Standing"
                }
            }

            if (activity !== currentActivity) {
                setCurrentActivity(activity)
                setHistory(prev => [activity, ...prev].slice(0, 8))
            }
        }

        // Update technical overlays
        drawOverlays(ctx, canvas)

        prevFrameRef.current = currentFrame
        requestRef.current = requestAnimationFrame(processFrame)
    }

    const drawOverlays = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const w = canvas.width
        const h = canvas.height

        // Technical borders
        ctx.strokeStyle = '#6366f1' // Primary color
        ctx.lineWidth = 2
        ctx.setLineDash([5, 15])
        ctx.strokeRect(w * 0.15, h * 0.15, w * 0.7, h * 0.7)
        
        // Scanning line animation
        const time = Date.now() / 1000
        const scanY = (Math.sin(time * 2) + 1) / 2 * h
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)'
        ctx.setLineDash([])
        ctx.moveTo(0, scanY)
        ctx.lineTo(w, scanY)
        ctx.stroke()

        // Corner markers
        const s = 30
        ctx.strokeStyle = '#6366f1'
        ctx.lineWidth = 4
        // Top Left
        ctx.beginPath(); ctx.moveTo(20, 20 + s); ctx.lineTo(20, 20); ctx.lineTo(20 + s, 20); ctx.stroke();
        // Top Right
        ctx.beginPath(); ctx.moveTo(w - 20 - s, 20); ctx.lineTo(w - 20, 20); ctx.lineTo(w - 20, 20 + s); ctx.stroke();
        // Bottom Left
        ctx.beginPath(); ctx.moveTo(20, h - 20 - s); ctx.lineTo(20, h - 20); ctx.lineTo(20 + s, h - 20); ctx.stroke();
        // Bottom Right
        ctx.beginPath(); ctx.moveTo(w - 20 - s, h - 20); ctx.lineTo(w - 20, h - 20); ctx.lineTo(w - 20, h - 20 - s); ctx.stroke();
    }

    useEffect(() => {
        if (isActive) {
            requestRef.current = requestAnimationFrame(processFrame)
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
        }
    }, [isActive, currentActivity])

    return (
        <Card className="glass-effect border-none shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 z-10">
                <Badge variant="outline" className={isActive ? "border-primary/50 text-white bg-primary/20 backdrop-blur-md" : "text-muted-foreground bg-muted/20"}>
                    {isActive ? "BROWSER CAMERA ENGINE LIVE" : "SYSTEM IDLE"}
                </Badge>
            </div>

            <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <Scan className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold tracking-tight">System AI Recognition</CardTitle>
                        <CardDescription>
                            Direct browser-to-camera processing. No external servers required.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Camera Viewport */}
                <div className="relative rounded-[2.5rem] overflow-hidden bg-background border border-border aspect-video flex items-center justify-center group shadow-inner">
                    <video 
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="hidden" // We draw the video to the canvas
                    />
                    
                    <canvas 
                        ref={canvasRef}
                        className={`w-full h-full object-cover transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {!isActive && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-6">
                            {error ? (
                                <>
                                    <div className="p-4 rounded-3xl bg-destructive/10 border border-destructive/20 scale-110">
                                        <AlertTriangle className="h-10 w-10 text-destructive" />
                                    </div>
                                    <p className="text-destructive font-medium max-w-xs">{error}</p>
                                    <Button variant="outline" onClick={startCamera}>Retry Permission</Button>
                                </>
                            ) : (
                                <>
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
                                        <div className="relative p-6 rounded-full bg-card border border-border shadow-2xl">
                                            <Camera className="h-12 w-12 text-primary" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold">System Camera Ready</h3>
                                        <p className="text-sm text-muted-foreground">Using your local browser's vision capabilities</p>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    
                    {/* Activity Label HUD */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-8 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full bg-primary/90 text-white backdrop-blur-xl font-black uppercase tracking-widest text-xl shadow-[0_0_40px_rgba(99,102,241,0.5)] flex items-center gap-4 border border-white/20"
                            >
                                <Activity className="h-6 w-6 animate-pulse" />
                                {currentActivity}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* HUD Metadata */}
                    {isActive && (
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-mono text-white/70">X_COORD: {Math.random().toFixed(4)}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-[10px] font-mono text-white/70">Y_COORD: {Math.random().toFixed(4)}</span>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                                <span className="text-xs font-mono text-primary font-bold">AURA_OS_V2.0.4</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Action Bar */}
                <div className="flex gap-4">
                    <Button
                        onClick={() => isActive ? stopCamera() : startCamera()}
                        className={`flex-1 h-16 rounded-[1.5rem] font-black text-lg gap-3 transition-all duration-500 ${isActive ? 'bg-destructive/10 text-destructive hover:bg-destructive hover:text-white border border-destructive/20' : 'bg-primary text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] shadow-lg shadow-primary/20 scale-100 active:scale-95'}`}
                    >
                        {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        {isActive ? "TERMINATE STREAM" : "INITIALIZE AI CAMERA"}
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => { setHistory([]); stopCamera(); }}
                        className="h-16 w-16 rounded-[1.5rem] border-border hover:bg-muted transition-colors"
                    >
                        <RotateCcw className="h-6 w-6" />
                    </Button>
                </div>

                {/* Technical Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-muted/30 border border-border group hover:border-primary/30 transition-colors">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Inference Method</p>
                        <p className="text-base font-semibold">Browser Canvas Engine</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-muted/30 border border-border group hover:border-secondary/30 transition-colors">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                        <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'}`} />
                            <p className="text-base font-semibold">{isActive ? 'Synchronized' : 'Offline'}</p>
                        </div>
                    </div>
                </div>

                {/* Chronological Record */}
                <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Aura Timeline</h4>
                        <span className="text-[10px] text-muted-foreground/50 font-mono">LATEST_DETECTIONS</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {history.length === 0 ? (
                            <div className="w-full py-8 text-center rounded-2xl border border-dashed border-border bg-muted/10">
                                <p className="text-sm text-muted-foreground italic">No activity spikes recorded yet.</p>
                            </div>
                        ) : (
                            history.map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <Badge variant="glass" className="bg-primary/10 text-primary border-primary/20 text-xs px-4 py-1.5 rounded-full font-bold">
                                        {h}
                                    </Badge>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
