// --- HACKATHON DEPLOYMENT FIX ---
// Points to your Python FastAPI Backend on Render
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function streamPortfolioAnalysis(question, portfolio, signals, onChunk, onComplete) {
  try {
    // UPDATED: Now uses the full Render URL
    const response = await fetch(`${API_BASE_URL}/api/ai/analyze`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // HACKATHON TIP: Some proxies block SSE unless this header is present
        'Accept': 'text/event-stream' 
      },
      body: JSON.stringify({ question, portfolio, signals })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    // Ensure the browser handles the stream correctly
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let currentText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      
      // SSE chunks are usually separated by double newlines
      const lines = buffer.split('\n\n');
      
      // Keep the last incomplete chunk in the buffer for the next iteration
      buffer = lines.pop();

      for (const line of lines) {
        // Render/FastAPI might send "data: " followed by your JSON
        if (line.trim().startsWith('data: ')) {
          try {
            // Remove 'data: ' prefix and parse
            const jsonString = line.replace(/^data:\s*/, '').trim();
            
            // Check for [DONE] signal often used in streaming APIs
            if (jsonString === '[DONE]') break;

            const data = JSON.parse(jsonString);
            
            // Handle different potential JSON shapes from your Python backend
            const newText = data.text || data.choices?.[0]?.delta?.content || data.message || '';
            
            if (newText) {
              currentText += newText;
              onChunk(currentText);
            }
          } catch (e) {
            console.error('SSE parse error on line:', line, e);
          }
        }
      }
    }

    onComplete(currentText);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    // Preserved your team's error handling
    onComplete("⚠️ Unable to connect to backend AI services. Our servers are currently waking up. Please try again in 30 seconds.");
  }
}