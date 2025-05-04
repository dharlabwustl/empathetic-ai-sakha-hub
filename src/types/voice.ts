
export interface VoiceSettings {
  enabled: boolean;
  muted: boolean;
  volume: number;
  rate: number;
  pitch: number;
  language: string;
  voiceURI: string;
  preferredVoice: string | null;
}

export interface LanguageOption {
  value: string;
  label: string;
}

export interface VoiceConfig {
  settings: VoiceSettings;
  updateSettings: (settings: Partial<VoiceSettings>) => void;
  toggleEnabled: () => void;
  toggleMute: (force?: boolean) => void;
  speakMessage: (message: string, force?: boolean) => void;
  isSupported: boolean;
  isSpeaking: boolean;
}

export interface VoiceAnnouncerProps {
  userName?: string;
  onPlayComplete?: () => void;
  welcomeMessage?: string;
  language?: string;
}
