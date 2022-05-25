export type Props = {
  onInput?: (value: string) => void;
  disabled?: boolean;
  maxlength?: number;
  value?: string;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: (value: string) => void;
  clearable?: boolean;
  error?: boolean;
}