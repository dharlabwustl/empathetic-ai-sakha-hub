
export interface VoiceSettings {
  enabled: boolean;
  volume: number;
  rate: number;
  pitch: number;
  language: string;
  muted: boolean;
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  volume: 0.8,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-US',
  muted: false
};

export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'hi-IN', label: 'हिंदी (Hindi)' },
  { value: 'es-ES', label: 'Español (Spanish)' },
  { value: 'fr-FR', label: 'Français (French)' },
  { value: 'de-DE', label: 'Deutsch (German)' },
  { value: 'pt-BR', label: 'Português (Brazilian)' },
  { value: 'ru-RU', label: 'Русский (Russian)' }
];

export type SupportedLanguage = 'en-US' | 'en-GB' | 'hi-IN' | 'es-ES' | 'fr-FR' | 'de-DE' | 'pt-BR' | 'ru-RU';
