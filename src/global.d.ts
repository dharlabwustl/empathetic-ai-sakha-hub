
// Add TypeScript declarations for Web Speech API and our global currentSpeech property
interface Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
  currentSpeech?: SpeechSynthesisUtterance;
}

// Declare the interface globally
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    currentSpeech?: SpeechSynthesisUtterance;
  }
}

export {};
