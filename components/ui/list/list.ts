import type { TextWeights } from '../text/text';
import type { SizeDefaultWithExtraSmall } from '~/assets/types/sizes';

export interface IBaseList {
  fluid?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items?: any[];
  size?: SizeDefaultWithExtraSmall;
  tag?: 'ol' | 'ul';
  weight?: TextWeights;
}
