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
    <View className='tabs'>
      <View  className='tab-content' style={{overflowX:'scroll',width:'100%'}}>
        {
           tabList.map((item, index) => {
            return (
              <View className='tab-horizontal tab-item' style={tabStyle} key={index}>
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
              </View>
            )
          })
        }
      </View>
      <Swiper className='panel-content' current={current} onChange={(event)=>{ onTabClick(event?.detail?.current) }}>
        {
          children?.constructor === Array ? children.map((item, index) => (
            <SwiperItem>
              {item}
            </SwiperItem>
            )
          ): (<SwiperItem>{children}</SwiperItem>)
        }
      </Swiper>
    </View>
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
