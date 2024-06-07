export const getDeclinationTitle = (
  number: number,
  words = ['результат', 'результата', 'результатов'],
): string => {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
};

/**
 * @description Заменяет пробелы между предлогами/союзами/местоимениями на неразрывные пробелы
 * @param text Входной текст
 * @returns {string} Переработанный текст, если входной параметр валиден, иначе оригинальный текст
 */
export const toNbsp = <T>(text: T): T | string => {
  if (typeof text !== 'string' || !text) {
    return text;
  }

  // Символ неразрывного пробела
  const NON_BREAK_SPACE = '\u00A0';

  const charRegex = '[№0-9а-яё]';

  /**
   * Регулярка для поиска 2-символьных предлогов/союзов/местоимений,
   * идущих 2 раза подряд. Например, "но их"
   */
  const doubleCharPairRegex = new RegExp(
    `( ${charRegex}{2} ${charRegex}{2})( )`,
    'gi',
  );

  /**
   * Регулярка для поиска 1-символьных предлогов/союзов/местоимений,
   * идущих 2 раза подряд. Например, "а в"
   */
  const singleCharPairRegex = new RegExp(
    `( ${charRegex} ${charRegex})( )`,
    'gi',
  );

  /**
   * Регулярка для поиска 2-символьных предлогов/союзов/местоимений,
   * идущих 1 раз подряд. Например, "но"
   */
  const doubleCharRegex = new RegExp(`( ${charRegex}{2})( )`, 'gi');

  /**
   * Регулярка для поиска 1-символьных предлогов/союзов/местоимений,
   * идущих 1 раз подряд. Например, "а"
   */
  const singleCharRegex = new RegExp(`( ${charRegex}{1})( )`, 'gi');

  return (
    text
      .replaceAll('  ', ' ')
      .replaceAll('-', '\u2011')
      /**
       * Сначала находим парные предлоги/союзы/местоимения, чтобы преобразовать
       * конечный пробел в неразрывный пробел.
       */
      .replace(doubleCharPairRegex, `$1${NON_BREAK_SPACE}`)
      .replace(singleCharPairRegex, `$1${NON_BREAK_SPACE}`)
      /**
       * Потом находим не парные предлоги/союзы/местоимения, чтобы сделать
       * то же самое.
       */
      .replace(doubleCharRegex, `$1${NON_BREAK_SPACE}`)
      .replace(singleCharRegex, `$1${NON_BREAK_SPACE}`)
      /**
       * Такой порядок потому, что если находить сразу парные и одиночные вхождения,
       * то мы заранее не знаем, в какой группе окажется вхождение, которое
       * нужно заменить.
       */
  );
};
