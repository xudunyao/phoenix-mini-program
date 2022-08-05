const phone = (val) => {
  const reg = new RegExp("^1[3-9]\\d{9}$");
  return reg.test(val);
};
const idCard = (val) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(val);
};
const name = (val) => {
  const reg = /^[\u4E00-\u9FA5]+(\.?[\u4e00-\u9fa5])+$/;
  return reg.test(val);
}
const money = (val) => {
  const reg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
  return reg.test(val);
}
const sms = (val) => {
  const reg = /^\d{6}$/;
  return reg.test(val);
}
const bankCard = (val) => {
  const reg = /^[0-9]{6,19}$/;
  return reg.test(val);
}
const mobile = (val) => {
  const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
  return reg.test(val);
}
export default {
  phone,
  idCard,
  name,
  money,
  sms,
  bankCard,
  mobile,
}
