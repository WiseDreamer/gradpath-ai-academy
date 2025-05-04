
export interface TutorMessageType {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: AttachmentType[];
}

export interface AttachmentType {
  id: string;
  type: 'image' | 'pdf' | 'doc';
  name: string;
  url: string;
}

export type AnnotationTool = 'pen' | 'highlighter' | 'eraser' | 'text' | 'none';

export interface AnnotationPoint {
  x: number;
  y: number;
}

export interface Annotation {
  id: string;
  tool: AnnotationTool;
  color: string;
  size: number;
  page: number;
  points: AnnotationPoint[];
}

export interface VirtualClassSettings {
  annotationFrequency: 'minimal' | 'normal' | 'detailed';
  voiceSpeed: 'slow' | 'normal' | 'fast';
  displayMode: 'light' | 'dark';
  communicationMode: 'voice-and-text' | 'text-only' | 'voice-only';
}
