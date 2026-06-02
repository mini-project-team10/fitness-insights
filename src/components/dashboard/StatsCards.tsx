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
            bg: "bg-primary/10",
            borderColor: "hover:border-primary/50"
        },
        {
            title: "Calories Burned",
            value: "640",
            trend: "+12%",
            icon: Flame,
            color: "text-accent",
            bg: "bg-accent/10",
            borderColor: "hover:border-accent/50"
        },
        {
            title: "Active Time",
            value: "1h 24m",
            trend: "+8%",
            icon: Timer,
            color: "text-secondary",
            bg: "bg-secondary/10",
            borderColor: "hover:border-secondary/50"
        },
        {
            title: "Body Recovery",
            value: "84%",
            trend: "Optimal",
            icon: Activity,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            borderColor: "hover:border-emerald-500/50"
        }
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
                <Card key={i} className={`glass-effect border-none shadow-lg transition-all duration-300 group overflow-hidden relative`}>
                    <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity`} />
                    
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold tracking-tight text-muted-foreground uppercase">{stat.title}</CardTitle>
                        <div className={`p-2 ${stat.bg} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tighter">{stat.value}</div>
                        <div className="flex items-center gap-1 mt-1 text-xs font-semibold">
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">{stat.trend}</span>
                            <span className="text-muted-foreground/60 font-normal ml-1">vs yesterday</span>
                        </div>
                    </CardContent>
                    
                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ${stat.bg.replace('/10', '')}`} />
                </Card>
            ))}
        </div>
    )
}
