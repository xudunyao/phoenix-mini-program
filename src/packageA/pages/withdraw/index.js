import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View,Image, Text } from '@tarojs/components';
import { FormItem, Input } from '@/components/form';
import IconFont from '@/components/iconfont';
import Taro from '@tarojs/taro';
import { regExp } from '@/constants';
import { Button } from '@/components';
import { httpRequest } from '@/utils';
import numeral from 'numeral';
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
  const [balance, setBalance] = useState(0);
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
  const getWalletInfo = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/walletInfo');
      if(res?.code !== 0){
        throw new Error(res?.msg);
      }
      setBalance(res.data?.balance);
    } catch (err) {
      console.log('err',err)
    }
  }
  const handleInputBlur = (type) => {
    if (!regExp.money(form.money.value) && type === 'money') {
      setFormFieldError('money', '提现金额格式不正确');
      return false;
    }
    if(form.money.value > balance){
      setFormFieldError('money', '提现金额不能大于余额');
      return false;
    }
    return true;
  }
  const handleInputFocus = (type) =>{
    setFormFieldError(type,'');
  }

  const handleWithdrawAll = async () => {
    setForm({
      ...form,
      money: {
        value: balance,
        error: null,
      },
    })
  }
  const handleWithdraw = async () => {
    if(!handleInputBlur('money')){
      return;
    }
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/withdraw',{
        data: {
          amount: form.money.value,
        }
      });
      if(res?.code !== 0){
        throw new Error(res?.msg);
      }
      setForm(initForm);
    } catch (err) {
      console.log('err',err)
    }
  }
  const getBankInfo = async () => {
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/wallet/bankInfo');
      if(res?.code !== 0){
        throw new Error(res?.msg);
      }
      setBankInfo(res.data);
    } catch (err) {
      console.log('err',err)
    }
  }
  const handleClick = () => {
    Taro.navigateTo({
      url: '/packageA/pages/unbindCard/index'
    })
  }
  useEffect(() => {
    getWalletInfo();
    getBankInfo();
  },[])
  return  (
    <View className={styles.withdraw}>
      <View className={styles.title}>到账银行</View>
      <View className={styles['bank-info']}>
        <Image className={styles['bank-logo']} src={require('@/assets/images/iconIndex_active.png')} />
        <View className={styles['bank-name']}>中国农业银行储蓄卡(尾号1170)</View>
        <View style={{marginLeft:'auto'}} onClick={handleClick}>
          <IconFont name='right' size={25}></IconFont>
        </View>
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
           ?<View className={styles['withdraw-amount-tips']}> 当前钱包余额{numeral(balance).format('0,0.00')}元,<Text onClick={handleWithdrawAll} className={styles['withdraw-all']}>全部提现</Text></View> 
           :<View className={styles['withdraw-amount-tips']} />
        }
      </View>
      <View className={styles['withdraw-button']} onClick={handleWithdraw}>
        <Button type='primary'>确认</Button>
      </View>
    </View>
  )
  }

export default observer(Withdraw);
