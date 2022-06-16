import { ScrollView, View, Text, Button, } from '@tarojs/components'
import { useState, useEffect, useRef, useMemo } from 'react';
import { Loading } from '@/components';
import { Props, ResponseTypes, PaginationTypes  } from './types';



import './styles.scss';

const InfiniteScroll: React.FC<Props> = ({
  renderItem,
  pageSize = 15,
  threshold = 50,
  refreshComponent,
  noDataComponent,
  hasMoreComponent,
  loadingMoreComponent,
  noMoreComponent,
  getData,
}) => {
  const initLoaded = useRef(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize,
    totalPages: 0,
  });

  const hasMore = useMemo(() => pagination.pageNumber < pagination.totalPages - 1, [pagination])

  const getList = async (search: PaginationTypes) => {
    if (!initLoaded.current) {
      setIsLoading(true);
      initLoaded.current = true;
    }
    const res: ResponseTypes = await getData({
      ...search,
      pageNumber: search.pageNumber < 0 ? 0 : search.pageNumber,
    });
    if (search.pageNumber === 0) {
      setList(res.content);
    } else {
      setList(list.concat(res.content));
    }
    setPagination({
      pageNumber: res.pageNumber,
      pageSize: res.pageSize,
      totalPages: res.totalPages,
    })
  }
  const refresh = async (isInitLoading) => {
    if (isRefreshing || isLoadingMore) {
      return;
    }
    try {
      isInitLoading ? setIsLoading(true) : setIsRefreshing(true);
      await getList({ ...pagination, pageNumber: 0 })
    } catch (err) {
      console.log('onRefresh Error:', err)
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };
  const loadMore = async () => {
    if (isRefreshing || isLoadingMore || !hasMore) {
      return;
    }
    try {
      setIsLoadingMore(true);
      await getList({ ...pagination, pageNumber: pagination.pageNumber + 1});
    } catch (err) {
      console.log('onRefresh Error:', err)
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    refresh(true);
  }, [])

  useEffect(() => {
    if (pageSize !== pagination.pageSize) {
      setPagination({
        ...pagination,
        pageSize,
      })
    }
  }, [pageSize]);

  return (
    <ScrollView
      className='infinite-scroll'
      scrollY
      scrollWithAnimation
      upperThreshold={50}
      lowerThreshold={threshold}
      enableBackToTop
      onScrollToUpper={() => list.length > 5 && refresh(false)}
      onScrollToLower={loadMore}
    >
      {
        isLoading ? (
          <View className='infinite-scroll-container'>
            <Loading size='40px' color='#80A2FF' />
          </View>
        ) : (
          <>
            <View>
              {isRefreshing && (refreshComponent || <Text className='infinite-scroll-text'>刷新中……</Text>)}
            </View>
            {
              list?.length
                ? list.map((i, index) => renderItem(i, index))
                : (
                  <View className='infinite-scroll-container'>
                    {
                      noDataComponent || (
                      <>
                        <Text className='infinite-scroll-text'>No Data</Text>
                        <Button size='mini' onClick={() => refresh(true)}>重新获取</Button>
                      </>)
                    }
                  </View>
                )
            }
            {list.length ? (
              <View>
                {
                  isLoadingMore ? (loadingMoreComponent || (<Loading size='40px' color='80A2FF' />)) : (
                    hasMore ? (hasMoreComponent || (<Text className='infinite-scroll-text'>上拉加载更多数据</Text>)) : (noMoreComponent || (<Text className='infinite-scroll-text'>没有更多数据了</Text>))
                  )
                }
              </View>
            ) : null}
          </>
        )
      }
    </ScrollView>
  )
}

export default InfiniteScroll;