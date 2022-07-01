import { pageKeys } from "@/constants";
import { WebView } from "@tarojs/components";
import { useRouter } from '@tarojs/taro';

const WebViews = () => {
  const router = useRouter();
  const { page } = router.params;
  return (
    <WebView src={pageKeys[page]} />
  )
};

export default WebViews;