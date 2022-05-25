import { View } from '@tarojs/components';
import { FormItem, Input, Checkbox, Radio, TextArea } from '@/components/form';
import { Button } from '@/components';

const Form = () => {
  return (
    <View style='padding: 10px'>
      <FormItem
        label='Input'
        required
      >
        <Input error />
      </FormItem>
      <FormItem
        label='Checkbox'
        required
      >
        <Checkbox />
      </FormItem>
      <FormItem
        label='TextArea'
        required
      >
        <TextArea />
      </FormItem>
      <FormItem
        label='Radio'
        required
      >
        <Radio />
      </FormItem>
      <View style='display: flex; justify-content: center'>
        <Button ghost>Reset</Button>
        <Button customStyles='margin-left: 10px'>Submit</Button>
      </View>
    </View>
  )
}

export default Form