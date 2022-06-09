import { useState ,useEffect} from "react";
import { FormItem,TextArea } from '@/components/form';
import { View } from "@tarojs/components";
import { ImagePicker ,Button ,Dialog} from "@/components";
import { httpRequest , getBaseUrl } from "@/utils";
import Taro , { showToast } from "@tarojs/taro";
import  authStore  from  '@/stores/auth'
import styles from "./Suggestion.module.scss";

const initForm = {
  textarea: {
    value: '',
    error: '',
  },
}
const Suggestion = () => {
  const [form, setForm] = useState(initForm);
  const [imgKeys, setImgKeys] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [selected, setSelected] = useState('');
  const [key, setKey] = useState(0);
  const [categories, setCategories] = useState([]);
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
      if( res.code === 0){
        setCategories(res.data);
      }else{
        showToast({
          icon: 'fail',
          title: res.msg
        })
      }
    } catch (err) {
      showToast({
        icon: 'fail',
        title: err.msg
      })
    }
  }
  const handleClick = (item) => {
    setSelected(item.categoryId);
  }
  const uploadFile = async(files,token) => {
    const baseUrl = await getBaseUrl()
    Taro.uploadFile({
      url: baseUrl+ 'phoenix-center-backend/client/member/feedback/image', 
      filePath: files?.url,
      name: 'file',
      header:{
        'X-User-Token': token,
      },
      success (res){
        const data = JSON.parse(res?.data);
        if(data.code === 0){
          setImgKeys([...imgKeys, { ...data.data, key: files?.url }]);
          setFileList(files);
        }else{
          showToast({
            icon: 'fail',
            title: data.msg || '上传图片错误'
          })
        }
      },
      fail(res){
        showToast({
          icon: 'fail',
          title: res.msg || '上传图片错误'
        })
      }
    })
  }
  const uploadFileH5 = async (files,token) => {
    const baseUrl = await getBaseUrl()
    var xhr = null ;
    if(window.XMLHttpRequest){
      xhr = new XMLHttpRequest();
    }else{
      xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    const formData = new FormData();
    formData.append('file',files.file)
    xhr.open("POST",baseUrl+ 'phoenix-center-backend/client/member/feedback/image');
    xhr.setRequestHeader("contentType",'multipart/form-data');
    xhr.setRequestHeader('X-User-Token',token);
    xhr.send(formData);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4 && xhr.status === 200){
        const res = JSON.parse(xhr.response);
        if(res.code !== 0){
          showToast({
            icon: 'fail',
            title: res.msg || '上传图片错误'
          })
        }
        setImgKeys([...imgKeys, { ...res.data, key: files?.url }]);
        setFileList(files);
      }
    }       
  }
  const handleUpload = async (files) => {
    if(imgKeys.some(item => item.key === files.url)){
      setImgKeys(imgKeys.filter(item => item.key !== files.url));
      return ;
    }
    const token = authStore.info.token;
    if(process.env.TARO_ENV ==='h5'){
      uploadFileH5(files,token);
    }else{
      uploadFile(files,token);
    }
    
  }
  const handleSubmit = async () =>{
    try {
      const res = await httpRequest.post('phoenix-center-backend/client/member/feedback/submit',{
        data: {
          content: form.textarea.value,
          categoryId: selected,
          imgKeys: imgKeys.map(item => item.fileKey),
        }
      });
      if( res.code === 1){
        showToast({
          icon: 'fail',
          title: res.msg
        })
      }else{
        setIsSuccessShow(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handlePreSubmit =  () => {
      if(!form.textarea.value || imgKeys.length <= 0 || !selected){
        setIsTipsShow(true)
        return ;
      }
      handleSubmit();
  }
  const resetView = () => {
    setIsSuccessShow(false);
    setForm(initForm);
    setImgKeys([]);
    setFileList([]);
    setSelected('');
    setKey(prev => prev + 1);
  }
  useEffect(()=>{
    getSuggestionList();
  },[])
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
              value={form.textarea.value}
              onInput={(value) => setFormFieldValue('textarea', value)}
            />
          <View className={styles.tips}>0/500</View>
        </FormItem>
        </View>
        <ImagePicker
          files={fileList}
          key={key}
          size={3}
          onChange={async (files) => {
            handleUpload(files);
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
        actions={[{ title: '确定', onClick: () => {resetView()} }]}

      />
    </View>
  );
};
export default Suggestion;





