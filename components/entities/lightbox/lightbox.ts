export interface IBaseLightbox {
  title?: string;
  isOpen?: boolean;
  isClosing?: boolean;
}

export type BaseLightboxEmits = {
  confirm: [];
  close: [];
};
