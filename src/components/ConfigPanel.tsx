import type { WatermarkConfig, Alignment } from '../types/watermark';
import { NumberSlider } from './NumberSlider';
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        update({ content: evt.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="config-panel">
      <section>
        <label>类型</label>
        <select value={config.type} onChange={(e) => update({ type: e.target.value as 'text' | 'image' })} aria-label="watermark type">
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
            <NumberSlider
              value={config.fontSize}
              onChange={(fontSize) => update({ fontSize })}
              min={12}
              max={200}
              step={1}
              suffix="px"
            />
          </section>
          <section>
            <label>颜色</label>
            <input
              type="color"
              value={config.textColor}
              onChange={(e) => update({ textColor: e.target.value })}
              aria-label="text color"
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
            <label>上传图片</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              aria-label="upload image"
            />
          </section>
          <section>
            <label>缩放</label>
            <NumberSlider
              value={config.scale}
              onChange={(scale) => update({ scale })}
              min={0.1}
              max={2}
              step={0.1}
              formatter={(v) => `${v.toFixed(1)}x`}
            />
          </section>
          <section>
            <label>黑白模式</label>
            <input
              type="checkbox"
              checked={config.grayscale}
              onChange={(e) => update({ grayscale: e.target.checked })}
              aria-label="grayscale mode"
            />
          </section>
        </>
      )}

      <section>
        <label>不透明度</label>
        <NumberSlider
          value={config.opacity}
          onChange={(opacity) => update({ opacity })}
          min={0}
          max={1}
          step={0.01}
          formatter={(v) => `${Math.round(v * 100)}%`}
        />
      </section>

      <section>
        <label>平铺</label>
        <input
          type="checkbox"
          checked={config.tiling.enabled}
          onChange={(e) => update({ tiling: { ...config.tiling, enabled: e.target.checked } })}
          aria-label="tiling mode"
        />
      </section>

      {config.tiling.enabled && (
        <>
          <section>
            <label>水平间距</label>
            <NumberSlider
              value={config.tiling.spacingX}
              onChange={(spacingX) => update({ tiling: { ...config.tiling, spacingX } })}
              min={0}
              max={500}
              step={1}
              suffix="px"
            />
          </section>
          <section>
            <label>垂直间距</label>
            <NumberSlider
              value={config.tiling.spacingY}
              onChange={(spacingY) => update({ tiling: { ...config.tiling, spacingY } })}
              min={0}
              max={500}
              step={1}
              suffix="px"
            />
          </section>
          <section>
            <label>水平偏移</label>
            <NumberSlider
              value={config.tiling.offsetX}
              onChange={(offsetX) => update({ tiling: { ...config.tiling, offsetX } })}
              min={-500}
              max={500}
              step={1}
              suffix="px"
            />
          </section>
          <section>
            <label>垂直偏移</label>
            <NumberSlider
              value={config.tiling.offsetY}
              onChange={(offsetY) => update({ tiling: { ...config.tiling, offsetY } })}
              min={-500}
              max={500}
              step={1}
              suffix="px"
            />
          </section>
        </>
      )}

      {!config.tiling.enabled && (
        <>
          <section>
            <label>对齐方式</label>
            <select value={config.alignment} onChange={(e) => update({ alignment: e.target.value as Alignment })} aria-label="alignment">
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
            <NumberSlider
              value={config.x}
              onChange={(x) => update({ x })}
              min={-500}
              max={500}
              step={1}
              suffix="px"
            />
          </section>
          <section>
            <label>垂直偏移</label>
            <NumberSlider
              value={config.y}
              onChange={(y) => update({ y })}
              min={-500}
              max={500}
              step={1}
              suffix="px"
            />
          </section>
        </>
      )}
    </div>
  );
};
