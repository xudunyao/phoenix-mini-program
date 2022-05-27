import {  View,Swiper,SwiperItem} from '@tarojs/components'
import { Props } from './type';
import './styles.scss';

const Tabs: React.FC<Props> = (
{
  tabList,
  onTabClick,
  children,
  current,
  extra,
  tabStyle,
  swiperParams,
}
) => {
  return (
    <view className='container'>
      <view  className='tab-content' style={{overflowX:'scroll',width:'100%'}}>
        {
           tabList.map((item, index) => {
            return (
              <view className={`tab-horizontal tap-item `} style={tabStyle}>
                <View
                  onClick={() => onTabClick(index)}
                  className={`${current === index ? 'tab-item-active' : 'tab-item-inactive'}`}
                  key={index}
                >
                  {item.title}
                </View>
                {
                  extra ? {extra} : (<view className={current === index ? 'tab-line':''}></view>)
                }
              </view>
            )
          })
        }
      </view>
      <Swiper className='panel-content' current={current} circular {...swiperParams}>
        {
          children.map((item, index) => {
            return (
              <SwiperItem key={index}>
                {item}
              </SwiperItem>
            )
          })
        }
      </Swiper>
    </view>
  )
}
export const TabsPanel = (props) => {
  return (
    <View>
      {props.children}
    </View>
  )
}
export default Tabs;
