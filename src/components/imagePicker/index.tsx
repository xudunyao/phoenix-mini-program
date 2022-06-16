import { Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro';
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
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const url = res.tempFilePaths[0];
        const name = res?.tempFiles[0]?.originalFileObj?.name;
        const token = Taro.getStorageSync(storageKeys.TOKEN);
        uploadUrl && Taro.uploadFile({
          url: uploadUrl,
          filePath: url,
          name: 'file',
          fileName:name,
          header:{
            'X-User-Token': token,
          },
          success (result){
            const mid = JSON.parse(result?.data);
            setImageList([...imageList,{url:mid.data?.url,key:mid.data?.fileKey}]);
          },
          fail(result){
            onFail(result);
          }
        })
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
