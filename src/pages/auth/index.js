import { useState } from "react";
import { View, Text, Image ,Button } from "@tarojs/components";
import { showToast } from '@tarojs/taro';
import { IconFont ,Dialog } from "@/components";
import { FormItem, Input } from '@/components/form';
import { regExp } from '@/constants';
import styles from "./Auth.module.scss";
import close from "./img/close.png";
import success from './img/success.png';

const initForm = {
  name: {
    value: '',
    error: '',
  },
  id: {
    value: '',
    error: '',
  },
}
const Auth = () => {
  const [isShow, setIsShow] = useState(true);
  const [form, setForm] = useState(initForm);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isFailShow,setIsFailShow] = useState(false);
  const [isSuccessShow,setIsSuccessShow] = useState(false);
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
    // TODO: 根据业务需求来
    if (!form.name.value) {
      setFormFieldError('name', '姓名不能为空');
      return false;
    }
    if (!regExp.idCard(form.id.value)) {
      setFormFieldError('id', '身份证号格式不正确');
      return false;
    }
    return true;
  }
  const handleSubmit = () => {
    if (validate()) {
      // TODO: submit
      showToast({
        icon: 'success',
        title: '提交成功！'
      })
    }
  }
  const handleInputBlur = (value ,type) => {
    if(!value && type === 'id'){
      setFormFieldError('id', '身份证号码不能为空');
    }
    if(!value && type === 'name'){
      setFormFieldError('name', '用户姓名不能为空');
    }
    if(form.id.value && form.name.value && validate()){
      setIsButtonActive(true);
    }
  }
  const handleInputFocus = (type) =>{
    setFormFieldError(type,'');
  }
  const handleCloseClick = () => {
    setIsShow(false);
  };
  return (
    <View className={styles.container}>
      {
        isShow ? (
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
              label={<Text>姓&nbsp;名</Text>}
              labelAlign='left'
              errorMsg={form.name.error}
            >
              <Input
                placeholder='请输入你的姓名'
                value={form.name.value}
                onInput={(value) => setFormFieldValue('name', value)}
                error={!!form.name.error}
                onBlur={(value) => handleInputBlur(value,'name')}
                onFocus={() =>{ handleInputFocus('name') }}
              />
            </FormItem>
            <FormItem
              label='身份证号'
              labelAlign='left'
              errorMsg={form.id.error}
            >
              <Input
                placeholder='请输入身份证号'
                value={form.id.value}
                onInput={(value) => setFormFieldValue('id', value)}
                error={!!form.id.error}
                onBlur={(value) => handleInputBlur(value,'id')}
                onFocus={() =>{ handleInputFocus('id') }}
              />
            </FormItem>
            <View className={styles.tips}>
              <IconFont name='exclamation' size='16'  />
              <Text className={styles['tips-text']}>确认填写本人真实信息，认证后不能修改</Text>
            </View>
            <View style='display: flex; justify-content: center'>
              <Button className={`${styles.button} ${isButtonActive ? styles.active : styles.inactive}`} onClick={handleSubmit}>开始认证</Button>
            </View>
      </View>
      <Dialog 
        title={<View className={styles['dialog-title']}>验证失败</View>}
        maskClosable
        visible={isFailShow}
        content={<View className={styles['dialog-tips']}>姓名和身份证号码不一致，请核查后重新输入。</View>}
        onClose={() => { setIsFailShow(false) }}
        actions={[
          {
            title: '确定',
            onClick: ()=>{ setIsFailShow(false) },
            type: 'primary'
          }
        ]}
      />
      <Dialog 
        maskClosable
        visible={isSuccessShow}
        content={
          <View className={styles['dialog-content']}>
            <Image src={success} className={styles['dialog-img']} />
            <View className={styles['dialog-subtitle']}>认证成功</View>
          </View>
        }
        showButton={false}
        onClose={() => { setIsSuccessShow(false) }}
      />
    </View>
  );
};
export default Auth;


