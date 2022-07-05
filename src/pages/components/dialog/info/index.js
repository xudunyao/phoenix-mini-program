import { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@/components';
import { FormItem, Input } from '@/components/form';
import { View } from '@tarojs/components';
import { httpRequest } from '@/utils';
import { regExp } from '@/constants';
import VerifyCode from '../../verifyCode';
import styles from './Info.module.scss';

const initForm = {
  name: {
    value: '',
    error: '',
  },
  phone: {
    value: '',
    error: '',
  },
  sms: {
    value: '',
    error: '',
  },
};
const Info = ({
  title,
  visible,
  onSubmit,
  onCancel,
}) => {
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
  };

  const setFormFieldError = (fieldName, error) => {
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        error,
      },
    })
  };

  const validate = () => {
    // TODO: 根据业务需求来
    if (!form.name.value) {
      setFormFieldError('name', '姓名不能为空！');
      return false;
    }
    console.log(form.phone.value)
    if (!form.phone.value) {
      setFormFieldError('phone', '手机号不能为空！');
      return false;
    }
    if(!regExp.phone(form.phone.value)){
      setFormFieldError('phone', '手机号格式不正确！');
      return false;
    }
    if(!form.sms.value) {
      setFormFieldError('sms', '验证码不能为空！');
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (validate()) {
      onSubmit(form);
    }
  };
  const getCode = async (cb) => {
    
    if(regExp.phone(form.phone.value)){
      try {
        const res = await httpRequest.post('phoenix-center-backend/sms/send',{
          data: {
            mobile: form.phone.value,
            type: 'infoVerification'
          }
        });
        if (res?.code !== 0) {
          showToast({
            title: res.msg
          })
        }
        cb && cb();
        setSendStatus(false)
      } catch (err) {
        console.log(err);
      }
    } else {
      setFormFieldError('phone', '请输入正确的手机号码');
    }
    
  };
  const handleListeners = () => {
    setSendStatus(true)
  };
  return (
    <Dialog 
      title={title}
      maskClosable
      visible={visible}
      content={
        <View className={styles.content}>
          <FormItem
            required
            labelAlign='top'
            label='姓名'
            errorMsg={form.name.error}
          >
            <Input
              placeholder='请输入姓名'
              value={form.name.value}
              onInput={(value) => setFormFieldValue('name', value)}
              error={!!form.name.error}
            />
          </FormItem>
          <FormItem
            required
            labelAlign='top'
            label='手机号'
            errorMsg={form.phone.error}
          >
            <Input
              placeholder='请输入手机号'
              value={form.phone.value}
              maxlength={11}
              onInput={(value) => setFormFieldValue('phone', value)}
              error={!!form.phone.error}
            />
          </FormItem>
          <FormItem
            required
            labelAlign='top'
            label='验证码'
            errorMsg={form.sms.error}
          >
            <Input
              placeholder='请输入验证码'
              suffix={<VerifyCode className={styles.send} onClick={sendStatus && getCode} listeners={handleListeners} />}
              value={form.sms.value}
              maxlength={6}
              onInput={(value) => setFormFieldValue('sms', value)}
              error={!!form.sms.error}
            />
          </FormItem>
        </View>
      }
      actions={
        [{
          title: '取消',
          onClick: () => { onCancel() },
          type: 'default',
          size: 'default'
        }, {
          title: '确定',
          onClick: () => {handleSubmit()},
          type: 'primary',
          size: 'default'
        }]
      }
    />
  )
};
Info.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};
Info.defaultProps = {
  title: '',
  visible: false,
  onSubmit: () => {},
  onCancel: () => {}
};
export default Info;