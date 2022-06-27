import { Image, View } from '@tarojs/components'
import Taro, {showToast}from '@tarojs/taro';
import { IconFont } from "@/components";
import { useState , useEffect } from 'react';
import { storageKeys } from '@/constants';
import { Props } from './types';
import img_add from "./img/img_add.png";
import './styles.scss';

const ImagePicker: React.FC<Props> = ({
  onChange,
  size=4,
  onFail=()=>{},
  uploadUrl='',
}) => {
  const [imageList,setImageList] = useState<Object[]>([]);
  const handleDelete = (item) => {
    setImageList(imageList.filter((img:any) => img.key !== item.key));
  }
  const handleUpload = () => {
    const token = Taro.getStorageSync(storageKeys.TOKEN);
    Taro.chooseImage({
      count: size,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async function (res) {
        const tempFiles = res?.tempFiles;
        const filterFiles = tempFiles.filter((item: any) => {
          let fileSize = item.size;
          let type:any = process.env.TARO_ENV === 'h5' ? item?.type.split('/').pop() : item.path.split('.').pop();
          if( fileSize > 10*1024*1024 ){
            showToast({title:'图片大小不能超过10M',icon:'none'});
            return false;
          }
          if(!['jpg','jpeg','png'].includes(type)) {
            showToast({title:'图片格式不正确,只允许jpg,jpeg,png格式',icon:'none'});
            return false;
          }
          return true;
        }
        );
        const result = await Promise.allSettled<any[]>(filterFiles.map((item)=>{
          return new Promise((resolve,reject)=>{
             Taro.uploadFile({
              url: uploadUrl,
              filePath: item?.path,
              name: 'file',
              fileName: item?.originalFileObj?.name,
              header:{
                'X-User-Token': token,
              },
              success:function(reData){
                const mid = JSON.parse(reData?.data);
                if(mid.code === 1){
                  reject(mid.msg);
                  return;
                }
                resolve(mid.msg);
                setImageList((values)=>{
                  return [...values,{url:mid.data?.url,key:mid.data?.fileKey}];
                });
              },
              fail:function(e){
                onFail(e.errMsg);
              },
            })
          })
        }))
        const errorMsg = result.filter((item)=>item.status === 'rejected');
        if(errorMsg.length > 0){
          const msg = errorMsg.map((item:any)=>item.reason).join('\n');
          showToast({title:msg,icon:'none',duration:1000});
        }
      },
      fail: function (err) {
        onFail(err);
      }
    })
  }
  useEffect(()=>{
    const keyList = imageList.map((item:any)=>item.key);
    onChange(keyList)
  },[imageList])
  return (
    <View className='wrapper'>
    {
      imageList.map((item:any) => {
        return (
          <View className='wrapper-img-item' key={item.key}>
            <Image src={item?.url} className='wrapper-img-item-img' />
            <View className='wrapper-img-item-close' onClick={()=>{ handleDelete(item)}} >
              <IconFont name='close' size={10} color='#ccc' />
            </View> 
          </View>
        )
      })
    }
    {
      imageList.length < Number(size) ? (<View className='wrapper-upload' onClick={handleUpload}>
        <Image src={img_add} style={{width:'32px',height:'32px'}} />
      </View>) : null
    }
</View>)
}

export default ImagePicker;
