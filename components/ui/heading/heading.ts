export const HEADING_LEVELS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
] as const;

export const HEADING_TAGS = [
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
] as const;

export type HeadingLevels = typeof HEADING_LEVELS[number];
export type HeadingTags = typeof HEADING_TAGS[number];

export interface IBaseHeading {
  level?: HeadingLevels;
  tag?: HeadingTags;
  weight?: 'bold' | 'medium' | 'light';
}
