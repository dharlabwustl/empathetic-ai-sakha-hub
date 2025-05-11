
export interface VoiceSettings {
  enabled: boolean;
  muted: boolean;
  volume: number;
  rate: number;
  pitch: number;
  language: string;
}

export interface VoiceTheme {
  name: string;
  description: string;
  settings: VoiceSettings;
}
