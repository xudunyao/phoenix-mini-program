import { View } from '@tarojs/components';
import { showToast } from '@tarojs/taro';
import { FormItem, Input, CheckboxGroup, RadioGroup, TextArea } from '@/components/form';
import { Button } from '@/components';
import { useState } from 'react';

const options = [
  { label: 'option1', value: '1' },
  { label: 'option2', value: '2' },
]

const initForm = {
  input: {
    value: '',
    error: '',
  },
  textarea: {
    value: '',
    error: '',
  },
  radio: {
    value: '',
    error: '',
  },
  checkbox: {
    value: [],
    error: '',
  },
}

const Form = () => {
  const [form, setForm] = useState(initForm);

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
    if (!form.input.value) {
      setFormFieldError('input', 'Input 不能为空');
      return false;
    }

    return true;
  }

  const handleReset = () => {
    setForm(initForm);
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

  const handleInputBlur = (value) => {
    if (!value) {
      setFormFieldError('input', 'Input 不能为空');
    }
  }

  return (
    <View style='padding: 10px'>
      <FormItem
        label='Input'
        required
        labelAlign='right'
        errorMsg={form.input.error}
      >
        <Input
          value={form.input.value}
          onInput={(value) => setFormFieldValue('input', value)}
          error={!!form.input.error}
          onBlur={handleInputBlur}
        />
      </FormItem>
      <FormItem
        label='Checkbox'
        required
        labelAlign='right'
        errorMsg={form.checkbox.error}
      >
        <CheckboxGroup
          options={options}
          value={form.checkbox.value}
          onChange={(value) => setFormFieldValue('checkbox', value)}
        />
      </FormItem>
      <FormItem
        label='Radio'
        required
        labelAlign='left'
        errorMsg={form.radio.error}
      >
        <RadioGroup
          options={options}
          value={form.radio.value}
          onChange={(value) => setFormFieldValue('radio', value)}
          
        />
      </FormItem>
      <FormItem
        label='TextArea'
        errorMsg={form.textarea.error}
      >
        <TextArea
          value={form.textarea.value}
          onInput={(value) => setFormFieldValue('textarea', value)}
          error={!!form.textarea.error}
        />
      </FormItem>
      <View style='display: flex; justify-content: center'>
        <Button ghost onClick={handleReset}>Reset</Button>
        <Button customStyles='margin-left: 10px' onClick={handleSubmit}>Submit</Button>
      </View>
    </View>
  )
}

export default Form