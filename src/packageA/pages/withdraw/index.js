import { useState,useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { View,Image, Text } from '@tarojs/components';
import { FormItem, Input } from '@/components/form';
import IconFont from '@/components/iconfont';
import Taro, {showToast,useDidShow} from '@tarojs/taro';
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
  const [bankInfo, setBankInfo] = useState({});
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
  const handleInputFocus = (type) =>{
    setFormFieldError(type,'');
  }
  const handleWithdrawAll =  () => {
    setForm({
      ...form,
      money: {
        value: balance,
        error: null,
      },
    })
  }
  const handleWithdraw = async () => {
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
      Taro.navigateTo({
        url: '/packageA/pages/steps/index',
        events: {
          acceptDataFromOpenedPage: function(data) {
            console.log(data)
          },
          someEvent: function(data) {
            console.log(data)
          }
        },
        success: function (result) {
          result.eventChannel.emit('acceptDataFromOpenerPage', { data: {
            ...bankInfo,
            balance: form.money.value,
          }
        })
        }
      })
    } catch (err) {
      showToast({
        icon: 'none',
        title: `${err.message}`,
      })
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
      url: '/packageA/pages/unbindCard/index',
      events: {
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: bankInfo })
      }
    })
  }
  useDidShow(() => {
    getWalletInfo();
    getBankInfo();
  })
  const isButtonActive = useMemo(() => !!(regExp.money(form.money.value) && form.money.value !== '' && form.money.value !== '0.00' && form.money.value < balance), [form]);
  return  (
    <View className={styles.withdraw}>
      <View className={styles.title}>到账银行</View>
      <View className={styles['bank-info']}>
        <Image className={styles['bank-logo']} src={require(`./img/${bankInfo?.bankCode ? bankInfo.bankCode : '8888'}.png`)} />
        <View className={styles['bank-name']}>{`${bankInfo?.bankName}(尾号${bankInfo.bankNo?.substr(bankInfo.bankNo?.length - 4)})`}</View>
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
              onInput={(value) => {
                if (regExp.money(value) || /^(([1-9]\d{0,9})|0)(\.)?$/.test(value) || value === '') {
                  setFormFieldValue('money', value);
                }else{
                  setFormFieldValue('money',form.money.value);
                }
                if(value > balance){
                  setFormFieldError('money','提现金额不能大于余额');
                }
              }}
              error={!!form.money.error}
              onFocus={() =>{ handleInputFocus('money') }}
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
      <View className={`${styles['withdraw-button']} ${isButtonActive ? styles.active : styles.inactive}`} onClick={isButtonActive && handleWithdraw}>
        <Button type='primary'>确认</Button>
      </View>
    </View>
  )
  }

export default observer(Withdraw);
