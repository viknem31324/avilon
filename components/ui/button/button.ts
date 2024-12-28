import type { Icon } from '../icon/icon';
import type { SizeDefault } from '~/assets/types/sizes';

export const BUTTON_TAGS = [
  'div',
  'a',
  'button',
] as const;

export const BUTTON_TYPES = ['submit', 'button', 'reset'] as const;

export const BUTTON_VARIANTS = {
  ACCENT: 'accent',
  DANGER: 'danger',
  GHOST: 'ghost',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SECONDARY_INVERSE: 'secondary-inverse',
  TERTIARY: 'tertiary',
} as const;

export const BUTTON_VARIANTS_VAL = Object.values(BUTTON_VARIANTS);

export type Tag = (typeof BUTTON_TAGS)[number];

export type Type = (typeof BUTTON_TYPES)[number];

export type Variant = (typeof BUTTON_VARIANTS_VAL)[number];

export interface IBaseButtonLightweight {
  icon?: Icon;
  label: string;
  size?: SizeDefault;
  type?: Type;
  variant?: Variant;
}

export interface IBaseButton extends IBaseButtonLightweight {
  disabled?: boolean;
  download?: boolean;
  href?: string;
  isReverse?: boolean;
  loading?: boolean;
  tag?: Tag;
}
