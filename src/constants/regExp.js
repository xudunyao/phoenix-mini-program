const phone = (val) => {
  const regex = new RegExp("^1[3-9]\\d{9}$");
  if(regex.test(val)){
    return true;
  }
  return false;
};
export default {
  phone
}