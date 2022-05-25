export type optionType = {
  label: string;
  value: string;
  disabled?: boolean;
}

export type Props = {
  onChange?: (value: string) => void;
  disabled?: boolean;
  options: [optionType];
  value?: string;
}