const phone = (val) => {
  const regex = new RegExp("^1[3-9]\\d{9}$");
  if(regex.test(val)){
    return true;
  }
  return false;
};
const idCard = (val) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if(!reg.test(val)){
    return false;
  }
  return true;
};

export default {
  phone,
  idCard
}