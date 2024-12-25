import type { SizeDefaultWithExtraSmall } from '~/assets/types/sizes';

export const TEXT_TAGS = [
  'div',
  'label',
  'li',
  'p',
  'span',
] as const;

export const TEXT_WEIGHTS = [
  'bold',
  'medium',
  'light',
] as const;

export type TextTags = typeof TEXT_TAGS[number];
export type TextWeights = typeof TEXT_WEIGHTS[number];

export interface IBaseText {
  fluid?: boolean;
  size?: SizeDefaultWithExtraSmall;
  tag?: TextTags;
  weight?: TextWeights;
}
