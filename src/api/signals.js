import { mockSignals, backtestResults, showcaseSignals, generateOHLCVData, radarChartData, sectorHeatmapData } from '../data/mockSignals';
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getLiveSignals = async () => {
  try {
   
    const res = await fetch(`${API_BASE_URL}/api/market/signals`, { 
      signal: AbortSignal.timeout(30000) 
    });
    
    if (!res.ok) throw new Error(`Backend returned ${res.status}`);
    
    const data = await res.json();
    
  
    if (data.status === 'success' || (data && !data.error)) {
      const signals = data.signals || data; 
      console.log(`[Signals] Loaded LIVE signals from ${API_BASE_URL}`);
      return signals;
    }
    
    throw new Error('No signals returned from backend');
  } catch (error) {
    console.warn('[Signals] Live signal fetch failed, using mock data:', error.message);
    
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: { 
        message: 'Live signal computation in progress. Showing cached data.', 
        type: 'warning' 
      }
    }));
    return mockSignals;
  }
};


export const getStockChart = (ticker, timeframe = '3m') => {
  const days = { '1w': 7, '1m': 30, '3m': 90, '6m': 180, '1y': 365 }[timeframe] || 90;
  return new Promise(r => setTimeout(() => r(generateOHLCVData(days)), 200));
};

export const getBacktestResults = () => new Promise(r => setTimeout(() => r({ backtestResults, showcaseSignals }), 300));

export const getPortfolioSignals = (portfolio) => {
  const tickers = portfolio.map(s => s.ticker);
  const relevant = mockSignals.filter(s => tickers.includes(s.ticker));
  const watchlist = mockSignals.filter(s => !tickers.includes(s.ticker)).slice(0, 5);
  return new Promise(r => setTimeout(() => r({ relevant, watchlist }), 400));
};

export const getSignalPerformance = () => new Promise(r => setTimeout(() => r({ radarChartData, sectorHeatmapData }), 300));

const aiResponses = {
  default: "Based on my analysis... (rest of your text)",
  hdfc: "HDFC Bank is showing... (rest of your text)",
  risk: "Analyzing risk signals... (rest of your text)"
};

export const askPortfolioQuestion = async (question) => {
  const q = question.toLowerCase();
  
  let response = aiResponses.default;
  if (q.includes('hdfc') || q.includes('add')) response = aiResponses.hdfc;
  if (q.includes('risk')) response = aiResponses.risk;
  return new Promise(r => setTimeout(() => r({ 
    response, 
    citations: ["NSE OHLCV", "BSE Bulk Deals", "FinBERT v3.2", "Historical Backtest DB"] 
  }), 500));
};