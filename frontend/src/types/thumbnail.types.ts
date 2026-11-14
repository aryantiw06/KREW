export interface ThumbnailConcept {
  id: string;
  projectId: string;
  title: string;
  conceptDescription: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  headlineText: string;
  colorGrading: string;
  expressionStyle: string;
  estimatedClickReadability: number; // 0-100 score (illustrative)
  brandConsistencyScore: number; // 0-100 score (illustrative)
  previewImageUrl: string;
  variationName: string; // e.g. "Variant A: High Contrast Provocative"
  isSelected: boolean;
}

export type ThumbnailAspectRatio = '16:9' | '9:16' | '1:1';
export type ThumbnailTextRole = 'headline' | 'subtitle' | 'custom';
export type ThumbnailTextAlignment = 'left' | 'center' | 'right';

export interface ThumbnailTextLayer {
  id: string;
  role: ThumbnailTextRole;
  text: string;
  x: number;
  y: number;
  width: number;
  fontSize: number;
  color: string;
  align: ThumbnailTextAlignment;
  fontFamily: string;
  bold: boolean;
  visible: boolean;
  order: number;
}

export interface ThumbnailVersion {
  id: string;
  name: string;
  aspectRatio: ThumbnailAspectRatio;
  backgroundColor: string;
  backgroundAssetName: string;
  textLayers: ThumbnailTextLayer[];
  createdAt: string;
  updatedAt: string;
}

export interface ThumbnailWorkspaceData {
  activeVersionId: string;
  versions: ThumbnailVersion[];
  brandColors: { primary: string; secondary: string; accent: string };
}

