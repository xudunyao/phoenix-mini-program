export type ActionType = {
  title: string;
  onClick?: () => void;
  type?: 'primary' | 'default'; 
}

export type Props = {
  icon: {
    src: string,
    width?: number, //192
    height?: number, // 192
  };
  customIcon: JSX.Element;
  title?: string | JSX.Element;
  status?: string;
  subTitle?: string | JSX.Element;
  extra?:string | JSX.Element;
  customStyles?: string | object;
  onClick: () => void;
};