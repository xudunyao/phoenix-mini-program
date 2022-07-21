import { useState, useMemo } from 'react';
import { View, Text, Image, Button, Picker } from "@tarojs/components";
import Taro from '@tarojs/taro';
import { httpRequest } from '@/utils';
import { Dialog } from "@/components";
import { FormItem, Input } from '@/components/form';
import VerifyCode from '@/pages/components/verifyCode';
import { regExp } from '@/constants';
import styles from "./MyResume.module.scss";
import close from "./images/close.png";
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
  status: {
    value: '',
    error: '',
  },
  mobile: {
    value: '',
    error: '',
  },
  authCode: {
    value: '',
    error: '',
  },
  professionalType: {
    value: '',
    error: '',
  },
  wishCity: {
    value: '',
    error: '',
  },
}

const MyResume = () => {
  const [isTipsShow, setIsTipsShow] = useState(true)
  const [resumeInfo, setResumeInfo] = useState({});
  const [isDialogShow, setIsDialogShow] = useState(false);
  const [sendStatus, setSendStatus] = useState(true);
  //  选择框信息,需要用再加上setSelectDate
  const [selectDate] = useState({
    //  需要发请求获取还是前端自定义？
    sex: ['男', '女'],
    status: ['求职', '已就业'],
    professionalType: [1, 2, 3, 4, 5, 6, 7],
    wishCity: ['广州', '深圳', '珠海', '东莞'],
  })
  const [form, setForm] = useState(initForm);
  const getCode = async () => {
    //TODO: 获取验证码
  };
  const handleListeners = () => {
    setSendStatus(true)
  };

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
        setFormFieldValue(type, selectDate.sex[e.detail.value])
        break;
      case 'status':
        setFormFieldValue(type, selectDate.status[e.detail.value]);
        break;
      case 'professionalType':
        setFormFieldValue(type, selectDate.professionalType[e.detail.value]);
        break;
      case 'wishCity':
        setFormFieldValue(type, selectDate.wishCity[e.detail.value]);
        break;
    }
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
    if (!regExp.sms(form.authCode.value) && type === 'authCode') {
      setFormFieldError('authCode', '验证码格式不正确');
      return false;
    }

    return true;
  }
  const handleInputFocus = (type) => {
    setFormFieldError(type, '');
  }
  const handleCloseClick = () => {
    setIsTipsShow(false);
  };
  const handleUserresume = async () => {
    try {
      const res = await httpRequest.post();  //  Ajax
      setResumeInfo(res);
      setIsDialogShow(true);
    } catch (err) {
      setIsDialogShow(false);
    }
  }
  const isButtonActive = useMemo(() => !!(regExp.mobile(form.mobile.value) && regExp.name(form.name.value)), [form]);
  return (
    <View className={styles.container}>
      {
        isTipsShow ? (
          <View className={styles.prompt}>
            <Text>简历完善度为75%（完善度越高，录取率越高）</Text>
            <Image
              src={close}
              className={styles.icon}
              onClick={handleCloseClick}
            />
          </View>
        ) : null
      }
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
              // disabled
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
                  <Picker mode='selector' range={selectDate.sex} onChange={(e) => handleChange(e, 'sex')}><Text className={form.sex.value ? '' : styles.annotation}>{form.sex.value ? form.sex.value : '请选择性别'}</Text></Picker>
                  {form.sex.value ? '' : <Image className={styles.arrowImg} src={rightArrow}></Image>}
                </View>
              }
            />
          </FormItem>
          <FormItem >
            <Input
              prefix={<View className={styles['label-text']}>当前求职状态</View>}
              placeholder=''
              disabled
              // value={form.name.value}
              onInput={(value) => setFormFieldValue('name', value)}
              error={!!form.status.error}
              suffix={
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Picker mode='selector' range={selectDate.status} onChange={(e) => handleChange(e, 'status')}><Text className={form.status.value ? '' : styles.annotation}>{form.status.value ? form.status.value : '请选择当前状态'}</Text></Picker>
                  {form.status.value ? '' : <Image className={styles.arrowImg} src={rightArrow}></Image>}
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
              // disabled
              value={form.mobile.value}
              onInput={(value) => setFormFieldValue('mobile', value)}
              error={!!form.mobile.error}
              onFocus={() => { handleInputFocus('mobile') }}
              onBlur={() => { handleInputBlur('mobile') }}
            />
          </FormItem>
          <FormItem
            errorMsg={form.authCode.error}
          >
            <Input
              prefix={<View className={styles['label-text']}>验证码</View>}
              placeholder={form.authCode.value ? '' : '请输入验证码'}
              placeholderStyle='text-align:right'
              value={form.authCode.value}
              onInput={(value) => setFormFieldValue('authCode', value)}
              error={!!form.authCode.error}
              onFocus={() => { handleInputFocus('authCode') }}
              onBlur={() => { handleInputBlur('authCode') }}
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
              error={!!form.professionalType.error}
              suffix={
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Picker mode='selector' range={selectDate.professionalType} onChange={(e) => handleChange(e, 'professionalType')}><Text className={form.professionalType.value ? '' : styles.annotation}>{form.professionalType.value ? form.professionalType.value : '请选择求职类型'}</Text></Picker>
                  {form.professionalType.value ? '' : <Image className={styles.arrowImg} src={rightArrow}></Image>}
                </View>
              }
            />
          </FormItem>
          <FormItem >
            <Input
              prefix={<View className={styles['label-text']}>期望城市</View>}
              placeholder=''
              disabled
              onInput={(value) => setFormFieldValue('wishCity', value)}
              error={!!form.wishCity.error}
              suffix={
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Picker mode='selector' range={selectDate.wishCity} onChange={(e) => handleChange(e, 'wishCity')}><Text className={form.wishCity.value ? '' : styles.annotation}>{form.wishCity.value ? form.wishCity.value : '请选择期望工作城市'}</Text></Picker>
                  {form.wishCity.value ? '' : <Image className={styles.arrowImg} src={rightArrow}></Image>}
                </View>
              }
            />
          </FormItem>
          <View style='display: flex; justify-content: center'>
            <Button className={`${styles.button} ${isButtonActive ? styles.active : styles.inactive}`} onClick={isButtonActive && handleUserresume}>确定</Button>
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
          resumeInfo?.code !== 1 && Taro.switchTab(null)
        }}
        actions={[
          {
            title: '确定',
            onClick: () => {
              setIsDialogShow(false);
              resumeInfo?.code !== 1 && Taro.switchTab(null)  //完成后跳转
            },
            type: 'primary'
          },
        ]}
      />
    </View>
  );
};
export default MyResume;

