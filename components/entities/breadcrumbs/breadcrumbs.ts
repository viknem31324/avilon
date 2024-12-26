import type { Icon } from '../icon/icon';

export interface IBaseBreadcrumbsItem {
  href?: string;
  text?: string;
  icon?: Icon;
  isAccent?: boolean;
  isDisabled?: boolean;
}

export interface IBaseBreadcrumbs {
  items: IBaseBreadcrumbsItem[];
}
