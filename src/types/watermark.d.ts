export type WatermarkType = 'text' | 'image';

export type Alignment = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right'
  | 'center-left' 
  | 'center' 
  | 'center-right'
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

export interface TilingConfig {
  enabled: boolean;
  spacingX: number;
  spacingY: number;
  offsetX: number;
  offsetY: number;
}

export interface WatermarkConfig {
  type: WatermarkType;
  content: string;
  x: number;
  y: number;
  opacity: number;
  alignment: Alignment;
  tiling: TilingConfig;
  fontSize: number;
  textColor: string;
  scale: number;
  grayscale: boolean;
}

export interface SourceImage {
  url: string;
  width: number;
  height: number;
  element: HTMLImageElement;
}
