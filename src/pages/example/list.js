import { Text, View } from '@tarojs/components'
import { InfiniteScroll } from '@/components';

const List = () => {
  const getData = async (search) => {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        const response = {
          code: 0,
          data: {
            content: new Array(search.pageSize).fill(search.pageNumber),
            ...search,
            totalPages: 5,
          }};
        resolve(response)
      }, 500);
    });
    return res.data;
  }

  return (
    <InfiniteScroll
      getData={getData}
      pageSize={20}
      renderItem={(item) => (
        <View style={{ padding: 20 }}>
          <Text key={item}>{item}</Text>
        </View>
      )}
    >
        
    </InfiniteScroll>
  )
}

export default List