import { useState ,useEffect} from "react";
import { FormItem,TextArea } from '@/components/form';
import { View } from "@tarojs/components";
import { ImagePicker ,Button ,Dialog} from "@/components";
import { httpRequest,getBaseUrl  } from "@/utils";
import { showToast,useDidShow } from "@tarojs/taro";
import styles from "./Suggestion.module.scss";

const initForm = {
  textarea: {
    value: '',
    error: '',
  },
}
const Suggestion = () => {
  const [key, setKey] = useState(0);
  const [form, setForm] = useState(initForm);
  const [imgKeys, setImgKeys] = useState([]);
  const [baseUrl, setBaseUrl] = useState('');
  const [selected, setSelected] = useState('');
  const [fontCount, setFontCount] = useState(0);
  const [categories, setCategories] = useState([{categoryName: '提建议', categoryId: '619b37da8274cc691d296802'}]);
  const [isTipsShow,setIsTipsShow] = useState(false);
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
  const getSuggestionList= async () =>{
    try {
      const res = await httpRequest.get('phoenix-center-backend/client/member/feedback/categories/inquiry');
      if (res?.code !== 0) {
        throw new Error(res.msg);
      }
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleClick = (item) => {
    setSelected(item.categoryId);
  }
  const handleSubmit = async () =>{
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/member/feedback/submit',{
        data: {
          content: form.textarea.value,
          categoryId: selected,
          imgKeys: imgKeys
        }
      });
      if( res.code !== 0){
        throw new Error(res.msg);
      }
      setIsSuccessShow(true);
    } catch (err) {
      showToast({
        icon: 'none',
        title: `${err.message}`
      })
    }
  }
  const handlePreSubmit =  () => {
      if(!form.textarea.value || imgKeys.length <= 0 || !selected){
        setIsTipsShow(true);
        return ;
      }
      handleSubmit();
  }
  const resetView = () => {
    setIsSuccessShow(false);
    setForm(initForm);
    setImgKeys([]);
    setSelected('');
    setKey(prev => prev + 1);
  }
  const getUploadBaseUrl = async () => {
    const base = await getBaseUrl();
    setBaseUrl(base);
  }
  useEffect(()=>{
    getSuggestionList();
  },[])
  useDidShow(() => {
    getUploadBaseUrl();
  })
  return (
    <View className={styles.container}>
        <View className={styles.title}>请选择您在哪些地方遇到了问题？</View>
        <View className={styles.options}>
          {
            categories.map(item => {
              return (<View className={`${styles.option} ${selected ===item.categoryId ? styles.active : ''}`} onClick={()=>{handleClick(item)}}>{item.categoryName}</View>)
            })
          }
        </View>
        <View>
          <FormItem>
            <TextArea
              clearable={false}
              placeholder='请补充说明您遇到的问题'
              maxlength={500}
              value={form.textarea.value}
              onInput={(value) => {
                setFormFieldValue('textarea', value);
                setFontCount(value.length);
              }}
            />
          <View className={styles.tips}>{fontCount}/500</View>
        </FormItem>
        </View>
        <ImagePicker
          key={key}
          size={4}
          uploadUrl={`${baseUrl}phoenix-center-backend/file/image/upload`}
          onChange={(fileKeys) => {
            setImgKeys(fileKeys)
          }}
          onFail={(msg) => {
            showToast({
              icon: 'fail',
              title: msg
            })
          }}
        />
        <View className={styles.submit} >
          <Button title='提交' onClick={handlePreSubmit} customStyles={{height:'50px'}} />
        </View>
        <Dialog
          title={<View className={styles['dialog-title']}>提示</View>}
          maskClosable
          visible={isTipsShow}
          content={<View className={styles['dialog-tips']}>填写说明和增加截图可帮我们尽快解决您遇到的问题，请继续填写哦</View>}
          onClose={() => { setIsTipsShow(false) }}
          actions={[{ title: '确定', onClick: () => { setIsTipsShow(false) } }]}
        />
        <Dialog
          maskClosable
          visible={isSuccessShow}
          title={<View className={styles['dialog-title']}>提示</View>}
          content={<View className={styles['dialog-tips']}>感谢你的支持,我们会做的更好</View>}
          onClose={() => {
            setIsSuccessShow(false);
          }}
          actions={[{ title: '确定', onClick: resetView }]}

        />
    </View>
  );
};
export default Suggestion;





