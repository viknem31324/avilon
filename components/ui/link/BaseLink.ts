import type { SizeDefaultWithEmpty } from '~/assets/types/sizes';

export const BASE_LINK_VARIANTS = {
  GREEN: 'green',
  BLACK: 'black',
} as const;

export const BASE_LINK_VARIANTS_VAL = Object.values(BASE_LINK_VARIANTS);

export type BaseLinkVariant = typeof BASE_LINK_VARIANTS_VAL[number];

export interface IBaseLink {
  label?: string;
  href: string;
  size?: SizeDefaultWithEmpty;
  variant?: BaseLinkVariant;
}
