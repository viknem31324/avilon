import type { IAppCarCard } from '~/components/entities/card/card-car/appCardCar.types';

export default defineEventHandler((): { data: IAppCarCard[] } => {
  return {
    data: [
      {
        id: 1,
        title: 'Tank 300',
        code: 'tank-300',
        image: '/img/model-cars/tank-300.webp',
        isAccent: true,
        params: [
          {
            label: 'Мощность',
            value: '177 л.с.',
          },
          {
            label: 'Скорость',
            value: '175 км/ч',
          },
          {
            label: 'Двигатель',
            value: '1.5T',
          },
          {
            label: 'Разгон',
            value: '10.6 сек',
          },
        ],
        detailLink: '#',
      },
      {
        id: 2,
        title: 'TANK 400',
        code: 'tank-400',
        image: '/img/model-cars/tank-400.webp',
        isAccent: false,
        params: [
          {
            label: 'Мощность',
            value: '177 л.с.',
          },
          {
            label: 'Скорость',
            value: '175 км/ч',
          },
          {
            label: 'Двигатель',
            value: '1.5T',
          },
          {
            label: 'Разгон',
            value: '9.7 сек',
          },
        ],
        detailLink: '#',
      },
      {
        id: 3,
        title: 'TANK 500',
        code: 'tank-500',
        image: '/img/model-cars/tank-500.webp',
        isAccent: false,
        params: [
          {
            label: 'Мощность',
            value: '177 л.с.',
          },
          {
            label: 'Скорость',
            value: '175 км/ч',
          },
          {
            label: 'Двигатель',
            value: '1.5T',
          },
          {
            label: 'Разгон',
            value: '9.6 сек',
          },
        ],
        detailLink: '#',
      },
      {
        id: 4,
        title: 'TANK 700',
        code: 'tank-700',
        image: '/img/model-cars/tank-700.webp',
        isAccent: false,
        params: [
          {
            label: 'Мощность',
            value: '177 л.с.',
          },
          {
            label: 'Скорость',
            value: '175 км/ч',
          },
          {
            label: 'Двигатель',
            value: '1.5T',
          },
          {
            label: 'Разгон',
            value: '5.9 сек',
          },
        ],
        detailLink: '#',
      },
    ],
  };
});
