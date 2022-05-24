import { Result, Button } from "@/components";
import { resultImg } from '@/constants';

const ResultPage = () => {
  const icon = {
    src:resultImg.success
  }
  const customStyles = `
    background: linear-gradient(222deg, #80A2FF 0%, #5482FF 100%),
    box-shadow: 0px 2px 5px 0px rgba(128, 162, 255, 0.35),
    text-shadow: 0px 2px 5px rgba(128, 162, 255, 0.35);
    font-weight: 600;
  `;

  return (
    <Result
      icon={icon}
      title='恭喜您，报名成功！'
      subTitle='报名成功后通过筛选会收到面试短信，可自行前往面试地址进行面试'
      extra={<Button type='primary' customStyles={customStyles} >查看更多岗位</Button>}
    />
  )
}
export default ResultPage;