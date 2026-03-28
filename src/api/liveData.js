// --- HACKATHON DEPLOYMENT FIX ---
// Uses the Render URL from Netlify Environment Variables
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getNiftyLive() {
  try {
    // UPDATED: Now points to the full Render Backend URL
    const resp = await fetch(`${API_BASE_URL}/api/market/indices`, { 
      signal: AbortSignal.timeout(15000) 
    });
    
    if (!resp.ok) throw new Error(`Market API returned status ${resp.status}`);
    
    const data = await resp.json();
    
    console.log(`[LiveData] Fetched real market indices from ${API_BASE_URL}`);
    
    // We handle potential nesting differences between local and production data
    const nifty = data.nifty || data;
    const sensex = data.sensex || data;

    return {
      value: nifty.value,
      change: nifty.change,
      pctChange: nifty.pctChange,
      open: nifty.open,
      high: nifty.high,
      low: nifty.low,
      sensex: sensex.value,
      sensexChange: sensex.change,
      sensexPct: sensex.pctChange,
    };
  } catch (error) {
    console.warn("Falling back to Nifty 50 mock data due to API failure:", error.message);
    
    // TEAM'S ORIGINAL MOCK DATA (PRESERVED)
    return {
      value: 22847.45,
      change: 124.30,
      pctChange: 0.55,
      open: 22750.10,
      high: 22865.20,
      low: 22720.50,
      sensex: 75210,
      sensexChange: 350,
      sensexPct: 0.47,
    };
  }
}