import { useState, useMemo } from 'react';
import { View, Text, Image ,Button } from "@tarojs/components";
import Taro from '@tarojs/taro';
import { httpRequest } from '@/utils';
import { IconFont ,Dialog } from "@/components";
import { FormItem, Input } from '@/components/form';
import { regExp } from '@/constants';
import styles from "./Auth.module.scss";
import close from "./img/close.png";

const initForm = {
  name: {
    value: '',
    error: '',
  },
  idNo: {
    value: '',
    error: '',
  },
}
const Auth = () => {
  const [isTipsShow,setIsTipsShow] = useState(true);
  const [isMove,setIsMove] = useState(false);
  const [form, setForm] = useState(initForm);
  const [isDialogShow,setIsDialogShow] = useState(false);
  const [authInfo,setAuthInfo] = useState({});
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
  const validate = () => {
    if (!regExp.name(form.name.value)) {
      setFormFieldError('name', '用户姓名格式不正确');
      return false;
    }
    if (!regExp.idCard(form.idNo.value)) {
      setFormFieldError('idNo', '身份证号码格式不正确');
      setIsMove(true)
      return false;
    }
    setIsMove(false);
    return true;
  }
  const handleInputFocus = (type) =>{
    setFormFieldError(type,'');
  }
  const handleCloseClick = () => {
    setIsTipsShow(false);
  };
  const handleUserAuth = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/certification/twoElement',{
        data: {
          name: form.name.value,
          idNo: form.idNo.value,
        }
      });
      setAuthInfo(res);
      setIsDialogShow(true);
    } catch (err) {
      setIsDialogShow(false);
    }
  }
  const handleSubmit = () => {
    if (validate()) {
      handleUserAuth();
    }
  }
  const isButtonActive = useMemo(() => !!(regExp.idCard(form.idNo.value) && regExp.name(form.name.value)), [form]);
  return (
    <View className={styles.container}>
      {
        isTipsShow ? (
          <View className={styles.prompt}>
            <Text>为了您的资金安全，提现需实名认证</Text>
            <Image
              src={close}
              className={styles.icon}
              onClick={handleCloseClick}
            />
          </View>
      ) : null
      }
      <View className={styles.form}>
            <FormItem
              errorMsg={form.name.error}
            >
              <Input
                prefix={<View className={styles['label-text']}>姓名</View>}
                placeholder='请输入你的姓名'
                value={form.name.value}
                onInput={(value) => setFormFieldValue('name', value)}
                error={!!form.name.error}
                onFocus={() =>{ handleInputFocus('name') }}
              />
            </FormItem>
            <FormItem
              errorMsg={form.idNo.error}
            >
              <Input
                prefix={<View className={styles['label-text']}>身份证号</View>}
                placeholder='请输入身份证号'
                value={form.idNo.value}
                maxlength={18}
                onInput={(value) => { setFormFieldValue('idNo', value) }}
                error={!!form.idNo.error}
                onFocus={() =>{ handleInputFocus('idNo') }}
              />
            </FormItem>
            <View className={styles.tips} style={isMove && {marginTop:'22px'}}>
              <IconFont name='exclamation' size='16'  />
              <Text className={styles['tips-text']}>确认填写本人真实信息，认证后不能修改</Text>
            </View>
            <View style='display: flex; justify-content: center'>
              <Button className={`${styles.button} ${isButtonActive ? styles.active : styles.inactive}`} onClick={isButtonActive && handleSubmit}>开始认证</Button>
            </View>
      </View>
      <Dialog
        title={<View className={styles['dialog-title']}>{authInfo?.code === 1 ? '验证失败' : '验证成功'}</View>}
        visible={isDialogShow}
        maskClosable
        content={<View className={styles['dialog-tips']}>{authInfo?.msg}</View>}
        onClose={() => {
          setIsDialogShow(false);
          authInfo?.code !== 1 && Taro.switchTab({url: '../my/index'})
        }}
        actions={[
          {
            title: '确定',
            onClick: ()=>{
              setIsDialogShow(false);
              authInfo?.code !== 1 && Taro.switchTab({url: '../my/index'})
            },
            type: 'primary'
          },
        ]}
      />
    </View>
  );
};
export default Auth;


