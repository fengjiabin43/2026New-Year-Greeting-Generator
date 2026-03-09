
export type RecipientType = 'elder' | 'leader' | 'friend' | 'colleague' | 'junior' | 'customer' | 'other';

export interface GreetingConfig {
  recipient: RecipientType;
  style: 'traditional' | 'humorous' | 'poetic' | 'modern' | 'other';
  tone: 'warm' | 'formal' | 'brief';
  remarks?: string;
  customRecipient?: string;
  customStyle?: string;
}

export interface GeneratedGreeting {
  text: string;
  idioms: string[];
}
