import React from 'react'
import { TrendingUp, TrendingDown } from "lucide-react";

const PriceBox = ({ priceData }) => {

  console.log("PriceBox Rendered with data:", priceData);

  return (
    <div
      className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      data-testid="price-card"
    >
      <div className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-3">{priceData?.metal} (INR/g)</div>
      <div className="flex items-baseline gap-3">
        <div className="text-4xl sm:text-5xl font-light tracking-tighter text-zinc-950">
          ₹{Number(priceData?.currentPriceINR).toFixed(2)}
        </div>
        {priceData?.changePercent !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${priceData.changePercent >= 0 ? "text-green-600" : "text-red-600"
              }`}
          >
            {priceData.changePercent >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {Math.abs(priceData.changePercent).toFixed(2)}%
          </div>
        )}
      </div>
      <div className="mt-2 text-sm text-zinc-500">
        24h change
        {priceData?.timestamp && <span> | Last Updated at : {priceData?.timestamp && new Date(priceData.timestamp).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })}</span>}
      </div>
    </div>
  )
}

export default PriceBox