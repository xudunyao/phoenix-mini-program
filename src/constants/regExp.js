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
export default {
  phone,
  idCard,
  name
}
