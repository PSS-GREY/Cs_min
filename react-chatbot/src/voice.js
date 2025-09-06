// src/voice.js
class VoiceRecognition {
  constructor(onResult, onEnd) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser.");
      return null;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = "en-US";
    this.recognition.interimResults = false;

    this.recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onResult(text);
    };

    this.recognition.onend = () => {
      onEnd();
    };
  }

  start() {
    this.recognition?.start();
  }

  stop() {
    this.recognition?.stop();
  }
}

export default VoiceRecognition;
