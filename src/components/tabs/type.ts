import { SwiperProps } from "@tarojs/components";

export type Props = {
  tabList: Tab[];
  onTabClick: (tab: any) => void;
  current?: number;
  children: JSX.Element | JSX.Element[] ;
  tabStyle?: React.CSSProperties;
  swiperParams?: SwiperProps;
  extra?: JSX.Element|string;
};
type Tab = {
  title: string ;
  background?: string;
}