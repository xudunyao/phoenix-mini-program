export type ActionType = {
  title: string;
  onClick?: () => void;
  type?: 'primary' | 'default';
  round?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  customStyles?: string | object;
  loading?: false;
  size?: 'mini' | 'default';
}

export type Props = {
  onClose: () => void;
  maskClosable?: boolean;
  visible?: boolean;
  actions?: [ActionType];
  showButton?: boolean;
  title?: string | JSX.Element;
  content?: string | JSX.Element;
  children?: JSX.Element;
  buttonWrapperStyle?: string | object;
};