export type ActionType = {
  title: string;
  onClick?: () => void;
  type?: 'primary' | 'default'; 
}

export type Props = {
  onClick: () => void;
  title?: string | JSX.Element;
  icon: string;
  width?: string;
  height?: string,
  status?: string;
  subTitle?: string | JSX.Element;
  extra?:string | JSX.Element;
  children?: JSX.Element;
};