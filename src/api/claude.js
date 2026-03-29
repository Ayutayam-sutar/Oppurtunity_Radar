export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function streamPortfolioAnalysis(question, portfolio, signals, onChunk, onComplete) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/analyze`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream' 
      },
      body: JSON.stringify({ question, portfolio, signals })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let currentText = '';
    let buffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (line.trim().startsWith('data: ')) {
          try {
            
            const jsonString = line.replace(/^data:\s*/, '').trim();
            
            
            if (jsonString === '[DONE]') break;

            const data = JSON.parse(jsonString);
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
    onComplete("⚠️ Unable to connect to backend AI services. Our servers are currently waking up. Please try again in 30 seconds.");
  }
}