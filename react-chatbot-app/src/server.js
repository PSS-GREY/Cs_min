// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/gemini", async (req, res) => {
  const { query } = req.body;
  const API_KEY = "AIzaSyDZS7tBch_tpyj9imIAg_zIZZZ3bXLMH2A";
  const MODEL = "models/gemini-1.5-flash";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: `Answer in 4–6 sentences: ${query}` }
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Could not reach Gemini service" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
