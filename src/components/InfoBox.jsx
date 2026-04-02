import React from 'react'

const InfoBox = () => {
    return (
        <div
            className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            data-testid="price-card"
        >
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-3"> Information XYZ (INR/g)</div>
            <div className="items-baseline gap-3">
                <div className="text-4xl sm:text-5xl font-light tracking-tighter text-zinc-950">
                    Information 1
                </div>
                <div className="text-4xl sm:text-5xl font-light tracking-tighter text-zinc-950">
                    Information 2
                </div>
                <div className="text-4xl sm:text-5xl font-light tracking-tighter text-zinc-950">
                    Information 3
                </div>



                <div
                    className={`flex items-center gap-1 text-sm font-medium`}
                >
                    Information 3
                    Information 4
                </div>
            </div>
            <div className="mt-2 text-sm text-zinc-500">24h change</div>
        </div>
    )
}

export default InfoBox