
export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', flag: '🇧🇷' }
];

export const formatTranscription = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getLanguageName = (code: string): string => {
  const language = LANGUAGE_OPTIONS.find(lang => lang.code === code);
  return language ? language.name : 'Unknown';
};
