import type { IBaseFormPartialsProps } from '../helpers/partialProps';
import type { SizeDefault } from '~/assets/types/sizes';

export const LANG_FORMAT = {
  ru: {
    months: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    monthsShort: ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
    weekdays: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    weekdaysShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    weekdaysMin: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    firstDayOfWeek: 1,
    firstWeekContainsDate: 1,
  },
  en: {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    firstDayOfWeek: 1,
    firstWeekContainsDate: 1,
  },
} as const;

export const LANG_VARIANTS = Object.keys(LANG_FORMAT);

export const CALENDAR_TYPES = [
  'date',
  'month',
  'year',
] as const;

type Lang = keyof typeof LANG_FORMAT;
type CalendarType = keyof typeof CALENDAR_TYPES;

export interface IBaseCalendar extends Omit<IBaseFormPartialsProps, 'modelValue'> {
  fromDate?: Date;
  locale?: Lang;
  modelValue?: Date;
  range?: boolean;
  size?: SizeDefault;
  toDate?: Date;
  formatDate?: string;
  type?: CalendarType;
}

export type BaseCalendarEmits = {
  'clear': [];
  'update:modelValue': [value: Date];
};
