export type Props = {
  onClose: () => void;
  maskClosable?: boolean;
  visible?: boolean;
  title?: string | JSX.Element;
  children?: JSX.Element;
};