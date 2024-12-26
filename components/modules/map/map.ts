import type { YandexMapSettings } from 'vue-yandex-maps';
import type { VectorCustomizationItem } from '@yandex/ymaps3-types';

export const CUSTOMIZATION: VectorCustomizationItem[] = [
  {
    tags: {
      any: 'water',
    },
    elements: 'geometry',
    stylers: [
      {
        color: '#d6d6d6',
      },
    ],
  },
  {
    tags: {
      any: ['landscape', 'admin', 'land', 'transit'],
    },
    elements: 'geometry',
    stylers: [
      {
        color: '#fbfbfb',
      },
    ],
  },
  {
    tags: {
      any: ['road'],
    },
    elements: 'geometry',
    stylers: [
      {
        color: '#ededed',
      },
    ],
  },
  {
    tags: {
      any: ['building'],
    },
    elements: 'geometry',
    stylers: [
      {
        color: '#e9e9e9',
      },
    ],
  },
  {
    tags: {
      any: ['poi'],
    },
    elements: 'label.text.fill',
    stylers: [
      {
        color: '#4b4b4b',
      },
    ],
  },
  {
    tags: {
      any: ['poi', 'transit'],
    },
    elements: 'label.icon',
    stylers: [
      {
        color: '#6f6f6f',
      },
    ],
  },
  {
    tags: {
      any: ['road', 'water', 'transit'],
    },
    elements: ['label.icon'],
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
  {
    tags: {
      any: ['road', 'water', 'transit'],
    },
    elements: ['label.text.fill'],
    stylers: [
      {
        color: '#afafaf',
      },
    ],
  },
  {
    tags: {
      any: ['water'],
    },
    elements: ['label.icon', 'label.text.fill'],
    stylers: [
      {
        color: '#6a6a6a',
      },
    ],
  },
];

export const MAP_VARIANTS = {
  small: 'small',
  large: 'large',
} as const;

export type MapVariant = keyof typeof MAP_VARIANTS;

export interface IModuleMapYandex {
  apiKey: string;
  addresses?: IModuleMapAddressAndCoordinates[];
  settings: YandexMapSettings;
}

export type ModuleMapYandexEmits = {
  clickMarker: [event: IModuleMapAddressAndCoordinates];
};

export interface IModuleMapAddress {
  id: string | number;
  title: string;
  address: string;
  phone?: string;
  workTime?: string;
}

export interface IModuleMapAddressAndCoordinates {
  coordinates: [number, number];
  data: IModuleMapAddress;
}

export interface IModuleMap {
  id?: string;
  addresses: IModuleMapAddressAndCoordinates[];
  apiKey: string;
  initialSettings: YandexMapSettings;
  title?: string;
  variant?: MapVariant;
}
