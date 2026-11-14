import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { ThumbnailVersion } from '../../types/thumbnail.types';

interface ThumbnailCanvasProps {
  version: ThumbnailVersion;
  imageUrl?: string;
  brandColors: { primary: string; secondary: string; accent: string };
  selectedLayerId?: string;
  onSelectLayer?: (id: string) => void;
  compact?: boolean;
}

export const ThumbnailCanvas: React.FC<ThumbnailCanvasProps> = ({ version, imageUrl, brandColors, selectedLayerId, onSelectLayer, compact = false }) => {
  const hasText = version.textLayers.some(layer => layer.visible && layer.text.trim());
  return <div className="relative isolate w-full overflow-hidden bg-black" style={{ aspectRatio: version.aspectRatio.replace(':', ' / '), containerType: 'inline-size', backgroundColor: version.backgroundColor }}>
    {imageUrl ? <img src={imageUrl} alt="User-selected local thumbnail image" className="absolute inset-0 h-full w-full object-cover" /> : <div aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 78% 18%, ${brandColors.accent}30, transparent 43%), linear-gradient(135deg, ${version.backgroundColor}, ${brandColors.secondary})` }} />}
    {!imageUrl && !hasText && !compact && <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/10 px-5 text-center"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] text-krew-text-secondary"><ImageIcon className="h-5 w-5" /></span><p className="font-display text-sm font-medium text-white/85">Your composition starts here</p><p className="max-w-xs text-[10px] leading-relaxed text-white/55">Add a local image or build a text-led design. Nothing has been generated.</p></div>}
    {!imageUrl && version.backgroundAssetName && <span className={`absolute left-3 top-3 z-20 max-w-[75%] truncate rounded-md bg-black/55 px-2 py-1 font-mono text-[8px] text-white/80 ${compact ? 'text-[7px]' : ''}`}>LOCAL IMAGE NOT LOADED · {version.backgroundAssetName}</span>}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,.12),transparent 30%,rgba(0,0,0,.16))' }} />
    {version.textLayers.filter(layer => layer.visible && layer.text.trim()).slice().sort((a, b) => a.order - b.order).map(layer => {
      const style: React.CSSProperties = { left: `${layer.x}%`, top: `${layer.y}%`, width: `${layer.width}%`, zIndex: layer.order + 2, color: layer.color, textAlign: layer.align, fontFamily: `${layer.fontFamily}, Inter, sans-serif`, fontSize: `max(10px, ${layer.fontSize / 12}cqw)`, fontWeight: layer.bold ? 700 : 400, textShadow: '0 2px 12px rgba(0,0,0,.65)' };
      return compact ? <div key={layer.id} className="absolute whitespace-pre-wrap break-words leading-[1.02]" style={style}>{layer.text}</div> : <button key={layer.id} type="button" aria-label={`Select ${layer.role} text layer`} onClick={() => onSelectLayer?.(layer.id)} className={`absolute whitespace-pre-wrap break-words leading-[1.02] ${selectedLayerId === layer.id ? 'outline outline-1 outline-dashed outline-krew-cyan/90 outline-offset-2' : ''}`} style={style}>{layer.text}</button>;
    })}
    {!compact && <span className="pointer-events-none absolute right-3 top-3 z-30 rounded-md bg-black/50 px-2 py-1 font-mono text-[9px] text-white/75">{version.aspectRatio}</span>}
  </div>;
};
