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

  const NON_BREAK_SPACE = '\u00A0';
  const NON_BREAK_HYPHEN = '\u2011';
  const charRegex = '[№0-9а-яё]';

  // Регулярное выражение для определения URL
  const urlRegex = /(https?:\/\/[^\s]+)/gi;

  // Разделяем текст на части: URL и не-URL
  const parts = text.split(urlRegex);

  // Обрабатываем каждую часть отдельно
  const processedParts = parts.map((part, index) => {
    // Если это URL (нечетный индекс), оставляем как есть
    if (index % 2 !== 0) {
      return part;
    }

    // Если это не URL, применяем наши преобразования
    return part
      .replaceAll('  ', ' ')
      .replace(/(?<![/:])(-)/g, NON_BREAK_HYPHEN) // Заменяем дефисы, но не в URL
      .replace(new RegExp(`( ${charRegex}{2} ${charRegex}{2})( )`, 'gi'), `$1${NON_BREAK_SPACE}`)
      .replace(new RegExp(`( ${charRegex} ${charRegex})( )`, 'gi'), `$1${NON_BREAK_SPACE}`)
      .replace(new RegExp(`( ${charRegex}{2})( )`, 'gi'), `$1${NON_BREAK_SPACE}`)
      .replace(new RegExp(`( ${charRegex}{1})( )`, 'gi'), `$1${NON_BREAK_SPACE}`);
  });

  // Собираем текст обратно
  return processedParts.join('');
};
