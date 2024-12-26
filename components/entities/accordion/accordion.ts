export type BaseAccordionButton = {
  href: string;
  label?: string;
};

export interface IBaseAccordionItem {
  title: string;
  button?: BaseAccordionButton;
}

export interface IBaseAccordion {
  id?: string;
  multiple?: boolean;
}
