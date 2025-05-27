
// Centralized voice configuration for consistent female voice across the app

export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice?: SpeechSynthesisVoice;
}

export const getPreferredFemaleVoice = (): SpeechSynthesisVoice | null => {
  if (!('speechSynthesis' in window)) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // Priority order for female voices
  const femaleVoicePreferences = [
    'Google US English Female',
    'Microsoft Zira Desktop',
    'Samantha',
    'Victoria',
    'Karen',
    'Moira',
    'Tessa',
    'Fiona'
  ];
  
  // First try to find exact matches
  for (const preference of femaleVoicePreferences) {
    const voice = voices.find(v => v.name.includes(preference));
    if (voice) return voice;
  }
  
  // Then try to find any female voice
  const femaleVoice = voices.find(v => 
    v.name.toLowerCase().includes('female') ||
    v.name.toLowerCase().includes('woman') ||
    (!v.name.toLowerCase().includes('male') && v.lang.includes('en'))
  );
  
  return femaleVoice || voices[0] || null;
};

export const speakWithFemaleVoice = (
  text: string,
  settings: Partial<VoiceSettings> = {},
  onStart?: () => void,
  onEnd?: () => void
) => {
  if (!('speechSynthesis' in window)) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Fix pronunciation of PREPZR
  const correctedText = text
    .replace(/PREPZR/gi, 'PREP-ZR')
    .replace(/Prepzr/g, 'PREP-ZR')
    .replace(/prepzr/gi, 'prep-zr')
    .replace(/Sakha/gi, 'PREPZR');
  
  const utterance = new SpeechSynthesisUtterance(correctedText);
  
  // Apply female voice
  const femaleVoice = getPreferredFemaleVoice();
  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }
  
  // Apply settings with defaults optimized for female voice
  utterance.rate = settings.rate || 0.9;
  utterance.pitch = settings.pitch || 1.1;
  utterance.volume = settings.volume || 0.8;
  utterance.lang = 'en-US';
  
  // Set event handlers
  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  
  // Speak
  window.speechSynthesis.speak(utterance);
};
