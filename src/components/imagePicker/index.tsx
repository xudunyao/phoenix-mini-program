import { Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { IconFont } from "@/components";
import { useState , useEffect } from 'react';
import { Props } from './types';
import img_add from "./img/img_add.png";
import './styles.scss';

const ImagePicker: React.FC<Props> = ({
  files=[],
  onChange,
  size=4,
  onFail=()=>{},
  onImageClick=()=>{},
}) => {
  const [showImgList, setShowImgList] = useState(files);
  const handleDelete = (item) => {
    setShowImgList(showImgList.filter(img => img.url !== item.url));
    onChange(item);
  }
  const handleUpload = () => {
    onImageClick(showImgList);
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        console.log('res',res)
        setShowImgList([...showImgList, { url: tempFilePaths[0] }]);
        onChange({ url: tempFilePaths[0] });
      },
      fail: function (err) {
        onFail(err);
      }
    })
  }
  return (
    <View className='wrapper'>
    {
      showImgList.map(item => {
        return (
          <View className='wrapper-img-item'>
            <Image src={item?.url} className='wrapper-img-item-img' />
            <View className='wrapper-img-item-close' onClick={()=>{ handleDelete(item)}} >
              <IconFont name='close' size={10} color='#ccc' />
            </View>
          </View>
        )
      })
    }
    {
      showImgList.length < Number(size) ? (<View className='wrapper-upload' onClick={handleUpload}>
        <Image src={img_add} style={{width:'32px',height:'32px'}} />
      </View>) : null
    }
</View>)
}

export default ImagePicker;