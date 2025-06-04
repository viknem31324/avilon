import { ref } from 'vue';

export interface InputAttributes {
  value: string;
  onClick: (event: MouseEvent) => void;
  onFocus: (event: FocusEvent) => void;
  onKeydown: (event: KeyboardEvent) => void;
  ref: (el: HTMLInputElement | null) => void;
}

export interface UseDigitInputOptions {
  inputs: any;
  acceptedCharacters: RegExp;
  length: number;
  value: string;
  emits: (evt: any, ...args: any) => void;
  onInput: (value: string) => void;
}

export default function useDigitInput({
  inputs,
  acceptedCharacters,
  length,
  value,
  emits,
  onInput,
}: UseDigitInputOptions) {
  const initInputCode = () => {
    const props: InputAttributes[] = [];

    for (let i = 0; i < length; i++) {
      const digitValue = val.value[i] === ' ' ? '' : val.value[i];

      props.push({
        value: digitValue,
        ref: (el) => {
          inputs.value[i] = el;
        },
        onClick: (evt) => {
          const currentTarget = evt.target as HTMLInputElement;
          requestAnimationFrame(() => {
            currentTarget.setSelectionRange(0, 1);
          });
          emits('click', evt);
        },
        onFocus: (evt) => {
          const currentTarget = evt.target as HTMLInputElement;
          currentTarget.setSelectionRange(0, 1);
          emits('focus', evt);
        },
        onKeydown: (evt) => {
          emits('keydown', evt);

          if (evt.code == 'KeyV' && (evt.ctrlKey || evt.metaKey)) {
            return;
          }

          switch (evt.key) {
            case 'Backspace':
              evt.preventDefault();
              if (!digitValue) {
                if (i > 0) {
                  onInput(val.value.substring(0, i - 1) + ' ' + val.value.substring(i));
                  const previousInput = inputs.value[i - 1];
                  if (previousInput) {
                    previousInput.focus();
                  }
                }
              } else {
                onInput(val.value.substring(0, i) + ' ' + val.value.substring(i + 1));
              }
              break;
            case 'ArrowUp':
            case 'ArrowLeft':
              evt.preventDefault();
              if (i > 0) {
                const previousInput = inputs.value[i - 1];
                if (previousInput) {
                  previousInput.focus();
                  requestAnimationFrame(() => {
                    previousInput.setSelectionRange(0, 1);
                  });
                }
              }
              break;
            case 'ArrowDown':
            case 'ArrowRight':
              evt.preventDefault();
              if (i + 1 < length) {
                const nextInput = inputs.value[i + 1];
                if (nextInput) {
                  nextInput.focus();
                  requestAnimationFrame(() => {
                    nextInput.setSelectionRange(0, 1);
                  });
                }
              }
              break;
            default:
              if (evt.key.length === 1 && !(evt.metaKey || evt.altKey || evt.ctrlKey)) {
                evt.preventDefault();

                if (!acceptedCharacters.test(evt.key)) {
                  return;
                }

                onInput(val.value.substring(0, i) + evt.key + val.value.substring(i + 1));

                if (i + 1 < length) {
                  const nextInput = inputs.value[i + 1];

                  if (!nextInput) {
                    return;
                  }

                  nextInput.focus();
                  requestAnimationFrame(() => {
                    nextInput.setSelectionRange(0, 1);
                  });
                } else {
                  const currentTarget = evt.target as HTMLInputElement;
                  requestAnimationFrame(() => {
                    currentTarget.select();
                  });
                }
              }
          }
        },
      });
    }

    return props;
  };

  const val = ref(padValue(value, length));
  const props = ref(initInputCode());

  const setValue = (newValue: string) => {
    val.value = padValue(newValue, length);
    props.value = initInputCode();
  };

  return {
    props,
    setValue,
  };
}

const padValue = (value: string, length: number) => {
  let newValue = value;

  while (newValue.length < length) {
    newValue += ' ';
  }

  return newValue.slice(0, length);
};
