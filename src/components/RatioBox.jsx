import React from 'react'
import {

    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const RatioBox = ({ratioData}) => {

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

    const getStatusText = (status) => {
        switch (status) {
            case "normal":
                return "Normal Ratio";
            case "gold_underpriced":
                return "Gold Underpriced";
            case "silver_underpriced":
                return "Silver Underpriced";
            default:
                return "Normal";
        }
    };

    const getGaugeData = (ratio) => {
        const maxRatio = 100;
        const percentage = (ratio / maxRatio) * 100;
        return [
            { name: "ratio", value: percentage, fill: ratioData ? getStatusColor(ratioData.ratio_status) : "#3B82F6" },
            { name: "empty", value: 100 - percentage, fill: "#E4E4E7" },
        ];
    };


    return (
        <div
            className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 md:col-span-2 lg:col-span-1"
            data-testid="ratio-gauge-card"
        >
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-3">CURRENT RATIO</div>
            <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                        <Pie
                            data={ratioData ? getGaugeData(ratioData.gold_silver_ratio) : []}
                            cx="50%"
                            cy="100%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                        >
                            {ratioData &&
                                getGaugeData(ratioData.gold_silver_ratio).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="text-3xl sm:text-4xl font-light tracking-tighter text-zinc-950 -mt-2">
                    {ratioData.gold_silver_ratio} : 1
                </div>


                <div
                    className="mt-2 px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                        backgroundColor: ratioData ? `${getStatusColor(ratioData.ratio_status)}20` : "#3B82F620",
                        color: ratioData ? getStatusColor(ratioData.ratio_status) : "#3B82F6",
                    }}
                    data-testid="ratio-status"
                >
                    {ratioData ? getStatusText(ratioData.ratio_status) : "Normal"}
                </div>
            </div>
        </div>
    )
}

export default RatioBox