import type { SizeDefault } from '~/assets/types/sizes';

export const PAGINATION_PER_PAGE_OPTIONS = [10, 20, 50];

export interface IBasePaginationPageJumper {
  maxPages?: number;
  disabled?: boolean;
  title?: string;
}

export type BasePaginationPageJumperEmits = {
  go: [page: number];
};

export interface IBasePaginationPages {
  count: number;
  href?: string;
  perPage: number;
  modelValue: number;
  disabled: boolean;
}

export type BasePaginationPagesEmits = {
  'update:modelValue': [page: number];
};

export interface IBasePage {
  label: number | string;
  num: number;
}

export interface IBasePaginationRowsSelector {
  title: string;
  options: number[];
  modelValue: number;
  disabled: boolean;
}

export type BasePaginationRowsSelectorEmits = {
  'update:modelValue': [page: number];
};

export interface IBasePagination {
  disabled?: boolean;
  currentPage?: number;
  href?: string;
  pageJumperTitle?: string;
  perPage?: number;
  perPageOptions?: number[];
  rowsSelectorTitle?: string;
  size?: SizeDefault;
  totalPages: number;
}

export type BasePaginationEmits = {
  'update:currentPage': [currentPage: number];
  'update:perPage': [perPage: number];
};
