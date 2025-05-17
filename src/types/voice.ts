
export interface VoiceSettings {
  volume: number;
  rate: number;
  pitch: number;
  language: string;
  enabled: boolean;
  muted: boolean;
  voice: SpeechSynthesisVoice | null;
  autoGreet?: boolean;
}
