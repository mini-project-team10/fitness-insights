"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const performanceData = [
    { name: "SVM", accuracy: 94.2, f1: 93.8, color: "hsl(var(--primary))" },
    { name: "Random Forest", accuracy: 92.5, f1: 91.9, color: "#10b981" },
    { name: "KNN", accuracy: 89.4, f1: 88.6, color: "#3b82f6" },
    { name: "Log. Regression", accuracy: 88.1, f1: 87.5, color: "#f59e0b" },
    { name: "CNN (DL)", accuracy: 96.8, f1: 96.5, color: "#8b5cf6" },
]

export function AlgorithmPerformance() {
    return (
        <Card className="border-white/5 bg-white/[0.02] backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Model Comparison</CardTitle>
                <CardDescription>
                    Performance accuracy (%) of different ML models on the UCI HAR dataset.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                domain={[0, 100]}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{
                                    borderRadius: '12px',
                                    background: 'rgba(24, 24, 27, 0.9)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff',
                                    fontSize: '12px'
                                }}
                            />
                            <Bar
                                dataKey="accuracy"
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                            >
                                {performanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6">
                    {performanceData.map((model) => (
                        <div key={model.name} className="space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{model.name}</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-white">{model.accuracy}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{ width: `${model.accuracy}%`, backgroundColor: model.color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
