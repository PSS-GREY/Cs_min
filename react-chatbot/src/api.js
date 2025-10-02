// api.js

// ✅ Ask Gemini via your Flask backend
export async function askGemini(query) {
  try {
    const res = await fetch("https://your-backend.onrender.com/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    console.log("Gemini API Response:", data);

    if (data.text) {
      return data.text; // Flask returns { "text": "..." }
    }
    if (data.error) {
      return `⚠️ Error: ${data.error}`;
    }

    return "⚠️ No response from Gemini.";
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "⚠️ Error: Could not reach Gemini service.";
  }
}


// ✅ Skin Disease Prediction
export async function predictSkinDisease(file) {
  try {
    let formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://your-backend.onrender.com/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Prediction API Response:", data);

    return data; // { res: "Melanoma", confidence: 0.95 }
  } catch (err) {
    console.error("Prediction API Error:", err);
    return { error: "⚠️ Could not analyze the image." };
  }
}