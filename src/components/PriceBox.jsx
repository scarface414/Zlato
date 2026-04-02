import React from 'react'
import { TrendingUp, TrendingDown } from "lucide-react";

const PriceBox = ({priceData}) => {

    return (
          <div
            className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            data-testid="price-card"
          >
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-3">{priceData?.metal} (INR/g)</div>
            <div className="flex items-baseline gap-3">
              <div className="text-4xl sm:text-5xl font-light tracking-tighter text-zinc-950">
                ₹{priceData?.price_inr.toLocaleString()}
              </div>
              {priceData?.change_24h !== undefined && (
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    priceData.change_24h >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {priceData.change_24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {Math.abs(priceData.change_24h)}%
                </div>
              )}
            </div>
            <div className="mt-2 text-sm text-zinc-500">24h change</div>
          </div>
    )
}

export default PriceBox