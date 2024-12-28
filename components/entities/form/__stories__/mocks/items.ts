import type { IRadioButton } from '@components/yellow/inputs/types/BaseRadioButton';
import type { IOption } from '@components/yellow/inputs/types/BaseSelect';

export const RADIO_GROUP_ITEMS: Omit<IRadioButton, 'name' | 'modelValue'>[] = [
  {
    label: 'Муж',
    value: 'Муж',
  },
  {
    label: 'Жен',
    value: 'Жен',
  },
];

export const SELECT_ITEMS: IOption[] = [
  { title: 'Input value', id: '1', description: 'Description' },
  { title: 'Menu item 2', id: '2' },
  { title: 'Bitte wahle', id: '3' },
  { title: 'Menu item 4', id: '4' },
  { title: 'Menu item 5', id: '5', $isDisabled: true },
];
