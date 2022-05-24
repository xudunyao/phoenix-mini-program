export type Props = {
  onInput?: (value: string) => void;
  disabled?: boolean;
  maxlength?: number;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: (value: string) => void;
  clearable?: boolean;
  error?: boolean;
}