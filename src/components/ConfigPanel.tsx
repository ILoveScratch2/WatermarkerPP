import type { WatermarkConfig, Alignment } from '../types/watermark';
import './ConfigPanel.css';

interface Props {
  config: WatermarkConfig;
  onChange: (config: WatermarkConfig) => void;
  defaultWatermarkUrl: string;
}

export const ConfigPanel = ({ config, onChange, defaultWatermarkUrl }: Props) => {
  const update = (partial: Partial<WatermarkConfig>) => {
    onChange({ ...config, ...partial });
  };

  return (
    <div className="config-panel">
      <section>
        <label>类型</label>
        <select value={config.type} onChange={(e) => update({ type: e.target.value as 'text' | 'image' })}>
          <option value="text">文字</option>
          <option value="image">图片</option>
        </select>
      </section>

      {config.type === 'text' ? (
        <>
          <section>
            <label>文字内容</label>
            <input
              type="text"
              value={config.content}
              onChange={(e) => update({ content: e.target.value })}
              placeholder="输入水印文字"
            />
          </section>
          <section>
            <label>字体大小</label>
            <input
              type="range"
              min="12"
              max="200"
              value={config.fontSize}
              onChange={(e) => update({ fontSize: Number(e.target.value) })}
            />
            <span>{config.fontSize}px</span>
          </section>
          <section>
            <label>颜色</label>
            <input
              type="color"
              value={config.textColor}
              onChange={(e) => update({ textColor: e.target.value })}
            />
          </section>
        </>
      ) : (
        <>
          <section>
            <label>图片 URL</label>
            <input
              type="text"
              value={config.content}
              onChange={(e) => update({ content: e.target.value })}
              placeholder="输入图片 URL"
            />
            <button onClick={() => update({ content: defaultWatermarkUrl })}>
              使用默认
            </button>
          </section>
          <section>
            <label>缩放</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={config.scale}
              onChange={(e) => update({ scale: Number(e.target.value) })}
            />
            <span>{config.scale.toFixed(1)}x</span>
          </section>
        </>
      )}

      <section>
        <label>不透明度</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={config.opacity}
          onChange={(e) => update({ opacity: Number(e.target.value) })}
        />
        <span>{Math.round(config.opacity * 100)}%</span>
      </section>

      <section>
        <label>平铺</label>
        <input
          type="checkbox"
          checked={config.tiling.enabled}
          onChange={(e) => update({ tiling: { ...config.tiling, enabled: e.target.checked } })}
        />
      </section>

      {config.tiling.enabled && (
        <>
          <section>
            <label>水平间距</label>
            <input
              type="range"
              min="0"
              max="500"
              value={config.tiling.spacingX}
              onChange={(e) => update({ tiling: { ...config.tiling, spacingX: Number(e.target.value) } })}
            />
            <span>{config.tiling.spacingX}px</span>
          </section>
          <section>
            <label>垂直间距</label>
            <input
              type="range"
              min="0"
              max="500"
              value={config.tiling.spacingY}
              onChange={(e) => update({ tiling: { ...config.tiling, spacingY: Number(e.target.value) } })}
            />
            <span>{config.tiling.spacingY}px</span>
          </section>
        </>
      )}

      {!config.tiling.enabled && (
        <>
          <section>
            <label>对齐方式</label>
            <select value={config.alignment} onChange={(e) => update({ alignment: e.target.value as Alignment })}>
              <option value="top-left">左上</option>
              <option value="top-center">上中</option>
              <option value="top-right">右上</option>
              <option value="center-left">左中</option>
              <option value="center">居中</option>
              <option value="center-right">右中</option>
              <option value="bottom-left">左下</option>
              <option value="bottom-center">下中</option>
              <option value="bottom-right">右下</option>
            </select>
          </section>
          <section>
            <label>水平偏移</label>
            <input
              type="range"
              min="-500"
              max="500"
              value={config.x}
              onChange={(e) => update({ x: Number(e.target.value) })}
            />
            <span>{config.x}px</span>
          </section>
          <section>
            <label>垂直偏移</label>
            <input
              type="range"
              min="-500"
              max="500"
              value={config.y}
              onChange={(e) => update({ y: Number(e.target.value) })}
            />
            <span>{config.y}px</span>
          </section>
        </>
      )}
    </div>
  );
};
