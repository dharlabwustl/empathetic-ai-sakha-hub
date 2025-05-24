
export interface VoiceSettings {
  enabled: boolean;
  language: string;
  speed: number;
  pitch: number;
  volume: number;
  voice: string;
}

export type SupportedLanguage = 'en-US' | 'en-GB' | 'es-ES' | 'fr-FR' | 'de-DE' | 'it-IT' | 'pt-BR' | 'ja-JP' | 'ko-KR' | 'zh-CN';

export const supportedLanguages: { code: SupportedLanguage; name: string }[] = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' }
];

export const getVoiceSettings = (): VoiceSettings => {
  const stored = localStorage.getItem('voiceSettings');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    enabled: false,
    language: 'en-US',
    speed: 1,
    pitch: 1,
    volume: 0.8,
    voice: 'default'
  };
};

export const saveVoiceSettings = (settings: VoiceSettings): void => {
  localStorage.setItem('voiceSettings', JSON.stringify(settings));
};
