const giftImg = {
  "GIFT":'https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/public/v1.0/gift.png',
  "UNDONE": 'https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/public/v1.0/undone.png',
  "PENDING": 'https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/public/v1.0/pending.png',
  "FINISHED": 'https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/public/v1.0/finished.png',
}
const GiftStyles = Object.freeze({
  "UNDONE":"undone",
  "PENDING":"pending",
  "FINISHED":"finished",
})
const GiftStatus = Object.freeze({
  "UNDONE":"未完成",
  "PENDING":"待领取",
  "FINISHED":"已完成",
})
const register = Object.freeze(
  {
    "FIRST_ENTRY_CLOCK_IN_7_DAYS":25,
    "FIRST_ENTRY_CLOCK_IN_30_DAYS":50,
    "SECOND_ENTRY_CLOCK_IN_30_DAYS":75,
    "THIRD_ENTRY_CLOCK_IN_30_DAYS":100,
  }
)
const entry = Object.freeze(
  {
    "REGISTER_SUCCESS":20,
    "FIRST_SIGNUP":40,
    "ARRIVE_INTERVIEW":60,
    "INTERVIEW_PASS":80,
    "ENTRY_SUCCESS":100,
  }
)
const rewardModalBg = 'https://blue-collar-prod.oss-cn-shenzhen.aliyuncs.com/public/v1.0/%E7%A4%BC%E5%8C%85%402x.png'
export {
  giftImg,
  GiftStyles,
  GiftStatus,
  register,
  entry,
  rewardModalBg
}