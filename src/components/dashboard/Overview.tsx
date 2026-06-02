"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    { name: "Mon", steps: 4000, calories: 240 },
    { name: "Tue", steps: 3000, calories: 139 },
    { name: "Wed", steps: 6000, calories: 380 },
    { name: "Thu", steps: 2780, calories: 190 },
    { name: "Fri", steps: 1890, calories: 120 },
    { name: "Sat", steps: 2390, calories: 150 },
    { name: "Sun", steps: 3490, calories: 230 },
]

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ borderRadius: '12px', background: 'rgba(24, 24, 27, 0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                />
                <Bar
                    dataKey="steps"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
                <Bar
                    dataKey="calories"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-secondary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
