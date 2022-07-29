import { useState, useMemo, useEffect } from 'react';
import { View, Text, Image, Button, Picker } from "@tarojs/components";
import Taro,{ showToast } from '@tarojs/taro';
import { httpRequest } from '@/utils';
import { Dialog } from "@/components";
import { FormItem, Input } from '@/components/form';
import VerifyCode from '@/pages/components/verifyCode';
import { regExp } from '@/constants';
import styles from "./MyResume.module.scss";
import rightArrow from "./images/rightArrow.png"

const initForm = {
  name: {
    value: '',
    error: '',
  },
  sex: {
    value: '',
    error: '',
  },
  mobile: {
    value: '',
    error: '',
  },
  smsCode: {
    value: '',
    error: '',
  },
  jobType: {
    value: '',
    error: '',
  },
  city: {
    value: '',
    error: '',
  },
}
const sex = ['男', '女'];
const jobType = ['正式工','兼职工','派遣工'];
const MyResume = () => {
  const [resumeInfo, setResumeInfo] = useState({});
  const [isDialogShow, setIsDialogShow] = useState(false);
  const [sendStatus, setSendStatus] = useState(true);
  const [provincesArr,setProvincesArr] = useState([]);
  const [cityArr , setCityArr] = useState([]);
  const [list, setList] = useState([]);
  const [multiIndex, setMultiIndex]= useState([0,0]);
  
  const [form, setForm] = useState(initForm);

  const getCode = async (cb) => {
    if(regExp.phone(form.mobile.value)){
      try {
        const res = await httpRequest.post('phoenix-center-backend/sms/send',{
          data: {
            mobile: form.mobile.value,
            type: 'infoVerification'
          }
        });
        if (res?.code !== 0) {
          showToast({
            icon: 'none',
            title: res.msg
          })
        }
        cb && cb();
        setSendStatus(false)
      } catch (err) {
        showToast({
          icon: 'none',
          title: `${err.message}`
        })
      }
    } else {
      setFormFieldError('mobile', '请输入正确的手机号码');
    }
  };
  const getInformation = async ()=>{
    try {
      const res = await httpRequest.get('phoenix-center-backend/client/info/detail');
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      setForm({
        ...form,
        name: {
          value: res.data.name,       
          error: '',
        },
        sex: {
          value: res.data.sex,
          error: '',
        },
        mobile: {
          value: res.data.mobile,
          error: '',
        },
        jobType: {
          value: res.data.jobType,
          error: '',
        },
        city: {
          value: res.data.city,
          error: '',
        },
      })
    } catch (err) {
      console.log(err);
    }
  }
  const handleListeners = () => {
    setSendStatus(true)
  };
  const getCityData =async ()=>{
    try {
      const res = await httpRequest.get('phoenix-center-backend/client/noauth/area');
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      const areaData = res.data.map((item)=>{
        const cityName = item.districts.map((itemCity)=>{
          return itemCity.cityName
        })
        return [item.provinceName,cityName]
      })
      const provinces = areaData.map(item=>{
        return item[0]
      })
      const city = areaData.map(item=>{
        return item[1]
      })
      setProvincesArr(provinces)
      setCityArr(city);
      setList([provinces,city[0]]);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
      getCityData();
      getInformation()
  },[])
  const setFormFieldValue = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: {
        value,
        error: null,
      },
    })
  }
  const setFormFieldError = (fieldName, error) => {
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        error,
      },
    })
  }

  const handleChange = (e, type) => {
    switch (type) {
      case 'sex':
        setFormFieldValue(type, sex[e.detail.value])
        break;
      case 'jobType':
        setFormFieldValue(type, jobType[e.detail.value]);
        break;
      case 'city':
        setFormFieldValue(type, list[0][e.detail.value[0]]+list[1][e.detail.value[1]]);
        break;
    }
  }
  const handleColumnChange = (e)=>{
    if(e.detail.column === 0){
      setList([provincesArr,cityArr[e.detail.value]])
      setMultiIndex([e.detail.value,0])
      return 
    }
    setMultiIndex((val)=>{
      console.log('val',val)
      return [val[0],e.detail.value]
    })
  }
  const handleInputBlur = (type) => {
    if (!regExp.name(form.name.value) && type === 'name') {
      setFormFieldError('name', '用户姓名格式不正确');
      return false;
    }
    if (!regExp.mobile(form.mobile.value) && type === 'mobile') {
      setFormFieldError('mobile', '手机号码格式不正确');
      return false;
    }
    if (!regExp.sms(form.smsCode.value) && type === 'smsCode') {
      setFormFieldError('smsCode', '验证码格式不正确');
      return false;
    }
    return true;
  }
  const handleInputFocus = (type) => {
    setFormFieldError(type, '');
  }
  const handleUserresume = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/info/creat',{
        data:  {
          name:form.name.value,
          mobile:form.mobile.value,
          smsCode:form.smsCode.value,
          sex:form.sex.value,
          jobType : form.jobType.value,
          city:form.city.value,
        }
      });
      setResumeInfo(res);
      setIsDialogShow(true);
    } catch (err) {
      setIsDialogShow(false);
    }
  }
  const isButtonActive = useMemo(() => !!(regExp.mobile(form.mobile.value) && regExp.name(form.name.value) && regExp.sms(form.smsCode.value)), [form]);
  return (
    <View className={styles.container}>
      <View>
        <View className={styles.mainBody}>
          <View><Text className={styles.boxHeaderStar}>*</Text><Text className={styles.boxHeader}>基本信息</Text></View>
          <FormItem
            errorMsg={form.name.error}
          >
            <Input
              prefix={<View className={styles['label-text']}>姓名</View>}
              placeholder={form.name.value ? '' : '请输入姓名'}
              placeholderStyle='text-align:right'
              value={form.name.value}
              onInput={(value) => setFormFieldValue('name', value)}
              error={!!form.name.error}
              onFocus={() => { handleInputFocus('name') }}
              onBlur={() => { handleInputBlur('name') }}
            />
          </FormItem>
          <FormItem >
            <Input
              prefix={<View className={styles['label-text']}>性别</View>}
              placeholder=''
              disabled
              error={!!form.sex.error}
              suffix={
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Picker mode='selector' range={sex} onChange={(e) => handleChange(e, 'sex')}><Text className={form.sex.value ? '' : styles.annotation}>{form.sex.value ? form.sex.value : '请选择性别'}</Text></Picker>
                  {form.sex.value ? '' : <Image className={styles.arrowImg} src={rightArrow}></Image>}
                </View>
              }
            />
          </FormItem>
          <FormItem
            errorMsg={form.mobile.error}
          >
            <Input
              type='number'
              prefix={<View className={styles['label-text']}>设置报名手机号</View>}
              placeholder={form.mobile.value ? '' : '请输入手机号'}
              placeholderStyle='text-align:right'
              value={form.mobile.value}
              onInput={(value) => setFormFieldValue('mobile', value)}
              error={!!form.mobile.error}
              onFocus={() => { handleInputFocus('mobile') }}
              onBlur={() => { handleInputBlur('mobile') }}
            />
          </FormItem>
          <FormItem
            errorMsg={form.smsCode.error}
          >
            <Input
              prefix={<View className={styles['label-text']}>验证码</View>}
              placeholder={form.smsCode.value ? '' : '请输入验证码'}
              placeholderStyle='text-align:right'
              value={form.smsCode.value}
              onInput={(value) => setFormFieldValue('smsCode', value)}
              error={!!form.smsCode.error}
              onFocus={() => { handleInputFocus('smsCode') }}
              onBlur={() => { handleInputBlur('smsCode') }}
              suffix={
                <VerifyCode onClick={sendStatus && getCode} listeners={handleListeners} />
              }
            />
          </FormItem>
        </View>
        <View style={{ height: '10px', background: '#F4F6FE' }}></View>
        <View className={styles.mainFooter}>
          <View><Text className={styles.boxHeaderStar}>*</Text><Text className={styles.boxHeader}>求职意向</Text></View>
          <FormItem >
            <Input
              prefix={<View className={styles['label-text']}>求职类型</View>}
              placeholder=''
              disabled
              onInput={(value) => setFormFieldValue('name', value)}
              error={!!form.jobType.error}
              suffix={
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Picker mode='selector' range={jobType} onChange={(e) => handleChange(e, 'jobType')}><Text className={form.jobType.value ? '' : styles.annotation}>{form.jobType.value ? form.jobType.value : '请选择求职类型'}</Text></Picker>
                  {form.jobType.value ? '' : <Image className={styles.arrowImg} src={rightArrow}></Image>}
                </View>
              }
            />
          </FormItem>
          <FormItem >
            <Input
              prefix={<View className={styles['label-text']}>期望城市</View>}
              placeholder=''
              disabled
              onInput={(value) => setFormFieldValue('city', value)}
              error={!!form.city.error}
              suffix={
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Picker mode='multiSelector' range={list} value={multiIndex} onChange={(e) => handleChange(e, 'city')} onColumnChange={(e)=>handleColumnChange(e)}><Text className={form.city.value ? '' : styles.annotation}>{form.city.value ? form.city.value : '请选择期望工作城市'}</Text></Picker>
                  {form.city.value ? '' : <Image className={styles.arrowImg} src={rightArrow}></Image>}
                </View>
              }
            />
          </FormItem>
          <View style='display: flex; justify-content: center'>
            <Button className={`${styles.button} ${isButtonActive ? styles.active : styles.inactive}`} onClick={isButtonActive && handleUserresume}>保存</Button>
          </View>
        </View>
      </View>
      <Dialog
        title={<View className={styles['dialog-title']}>{resumeInfo?.code === 1 ? '保存失败' : '保存成功'}</View>}
        visible={isDialogShow}
        maskClosable
        content={<View className={styles['dialog-tips']}>{resumeInfo?.msg}</View>}
        onClose={() => {
          setIsDialogShow(false);
          resumeInfo?.code !== 1 && Taro.switchTab({
            url:'/pages/my/index'
          })
        }}
        actions={[
          {
            title: '确定',
            onClick: () => {
              setIsDialogShow(false);
              resumeInfo?.code !== 1 && Taro.switchTab(
                {
                  url:'/pages/my/index'
                })
            },
            type: 'primary'
          },
        ]}
      />
    </View>
  );
};
export default MyResume;

