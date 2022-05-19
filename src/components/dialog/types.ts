export type ActionType = {
  title: string;
  onClick?: () => void;
  type?: 'primary' | 'default'; 
}

export type Props = {
  onClose: () => void;
  maskClosable?: boolean;
  visible?: boolean;
  actions?: [ActionType];
  title?: string | JSX.Element;
  content?: string | JSX.Element;
  children?: JSX.Element;
};