import type { Icon } from '../icon/icon';

export interface IBaseBreadcrumbsItem {
  href?: string;
  text?: string;
  icon?: Icon;
  isDisabled?: boolean;
}

export interface IBaseBreadcrumbs {
  items: IBaseBreadcrumbsItem[];
}
