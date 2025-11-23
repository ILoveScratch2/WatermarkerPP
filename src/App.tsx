import { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ConfigPanel } from './components/ConfigPanel';
import { WatermarkCanvas } from './components/WatermarkCanvas';
import { exportCanvas } from './utils/watermarkRenderer';
import type { WatermarkConfig, SourceImage } from './types/watermark';
import './App.css';

const DEFAULT_WATERMARK_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+V0FURVJNQVJLPC90ZXh0Pjwvc3ZnPg==';

const INITIAL_CONFIG: WatermarkConfig = {
  type: 'text',
  content: '水印',
  x: 0,
  y: 0,
  opacity: 0.5,
  alignment: 'center',
  tiling: {
    enabled: false,
    spacingX: 100,
    spacingY: 100,
  },
  fontSize: 48,
  textColor: '#000000',
  scale: 1,
};

function App() {
  const [sourceImage, setSourceImage] = useState<SourceImage | null>(null);
  const [config, setConfig] = useState<WatermarkConfig>(INITIAL_CONFIG);

  const handleExport = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    exportCanvas(canvas, 'watermarked-image.png');
  };

  return (
    <div className="app">
      <header>
        <h1>Watermarker++</h1>
      </header>
      
      <main>
        <aside className="sidebar">
          <ImageUploader onImageLoad={setSourceImage} />
          <ConfigPanel 
            config={config} 
            onChange={setConfig}
            defaultWatermarkUrl={DEFAULT_WATERMARK_URL}
          />
          <button 
            className="export-btn" 
            onClick={handleExport}
            disabled={!sourceImage}
          >
            导出图片
          </button>
        </aside>

        <section className="preview">
          <WatermarkCanvas sourceImage={sourceImage} config={config} />
        </section>
      </main>
    </div>
  );
}

export default App;
