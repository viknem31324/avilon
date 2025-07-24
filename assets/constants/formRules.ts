import * as yup from 'yup';

// https://pulse.kokoc.tech/confluence/pages/viewpage.action?pageId=10322022
export const CYRILLIC_LATIN_ERROR_MESSAGE
  = 'Текст должен содержать только символы кириллицы и латиницы';
export const CYRILLIC_LATIN_NUMERIC_ERROR_MESSAGE
  = 'Текст должен содержать только символы кириллицы, латиницы и цифры';
export const EMAIL_ERROR_MESSAGE = 'Неверный email';
export const MAX_LENGTH_ERROR_MESSAGE
  = ({ max }: { max: number }) => `Число символов должно быть меньше ${max}`;
export const MIN_LENGTH_ERROR_MESSAGE
  = ({ min }: { min: number }) => `Число символов должно быть больше ${min}`;
export const PHONE_ERROR_MESSAGE = 'Номер телефона недействителен';
export const PASSWORD_ERROR_MESSAGE = 'Пароль должен содержать минимум один спецсимвол, цифру и букву в верхнем регистре';
export const REQUIRED_ERROR_MESSAGE = 'Обязательное поле';
export const SPACE_ERROR_MESSAGE = 'В начале и конце текста не должно быть пробелов';

export const CYRILLIC_LATIN_REGEXP = /^[А-Яа-яЁёA-Za-z\s-—"’,.]+$/;
export const EMAIL_REGEXP = /^(?=.{1,64}@.{1,64}$)(?=.{3,255}$)([a-zA-Z0-9._%+-]+(?:'[a-zA-Z0-9]+)?)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX
  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#-./(){}[\]^])(?=.*[0-9])[A-Za-z\d@$!%*?&#-./(){}[\]^]{8,}$/;
export const PHONE_RU_REGEXP = /^(\+7)\([0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
export const PHONE_BY_REGEXP = /^\+375\([0-9]{2}\)[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
export const checkSpaceError = (value?: string) => {
  return !/^[ \s]+|[ \s]+$/.test(value || '');
};

export const CITY_RULE = {
  city: yup
    .string()
    .test('city', SPACE_ERROR_MESSAGE, checkSpaceError)
    .matches(CYRILLIC_LATIN_REGEXP, {
      message: CYRILLIC_LATIN_ERROR_MESSAGE,
      excludeEmptyString: true,
    })
    .max(40, MAX_LENGTH_ERROR_MESSAGE),
};

export const CITY_REQUIRED_RULE = {
  city: yup
    .string()
    .required(REQUIRED_ERROR_MESSAGE)
    .test('city', SPACE_ERROR_MESSAGE, checkSpaceError)
    .matches(CYRILLIC_LATIN_REGEXP, {
      message: CYRILLIC_LATIN_ERROR_MESSAGE,
      excludeEmptyString: true,
    })
    .max(40, MAX_LENGTH_ERROR_MESSAGE),
};

export const EMAIL_RULE = {
  email: yup
    .string()
    .test('email', SPACE_ERROR_MESSAGE, checkSpaceError)
    .max(128, MAX_LENGTH_ERROR_MESSAGE)
    .test('email', EMAIL_ERROR_MESSAGE, (value) => {
      if (!value) {
        return true;
      }

      return EMAIL_REGEXP.test(value);
    }),
};

export const EMAIL_REQUIRED_RULE = {
  email: yup
    .string()
    .required(REQUIRED_ERROR_MESSAGE)
    .test('email', SPACE_ERROR_MESSAGE, checkSpaceError)
    .max(128, MAX_LENGTH_ERROR_MESSAGE)
    .test('email', EMAIL_ERROR_MESSAGE, (value) => {
      return EMAIL_REGEXP.test(value);
    }),
};

export const NAME_RULE = {
  name: yup
    .string()
    .test('name', SPACE_ERROR_MESSAGE, checkSpaceError)
    .min(2, MIN_LENGTH_ERROR_MESSAGE)
    .matches(CYRILLIC_LATIN_REGEXP, {
      message: CYRILLIC_LATIN_ERROR_MESSAGE,
      excludeEmptyString: true,
    })
    .max(50, MAX_LENGTH_ERROR_MESSAGE),
};

export const NAME_REQUIRED_RULE = {
  name: yup
    .string()
    .required(REQUIRED_ERROR_MESSAGE)
    .test('name', SPACE_ERROR_MESSAGE, checkSpaceError)
    .min(2, MIN_LENGTH_ERROR_MESSAGE)
    .matches(CYRILLIC_LATIN_REGEXP, {
      message: CYRILLIC_LATIN_ERROR_MESSAGE,
    })
    .max(50, MAX_LENGTH_ERROR_MESSAGE),
};

export const PASSWORD_REQUIRED_RULE = {
  password: yup
    .string()
    .required(REQUIRED_ERROR_MESSAGE)
    .test('password', SPACE_ERROR_MESSAGE, checkSpaceError)
    .min(8, MIN_LENGTH_ERROR_MESSAGE)
    .test('password', PASSWORD_ERROR_MESSAGE, (value) => {
      return PASSWORD_REGEX.test(value);
    }),
};

export const PHONE_RU_RULE = {
  phone: yup
    .string()
    .test('phone', SPACE_ERROR_MESSAGE, checkSpaceError)
    .test('phone', PHONE_ERROR_MESSAGE, (value) => {
      if (!value) {
        return true;
      }

      return PHONE_RU_REGEXP.test(value);
    }),
};

export const PHONE_RU_REQUIRED_RULE = {
  phone: yup
    .string()
    .required(REQUIRED_ERROR_MESSAGE)
    .test('phone', SPACE_ERROR_MESSAGE, checkSpaceError)
    .test('phone', PHONE_ERROR_MESSAGE, (value) => {
      return PHONE_RU_REGEXP.test(value);
    }),
};

export const POLITICS_RULE = {
  politics: yup.string().trim().required(REQUIRED_ERROR_MESSAGE),
};
