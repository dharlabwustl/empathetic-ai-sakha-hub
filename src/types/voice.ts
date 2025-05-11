
// Type definition for Voice Settings
export interface VoiceSettings {
  enabled: boolean;
  volume: number;
  rate: number;
  pitch: number;
  language: string;
  voice: SpeechSynthesisVoice | null;
  muted: boolean;
}
