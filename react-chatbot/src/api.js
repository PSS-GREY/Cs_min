
// api.js
export async function askGemini(query) {
  const API_KEY = "AIzaSyDZS7tBch_tpyj9imIAg_zIZZZ3bXLMH2A"; // replace with your Gemini API key
  const MODEL = "gemini-1.5-flash-latest"; // flash = fast/cheap, pro = more detailed

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Answer the following question in a clear, detailed paragraph (4–6 sentences). 
Provide useful medical insights, but avoid giving strict prescriptions. 
Here is the question:\n\n${query}`,
                },
              ],
            },
          ],
        }),
      }
    );

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


