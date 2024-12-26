export interface IBaseLightbox {
  title?: string;
  isOpen?: boolean;
  isClosing?: boolean;
}

export type IBaseLightboxEmits = {
  confirm: [];
  close: [];
};
