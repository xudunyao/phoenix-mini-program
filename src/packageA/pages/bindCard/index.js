import { useState, useMemo } from 'react';
import { View, Text,Button } from "@tarojs/components";
import { IconFont ,Dialog } from "@/components";
import { FormItem, Input } from '@/components/form';
import { regExp } from '@/constants';
import VerifyCode from '@/pages/components/verifyCode';
import styles from "./BindCard.module.scss";

const initForm = {
  name: {
    value: '',
    error: '',
  },
  cardId: {
      value: '',
      error: '',
    },
  phone: {
    value: '',
    error: '',
  },
  sms: {
    value:'',
    error:'',
  }
}
const BindCard = () => {
  const [isMove,setIsMove] = useState(false);
  const [form, setForm] = useState(initForm);
  const [data, setData] = useState({});
  const [sendStatus, setSendStatus] = useState(true);
  const [isDialogShow,setIsDialogShow] = useState(false);
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
  const handleInputBlur = (type) => {
    if (!regExp.name(form.name.value) && type === 'name') {
      setFormFieldError('name', '用户姓名格式不正确');
      return false;
    }
    if (!regExp.bankCard(form.cardId.value) && type === 'cardId') {
      setFormFieldError('cardId', '银行卡号格式不正确');
      setIsMove(true)
      return false;
    }
    if (!regExp.phone(form.phone.value) && type === 'phone') {
      setFormFieldError('phone', '手机号码格式不正确');
      return false;
    }
    if (!regExp.sms(form.sms.value) && type === 'sms') {
      setFormFieldError('sms', '验证码格式不正确');
      return false;
    }
    setIsMove(false);
    return true;
  }
  const handleInputFocus = (type) =>{
    setFormFieldError(type,'');
  }
  const handleBindCard = async () => {
   //TODO: 绑定银行卡
   setData({});
  }
  const isButtonActive = useMemo(() => {
    //TODO: 按钮是否可用
  }, [form]);
  return (
    <View className={styles.container}>
      <View className={styles.form}>
            <FormItem
              errorMsg={form.name.error}
            >
              <Input
                prefix={<View className={styles['label-text']}>持卡人姓名</View>}
                placeholder='请输入你的姓名'
                value={form.name.value}
                onInput={(value) => setFormFieldValue('name', value)}
                error={!!form.name.error}
                onFocus={() =>{ handleInputFocus('name') }}
                onBlur={() =>{ handleInputBlur('name') }}
              />
            </FormItem>
            <FormItem
              errorMsg={form.cardId.error}
            >
              <Input
                prefix={<View className={styles['label-text']}>银行卡号</View>}
                placeholder='请输入身份证号'
                value={form.cardId.value}
                maxlength={18}
                onInput={(value) => { setFormFieldValue('cardId', value) }}
                error={!!form.cardId.error}
                onFocus={() =>{ handleInputFocus('cardId') }}
                onBlur={() =>{ handleInputBlur('cardId') }}
              />
            </FormItem>
            <FormItem
              errorMsg={form.phone.error}
            >
              <Input
                prefix={<View className={styles['label-text']}>银行预留手机号</View>}
                placeholder='请输入预留手机号'
                value={form.phone.value}
                onInput={(value) => setFormFieldValue('phone', value)}
                error={!!form.phone.error}
                onFocus={() =>{ handleInputFocus('phone') }}
                onBlur={() =>{ handleInputBlur('phone') }}
                maxlength={11}
              />
            </FormItem>
            <View className={styles['verify-code']}>
              <FormItem
                required
                labelAlign='right'
                errorMsg={form.sms.error}
              >
              <Input
                suffix={<VerifyCode className={styles['withdraw-amount-tips']} onClick={sendStatus && getCode} listeners={handleListeners} />}
                value={form.sms.value}
                onInput={(value) => setFormFieldValue('sms', value)}
                onBlur={() =>{ handleInputBlur('sms') }}
                error={!!form.sms.error}
                style={{textAlign:'left'}}
                maxlength={6}
                placeholder='请输入6位验证码'
              />
              </FormItem>
            </View>
            <View className={styles.tips} style={isMove && {marginTop:'22px'}}>
              <IconFont name='exclamation' size='16'  />
              <Text className={styles['tips-text']}>提示：为保证资金安全，只能绑定实名认证本人持有的银行卡！</Text>
            </View>
            <View style='display: flex; justify-content: center'>
              <Button className={`${styles.button} ${isButtonActive ? styles.active : styles.inactive}`} onClick={isButtonActive && handleBindCard}>开始认证</Button>
            </View>
      </View>
      <Dialog
        title={<View className={styles['dialog-title']}>{data?.code === 1 ? '验证失败' : '验证成功'}</View>}
        visible={isDialogShow}
        maskClosable
        content={<View className={styles['dialog-tips']}>{data?.msg}</View>}
        onClose={() => {
          setIsDialogShow(false);
          //TODO: 跳转
        }}
        actions={[
          {
            title: '确定',
            onClick: ()=>{
              setIsDialogShow(false);
              //TODO: 跳转
            },
            type: 'primary'
          },
        ]}
      />
    </View>
  );
};
export default BindCard;


