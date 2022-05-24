import { Result } from "@/components";
import { Button } from '@tarojs/components';
import { resultImg } from '@/constants';

const ResultPage = () => {
  const icon = {
    src:resultImg.success
  }
  return (
    <Result
      icon={icon}
      title='恭喜您，报名成功！'
      subTitle='报名成功后通过筛选会收到面试短信，可自行前往面试地址进行面试'
      extra={<Button>查看更多岗位</Button>}
    />
  )
}
export default ResultPage;