import type { WatermarkConfig, SourceImage, Alignment } from '../types/watermark';

const calculatePosition = (
  alignment: Alignment,
  x: number,
  y: number,
  canvasWidth: number,
  canvasHeight: number,
  watermarkWidth: number,
  watermarkHeight: number
): { x: number; y: number } => {
  const alignments: Record<Alignment, { x: number; y: number }> = {
    'top-left': { x, y },
    'top-center': { x: canvasWidth / 2 - watermarkWidth / 2 + x, y },
    'top-right': { x: canvasWidth - watermarkWidth - x, y },
    'center-left': { x, y: canvasHeight / 2 - watermarkHeight / 2 + y },
    'center': { 
      x: canvasWidth / 2 - watermarkWidth / 2 + x, 
      y: canvasHeight / 2 - watermarkHeight / 2 + y 
    },
    'center-right': { 
      x: canvasWidth - watermarkWidth - x, 
      y: canvasHeight / 2 - watermarkHeight / 2 + y 
    },
    'bottom-left': { x, y: canvasHeight - watermarkHeight - y },
    'bottom-center': { 
      x: canvasWidth / 2 - watermarkWidth / 2 + x, 
      y: canvasHeight - watermarkHeight - y 
    },
    'bottom-right': { 
      x: canvasWidth - watermarkWidth - x, 
      y: canvasHeight - watermarkHeight - y 
    },
  };
  return alignments[alignment];
};

export const renderWatermark = async (
  canvas: HTMLCanvasElement,
  sourceImage: SourceImage,
  config: WatermarkConfig
): Promise<void> => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = sourceImage.width;
  canvas.height = sourceImage.height;

  ctx.drawImage(sourceImage.element, 0, 0);
  ctx.globalAlpha = config.opacity;

  if (config.type === 'text') {
    ctx.font = `${config.fontSize}px sans-serif`;
    const metrics = ctx.measureText(config.content);
    const textWidth = metrics.width;
    const textHeight = config.fontSize;
    ctx.fillStyle = config.textColor;

    if (config.tiling.enabled) {
      for (let x = 0; x < canvas.width; x += textWidth + config.tiling.spacingX) {
        for (let y = 0; y < canvas.height; y += textHeight + config.tiling.spacingY) {
          ctx.fillText(config.content, x, y + textHeight);
        }
      }
    } else {
      const pos = calculatePosition(
        config.alignment,
        config.x,
        config.y,
        canvas.width,
        canvas.height,
        textWidth,
        textHeight
      );
      ctx.fillText(config.content, pos.x, pos.y + textHeight);
    }
  } else {
    const watermarkImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = 'anonymous';
      img.src = config.content;
    });

    const scaledWidth = watermarkImg.width * config.scale;
    const scaledHeight = watermarkImg.height * config.scale;

    if (config.tiling.enabled) {
      for (let x = 0; x < canvas.width; x += scaledWidth + config.tiling.spacingX) {
        for (let y = 0; y < canvas.height; y += scaledHeight + config.tiling.spacingY) {
          ctx.drawImage(watermarkImg, x, y, scaledWidth, scaledHeight);
        }
      }
    } else {
      const pos = calculatePosition(
        config.alignment,
        config.x,
        config.y,
        canvas.width,
        canvas.height,
        scaledWidth,
        scaledHeight
      );
      ctx.drawImage(watermarkImg, pos.x, pos.y, scaledWidth, scaledHeight);
    }
  }

  ctx.globalAlpha = 1;
};

export const exportCanvas = (canvas: HTMLCanvasElement, filename: string): void => {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  });
};
