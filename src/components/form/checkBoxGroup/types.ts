export type optionType = {
  label: string;
  value: never;
  disabled?: boolean;
}

export type Props = {
  onChange?: (value: string) => void;
  disabled?: boolean;
  options: [optionType];
  value?: [any];
}