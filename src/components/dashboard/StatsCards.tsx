import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Flame, Footprints, Timer, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export function StatsCards() {
    const stats = [
        {
            title: "Daily Steps",
            value: "8,432",
            trend: "+19%",
            icon: Footprints,
            color: "text-primary",
            bg: "bg-primary/15",
            borderColor: "hover:border-primary/70",
            shadowColor: "shadow-primary/40",
            glowColor: "from-primary/50"
        },
        {
            title: "Calories Burned",
            value: "640",
            trend: "+12%",
            icon: Flame,
            color: "text-orange-400",
            bg: "bg-orange-500/15",
            borderColor: "hover:border-orange-400/70",
            shadowColor: "shadow-orange-500/40",
            glowColor: "from-orange-400/50"
        },
        {
            title: "Active Time",
            value: "1h 24m",
            trend: "+8%",
            icon: Timer,
            color: "text-cyan-400",
            bg: "bg-cyan-500/15",
            borderColor: "hover:border-cyan-400/70",
            shadowColor: "shadow-cyan-500/40",
            glowColor: "from-cyan-400/50"
        },
        {
            title: "Body Recovery",
            value: "84%",
            trend: "Optimal",
            icon: Activity,
            color: "text-emerald-400",
            bg: "bg-emerald-500/15",
            borderColor: "hover:border-emerald-400/70",
            shadowColor: "shadow-emerald-500/40",
            glowColor: "from-emerald-400/50"
        }
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
                <Card key={i} className={`glass-effect border-white/20 ${stat.shadowColor} shadow-xl transition-all duration-300 group overflow-hidden relative hover:border-white/40 hover:shadow-2xl`}>
                    {/* Animated glow background */}
                    <div className={`absolute top-0 right-0 w-40 h-40 ${stat.bg} blur-3xl rounded-full translate-x-1/3 -translate-y-1/2 opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
                    
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-sm font-bold tracking-tight text-white/95 uppercase">{stat.title}</CardTitle>
                        <div className={`p-3 ${stat.bg} rounded-xl group-hover:scale-125 transition-all duration-300 ${stat.shadowColor} shadow-lg border border-white/20 group-hover:border-white/50`}>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-white via-white/95 to-white/85 bg-clip-text text-transparent drop-shadow-lg">{stat.value}</div>
                        <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
                            <TrendingUp className={`w-3 h-3 ${stat.color}`} />
                            <span className={stat.color}>{stat.trend}</span>
                            <span className="text-white/60 font-normal ml-1">vs yesterday</span>
                        </div>
                    </CardContent>
                    
                    {/* Bottom animated accent line */}
                    <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${stat.glowColor} to-transparent shadow-lg ${stat.shadowColor}`} />
                    
                    {/* Top left corner accent */}
                    <div className={`absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-br-full ${stat.bg}`} />
                </Card>
            ))}
        </div>
    )
}
