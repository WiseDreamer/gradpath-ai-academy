
import { RefObject, MutableRefObject } from 'react';

export type Tool = 'pen' | 'highlighter' | 'eraser' | 'none';
export type ThemeMode = 'light' | 'dark';

export type CanvasRefType = RefObject<HTMLCanvasElement>;
export type ContextRefType = MutableRefObject<CanvasRenderingContext2D | null>;
export type DrawingStateRefType = MutableRefObject<boolean>;

export interface BaseWhiteboardProps {
  themeMode: ThemeMode;
}

export interface TeachingStatusProps extends BaseWhiteboardProps {
  isPlaying: boolean;
  isHandRaised: boolean;
  toggleMic: () => void;
  isMicOn: boolean;
  setIsHandRaised: (value: boolean) => void;
  setIsPlaying: (value: boolean) => void;
}

export interface WhiteboardCanvasProps extends TeachingStatusProps {
  activeTool: Tool;
  penColor: string;
  highlighterColor: string;
  penSize: number;
  canvasRef: CanvasRefType;
  contextRef: ContextRefType;
  isDrawing: DrawingStateRefType;
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  finishDrawing: () => void;
}
