import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View,Image, Text } from '@tarojs/components';
import { FormItem, Input } from '@/components/form';
import IconFont from '@/components/iconfont';
import { regExp } from '@/constants';
import { Button } from '@/components';
import VerifyCode from '@/pages/components/verifyCode';
import styles from  './Withdraw.module.scss';


const initForm = {
  money: {
    value: '',
    error: '',
  },
  sms: {
    value: '',
    error: '',
  },
}
const Withdraw = () => {
  const [form, setForm] = useState(initForm);
  const [sendStatus, setSendStatus] = useState(true);
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
    if (!regExp.money(form.money.value) && type === 'money') {
      setFormFieldError('money', '提现金额格式不正确');
      return false;
    }
    return true;
  }
  const handleInputFocus = (type) =>{
    setFormFieldError(type,'');
  }
  const getCode = async () => {
   //TODO: 获取验证码
  };
  const handleWithdrawAll = async () => {
  }
  const handleListeners = () => {
    setSendStatus(true)
  };
  return  (
    <View className={styles.withdraw}>
      <View className={styles.title}>到账银行</View>
      <View className={styles['bank-info']}>
        <Image className={styles['bank-logo']} src={require('@/assets/images/iconIndex_active.png')} />
        <View className={styles['bank-name']}>中国农业银行储蓄卡(尾号1170)</View>
        <IconFont name='right' size={25} style={{marginLeft:'auto'}}></IconFont>
      </View>
      <View className={styles['bank-tips']}>预计2小时内到账</View>
      <View className={styles['withdraw-amount']}>
        <View className={styles['withdraw-amount-title']}>提现金额</View>
        <View className={styles['withdraw-amount-input']}>
          <FormItem
            errorMsg={form.money.error}
          >
            <Input
              prefix={<View className={styles['label-text']}>¥</View>}
              value={form.money.value}
              onInput={(value) => setFormFieldValue('money', value)}
              error={!!form.money.error}
              onFocus={() =>{ handleInputFocus('money') }}
              onBlur={() =>{ handleInputBlur('money') }}
              placeholder=''
            />
          </FormItem>
        </View>
        {
          !form.money.error
           ?<View className={styles['withdraw-amount-tips']}> 当前钱包余额9080.00元,<Text onClick={handleWithdrawAll} className={styles['withdraw-all']}>全部提现</Text></View> 
           :<View className={styles['withdraw-amount-tips']} />
        }
        <View className={styles['withdraw-code']}>
          <FormItem
            required
            labelAlign='right'
            errorMsg={form.sms.error}
          >
          <Input
            suffix={<VerifyCode className={styles['withdraw-amount-tips']} onClick={sendStatus && getCode} listeners={handleListeners} />}
            value={form.sms.value}
            onInput={(value) => setFormFieldValue('sms', value)}
            error={!!form.sms.error}
            placeholder=''
          />
        </FormItem>
        </View>
      </View>
      <View className={styles['withdraw-button']}>
        <Button type='primary'>确认</Button>
      </View>
    </View>
  )
  }

export default observer(Withdraw);
