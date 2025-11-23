import { useEffect, useRef } from 'react';
import type { WatermarkConfig, SourceImage } from '../types/watermark';
import { renderWatermark } from '../utils/watermarkRenderer';
import './WatermarkCanvas.css';

interface Props {
  sourceImage: SourceImage | null;
  config: WatermarkConfig;
}

export const WatermarkCanvas = ({ sourceImage, config }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !sourceImage) return;
    renderWatermark(canvasRef.current, sourceImage, config);
  }, [sourceImage, config]);

  if (!sourceImage) {
    return (
      <div className="watermark-canvas-placeholder">
        上传图片以开始
      </div>
    );
  }

  return (
    <div className="watermark-canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};
