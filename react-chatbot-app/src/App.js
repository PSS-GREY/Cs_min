import React, { useState } from "react";
import { searchKnowledgeBase } from "./kb"; 
import { askGemini } from "./api"; 

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm SkinCare AI. Ask me about skin diseases." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const kbAnswer = searchKnowledgeBase(input);
    if (kbAnswer) {
      setMessages((prev) => [...prev, { sender: "bot", text: kbAnswer }]);
      setInput("");
      return;
    }

    const aiResponse = await askGemini(input);
    setMessages((prev) => [...prev, { sender: "bot", text: aiResponse }]);
    setInput("");
  };

  // ✅ Here is the gradient + chat UI
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-teal-400 to-green-400">
      <div className="w-full max-w-3xl bg-white/90 shadow-2xl rounded-2xl p-6 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
          🧴 Skin Disease Detection Helper
        </h1>
        <p className="text-gray-600 mb-4">
          ⚠️ Remember: I’m not a doctor. Always consult a professional for medical advice.
        </p>

        {/* Chat Window */}
        <div className="h-96 overflow-y-auto border rounded-xl p-4 bg-gray-50/80">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-2xl whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about skin diseases..."
            className="flex-1 border px-4 py-2 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-6 py-2 rounded-r-xl hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App; // ✅ only one export, at the very bottom
