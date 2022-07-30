import { pageKeys } from "@/constants";
import { WebView } from "@tarojs/components";
import { useRouter } from '@tarojs/taro';

const WebViews = () => {
  const router = useRouter();
  const { page,　url } = router.params;
  const  toPage = page ? pageKeys[page] : url;
  return (
    <WebView src={toPage} />
  )
};

export default WebViews;