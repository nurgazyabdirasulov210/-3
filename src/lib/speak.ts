let voicesReady = false;

function ensureVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const load = () => {
    voicesReady = window.speechSynthesis.getVoices().length > 0;
  };
  load();
  window.speechSynthesis.addEventListener("voiceschanged", load, { once: true });
}

export function speakEnglish(text: string, rate = 0.92) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  ensureVoices();
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((voice) => voice.lang.startsWith("en-US") && /google|samantha|aria|jenny/i.test(voice.name)) ??
    voices.find((voice) => voice.lang.startsWith("en"));
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}
