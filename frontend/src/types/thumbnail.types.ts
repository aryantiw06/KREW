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

