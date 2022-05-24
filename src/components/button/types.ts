export type Props = {
  title: string | JSX.Element;
  round?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  onClick: () => void;
  customStyles?: string | object;
  loading?: false;
  size?: 'mini' | 'default';
};
