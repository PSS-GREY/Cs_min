// api.js
export async function askGemini(query) {
  try {
    const res = await fetch("https://cs-min-1.onrender.com/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }), // sending { query: "..." } to Flask
    });

    const data = await res.json();
    console.log("Gemini raw response:", data);

    // ✅ Extract paragraph safely
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
