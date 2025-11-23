import { useState } from 'react';
import { loadImageFromFile, loadImageFromUrl } from '../utils/imageLoader';
import type { SourceImage } from '../types/watermark';
import './ImageUploader.css';

interface Props {
  onImageLoad: (image: SourceImage) => void;
}

export const ImageUploader = ({ onImageLoad }: Props) => {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    try {
      const img = await loadImageFromFile(file);
      onImageLoad({
        url: URL.createObjectURL(file),
        width: img.width,
        height: img.height,
        element: img,
      });
    } catch {
      setError('无法从文件加载图片');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlLoad = async () => {
    if (!urlInput.trim()) return;

    setLoading(true);
    setError('');
    try {
      const img = await loadImageFromUrl(urlInput);
      onImageLoad({
        url: urlInput,
        width: img.width,
        height: img.height,
        element: img,
      });
    } catch {
      setError('无法从 URL 加载图片');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-uploader">
      <div className="upload-section">
        <label className="file-upload-btn">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={loading}
          />
          上传图片
        </label>
      </div>
      
      <div className="url-section">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="或粘贴图片 URL"
          disabled={loading}
          onKeyDown={(e) => e.key === 'Enter' && handleUrlLoad()}
        />
        <button onClick={handleUrlLoad} disabled={loading || !urlInput.trim()}>
          加载
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">加载中...</div>}
    </div>
  );
};
