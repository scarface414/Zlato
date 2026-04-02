import React, { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const HistoricalChart = ({priceData}) => {

    const mockHistoricalData = [
  { date: "2026-03-01", ratio: 78 },
  { date: "2026-03-02", ratio: 80 },
  { date: "2026-03-03", ratio: 79 },
  { date: "2026-03-04", ratio: 81 },
  { date: "2026-03-05", ratio: 77 },
  { date: "2026-03-06", ratio: 82 },
  { date: "2026-03-07", ratio: 84 },
];

    const [selectedRange, setSelectedRange] = useState("30");

    // const fetchHistoricalData = async (days) => {
    //     try {
    //         const response = await axios.get(`${API}/historical?days=${days}`);
    //         setHistoricalData(response.data.data);
    //     } catch (error) {
    //         console.error("Error fetching historical data:", error);
    //     }
    // };

    // useEffect(() => {
    //     const loadData = async () => {
    //         setLoading(true);
    //         await fetchPrices();
    //         await fetchHistoricalData(parseInt(selectedRange));
    //         setLoading(false);
    //     };
    //     loadData();
    // }, [selectedRange]);

    const getStatusColor = (status) => {
        switch (status) {
            case "normal":
                return "#3B82F6";
            case "gold_underpriced":
                return "#10B981";
            case "silver_underpriced":
                return "#EF4444";
            default:
                return "#3B82F6";
        }
    };

    return (
        <div
            className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6"
            data-testid="historical-chart-card"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-outfit font-medium tracking-tight text-zinc-900">
                        Historical Gold:Silver Ratio
                    </h2>
                    <p className="text-sm text-zinc-500 mt-1">Track ratio trends over time</p>
                </div>
                <Tabs value={selectedRange} onValueChange={setSelectedRange} data-testid="date-range-selector">
                    <TabsList className="bg-zinc-100">
                        <TabsTrigger value="7" data-testid="range-7d">7D</TabsTrigger>
                        <TabsTrigger value="30" data-testid="range-30d">30D</TabsTrigger>
                        <TabsTrigger value="90" data-testid="range-90d">90D</TabsTrigger>
                        <TabsTrigger value="365" data-testid="range-365d">1Y</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={mockHistoricalData}>
                    <defs>
                        <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor={priceData ? getStatusColor(priceData.ratio_status) : "#3B82F6"}
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor={priceData ? getStatusColor(priceData.ratio_status) : "#3B82F6"}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
                    <XAxis
                        dataKey="date"
                        stroke="#71717A"
                        fontSize={12}
                        tickFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                    />
                    <YAxis stroke="#71717A" fontSize={12} domain={["dataMin - 5", "dataMax + 5"]} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #E4E4E7",
                            borderRadius: "8px",
                            fontSize: "14px",
                        }}
                        formatter={(value) => [`${value}:1`, "Ratio"]}
                    />
                    <Area
                        type="monotone"
                        dataKey="ratio"
                        stroke={priceData ? getStatusColor(priceData.ratio_status) : "#3B82F6"}
                        strokeWidth={2}
                        fill="url(#colorRatio)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default HistoricalChart