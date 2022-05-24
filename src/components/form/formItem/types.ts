export type Props = {
  label?: string;
  labelAlign?: 'left' | 'right' | 'top';
  labelWidth?: string | number;
  errorMsg?: string;
  children?: JSX.Element;
  extra?: string | JSX.Element;
  required?: boolean;
}