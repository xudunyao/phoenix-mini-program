export type Props = {
  onClose: () => void;
  maskClosable?: boolean;
  visible?: boolean;
  showClose?:boolean;
  title?: string | JSX.Element;
  children?: JSX.Element;
};