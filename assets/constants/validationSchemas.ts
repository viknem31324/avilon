import * as yup from 'yup';
import { CITY_RULE, EMAIL_REQUIRED_RULE, NAME_RULE, PHONE_RU_RULE, POLITICS_RULE } from './formRules';

export const EXAMPLE_SCHEMA = yup.object({
  ...CITY_RULE,
  ...EMAIL_REQUIRED_RULE,
  ...NAME_RULE,
  ...PHONE_RU_RULE,
  ...POLITICS_RULE,
});
