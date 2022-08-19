import {  View,Swiper,SwiperItem } from '@tarojs/components'
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
    <view className='tabs'>
      <view  className='tab-content' style={{overflowX:'scroll',width:'100%'}}>
        {
           tabList.map((item, index) => {
            return (
              <view className='tab-horizontal tab-item' style={tabStyle}>
                <View
                  onClick={() => onTabClick(index, item)}
                  className={`${current === index ? 'tab-item-active' : 'tab-item-inactive'}`}
                  key={index}
                  style={item.background && {
                    width:'70px',
                    height:'26px',
                    backgroundImage: `url(${item.background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  {!item.background && item.title }
                </View>
                {
                  extra && current === index ? extra : (<View className={current === index ? 'tab-line':'tab-empty'}></View>)
                }
              </view>
            )
          })
        }
      </view>
      <Swiper className='panel-content' current={current} onChange={(event)=>{ onTabClick(event?.detail?.current) }}>
        {
          children?.constructor === Array ? children.map((item, index) => (
            <SwiperItem key={index}>
              {item}
            </SwiperItem>
            )
          ): (<SwiperItem>{children}</SwiperItem>)
        }
      </Swiper>
    </view>
  )
}
export const TabsPanel = (props) => {
  return (
    <View className='tab-panel'>
      {props.children}
    </View>
  )
}
export default Tabs;
