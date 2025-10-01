// api.js
export async function askGemini(query) {
  try {
    const res = await fetch("http://localhost:5000/gemini", { // or deployed backend URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    // Extract Gemini text if available
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    if (data?.promptFeedback?.blockReason) {
      return `⚠️ Blocked: ${data.promptFeedback.blockReason}`;
    }

    return "⚠️ No response from Gemini.";
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "⚠️ Error: Could not reach Gemini service.";
  }
}
