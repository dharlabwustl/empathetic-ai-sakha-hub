
export const LANGUAGE_OPTIONS = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'zh-CN', name: 'Chinese (Mandarin)' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'ar-SA', name: 'Arabic' }
];

export const VOICE_SPEED_OPTIONS = [
  { value: 0.5, label: 'Very Slow' },
  { value: 0.75, label: 'Slow' },
  { value: 1, label: 'Normal' },
  { value: 1.25, label: 'Fast' },
  { value: 1.5, label: 'Very Fast' }
];

export const VOICE_PITCH_OPTIONS = [
  { value: 0.5, label: 'Very Low' },
  { value: 0.75, label: 'Low' },
  { value: 1, label: 'Normal' },
  { value: 1.25, label: 'High' },
  { value: 1.5, label: 'Very High' }
];

export interface VoiceSettings {
  language: string;
  speed: number;
  pitch: number;
  volume: number;
  enabled: boolean;
}

export const defaultVoiceSettings: VoiceSettings = {
  language: 'en-US',
  speed: 1,
  pitch: 1,
  volume: 0.8,
  enabled: false
};

export const speakText = (text: string, settings: VoiceSettings = defaultVoiceSettings) => {
  if (!('speechSynthesis' in window) || !settings.enabled) {
    return;
  }

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = settings.language;
  utterance.rate = settings.speed;
  utterance.pitch = settings.pitch;
  utterance.volume = settings.volume;

  speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
};

export const getAvailableVoices = () => {
  if (!('speechSynthesis' in window)) {
    return [];
  }
  return speechSynthesis.getVoices();
};
