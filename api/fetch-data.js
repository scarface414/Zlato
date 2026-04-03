import axios from "axios";
import { Redis } from '@upstash/redis';


export default async function handler(req, res) {

  const { targetSymbol } = req.query;
  const symbolName = targetSymbol === "XAU" ? "Gold" : "Silver";

  // Redis Cache Configurations
  const CACHE_KEY = `metal:${targetSymbol}:2`;
  const CACHE_DURATION = 3600; // 1 hour

  const redis = new Redis({
    url: process.env.Zlato_KV_REST_API_URL,
    token: process.env.Zlato_KV_REST_API_TOKEN,
  })

  const cachedData = await redis.get(CACHE_KEY);

  if (cachedData) {
    // console.log(`Fetching cachedData for ${sym} with key ${CACHE_KEY}`);
    return res.status(200).json(cachedData);
  }

  try {
    console.log(`Fetching ${symbolName} data from API...`);

    // If cache is expired
    // We fetch latest price data of [XAU, XAG] through the same API and update the cache.
    const config = {
      method: 'get',
      url: 'https://metals.g.apised.com/v1/market-data?symbols=XAU,XAG&base_currency=INR',
      headers: { 'x-api-key': 'sk_621c7259Bf1c901d1A2dbb55742b35F30a8470b9e5C917D7' }
    };

    const response = await axios.request(config);
    const apiData = response.data;

    const symbols = ["XAU", "XAG"];

    if (apiData.status === "success") {

      symbols.forEach(async (sym) => {
        const rawData = apiData.data.rates[sym];
        const timestamp = apiData.data.timestamp;

        if (rawData) {
          const CURRENT_CACHE_KEY = `metal:${sym}:2`;

          const { current, prev } = rawData;
          const change = (current - prev);

          const freshData = {
            ...rawData,
            metal: sym === "XAU" ? "Gold" : "Silver",
            timestamp: timestamp,
            change: change,
            changePercent: ((change / current) * 100),
            currentPriceINR: ((current / 31.1035) * 0.9999 * 1.03 * 1.06).toFixed(2),
            unit: "INR per gram"
          };

          // console.log(`Updating cache for ${sym} with key ${CURRENT_CACHE_KEY}`);
          await redis.set(CURRENT_CACHE_KEY, freshData, { ex: CACHE_DURATION });
        }
      });

      return res.status(200).json();
    }

    throw new Error("API responded with unsuccessful status");

  } catch (error) {

    console.error("Error details:", error.message);
    return res.status(500).json({ error: "API Failure", details: error.message });

  }
}
