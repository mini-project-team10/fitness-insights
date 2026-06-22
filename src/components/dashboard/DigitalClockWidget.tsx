"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface TimeZoneClock {
    name: string;
    timezone: string;
    offset: string;
    city: string;
}

const timeZones: TimeZoneClock[] = [
    { name: "UTC", timezone: "UTC", offset: "UTC ±0", city: "Universal" },
    { name: "EST", timezone: "America/New_York", offset: "UTC -5", city: "New York" },
    { name: "CST", timezone: "America/Chicago", offset: "UTC -6", city: "Chicago" },
    { name: "PST", timezone: "America/Los_Angeles", offset: "UTC -8", city: "Los Angeles" },
    { name: "GMT", timezone: "Europe/London", offset: "UTC +0", city: "London" },
    { name: "CET", timezone: "Europe/Paris", offset: "UTC +1", city: "Paris" },
    { name: "IST", timezone: "Asia/Kolkata", offset: "UTC +5:30", city: "India" },
    { name: "SGT", timezone: "Asia/Singapore", offset: "UTC +8", city: "Singapore" },
    { name: "JST", timezone: "Asia/Tokyo", offset: "UTC +9", city: "Tokyo" },
    { name: "AEDT", timezone: "Australia/Sydney", offset: "UTC +11", city: "Sydney" },
];

interface ClockTime {
    hours: string;
    minutes: string;
    seconds: string;
}

export function DigitalClockWidget() {
    const [times, setTimes] = useState<Record<string, ClockTime>>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTimes = () => {
            const newTimes: Record<string, ClockTime> = {};
            
            timeZones.forEach((tz) => {
                const formatter = new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                    timeZone: tz.timezone,
                });

                const parts = formatter.formatToParts(new Date());
                const time = {
                    hours: parts.find((p) => p.type === "hour")?.value || "00",
                    minutes: parts.find((p) => p.type === "minute")?.value || "00",
                    seconds: parts.find((p) => p.type === "second")?.value || "00",
                };
                newTimes[tz.timezone] = time;
            });

            setTimes(newTimes);
        };

        updateTimes();
        const interval = setInterval(updateTimes, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full space-y-6 p-6 md:p-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-xl border border-primary/30 shadow-lg shadow-primary/20">
                        <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-white/95 to-white/85 bg-clip-text text-transparent">
                            World Clock
                        </h2>
                        <p className="text-sm text-white/60">Real-time across all time zones</p>
                    </div>
                </div>
            </div>

            {/* Main Clock Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {timeZones.map((tz, index) => {
                    const time = times[tz.timezone];
                    const baseColors = [
                        "from-primary/40 to-blue-600/40",
                        "from-orange-500/40 to-red-600/40",
                        "from-cyan-500/40 to-blue-500/40",
                        "from-emerald-500/40 to-teal-600/40",
                        "from-purple-500/40 to-pink-600/40",
                        "from-yellow-500/40 to-orange-600/40",
                        "from-pink-500/40 to-rose-600/40",
                        "from-indigo-500/40 to-purple-600/40",
                        "from-green-500/40 to-emerald-600/40",
                        "from-cyan-500/40 to-teal-600/40",
                    ];

                    const shadowColors = [
                        "shadow-primary/40",
                        "shadow-orange-500/40",
                        "shadow-cyan-500/40",
                        "shadow-emerald-500/40",
                        "shadow-purple-500/40",
                        "shadow-yellow-500/40",
                        "shadow-pink-500/40",
                        "shadow-indigo-500/40",
                        "shadow-green-500/40",
                        "shadow-cyan-500/40",
                    ];

                    const borderColors = [
                        "border-primary/40 hover:border-primary/70",
                        "border-orange-500/40 hover:border-orange-400/70",
                        "border-cyan-500/40 hover:border-cyan-400/70",
                        "border-emerald-500/40 hover:border-emerald-400/70",
                        "border-purple-500/40 hover:border-purple-400/70",
                        "border-yellow-500/40 hover:border-yellow-400/70",
                        "border-pink-500/40 hover:border-pink-400/70",
                        "border-indigo-500/40 hover:border-indigo-400/70",
                        "border-green-500/40 hover:border-green-400/70",
                        "border-cyan-500/40 hover:border-cyan-400/70",
                    ];

                    return (
                        <motion.div
                            key={tz.timezone}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className={`glass-effect border ${borderColors[index]} ${shadowColors[index]} shadow-xl transition-all duration-300 group overflow-hidden relative hover:shadow-2xl`}>
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${baseColors[index]} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />

                                {/* Content */}
                                <CardHeader className="pb-3 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg font-bold text-white/95">{tz.city}</CardTitle>
                                            <CardDescription className="text-xs text-white/60 mt-1">
                                                {tz.name} • {tz.offset}
                                            </CardDescription>
                                        </div>
                                        <Clock className="h-5 w-5 text-white/50 group-hover:text-white/80 transition-colors" />
                                    </div>
                                </CardHeader>

                                <CardContent className="relative z-10">
                                    {time ? (
                                        <div className="space-y-3">
                                            {/* Digital Display */}
                                            <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 font-mono text-center">
                                                <div className="text-4xl font-bold tracking-wider bg-gradient-to-r from-white via-white/95 to-white/85 bg-clip-text text-transparent drop-shadow-lg">
                                                    {time.hours}:{time.minutes}
                                                </div>
                                                <div className="text-sm text-white/60 mt-2 font-semibold">
                                                    {time.seconds}
                                                </div>
                                            </div>

                                            {/* Analog Clock Representation */}
                                            <div className="flex items-center justify-center">
                                                <div className="relative w-16 h-16 border-2 border-white/30 rounded-full bg-white/5">
                                                    {/* Center dot */}
                                                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/70 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />

                                                    {/* Hour hand */}
                                                    <div
                                                        className="absolute top-1/2 left-1/2 w-0.5 h-5 bg-white/70 origin-bottom transform -translate-x-1/2 -translate-y-1"
                                                        style={{
                                                            transform: `translate(-50%, -50%) rotate(${
                                                                ((parseInt(time.hours) % 12) * 30 + parseInt(time.minutes) * 0.5) % 360
                                                            }deg)`,
                                                        }}
                                                    />

                                                    {/* Minute hand */}
                                                    <div
                                                        className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-white/50 origin-bottom transform -translate-x-1/2 -translate-y-1"
                                                        style={{
                                                            transform: `translate(-50%, -50%) rotate(${
                                                                (parseInt(time.minutes) * 6 + parseInt(time.seconds) * 0.1) % 360
                                                            }deg)`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-white/50">Loading...</div>
                                    )}
                                </CardContent>

                                {/* Bottom Accent Line */}
                                <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${baseColors[index]}`} />
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Features Info */}
            <Card className="glass-effect border-white/10 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-lg">Features</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-white/70">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            Real-time updates every second
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                            Digital time display (24-hour format)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                            Analog clock representation
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                            10 major world time zones
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
