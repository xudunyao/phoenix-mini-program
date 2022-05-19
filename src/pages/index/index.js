import { useState } from 'react';
import { useDidHide, useDidShow, navigateTo } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { Modal, Dialog } from '@/components';
import List from './list';
import Counter from './counter';

import styles from  './Index.module.scss'

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  useDidHide(() => {
    console.log('Index Did Hide');
  });
  useDidShow(() => {
    console.log('Index Did Show');
  })

  const handleFormClick = () => {
    navigateTo({
      url: '/pages/form/index'
    })
  }

  return (
    <View className={styles.container}>
      <View style='display: flex; align-items: center'>
        <Button size='mini' type='primary' onClick={handleFormClick}>表单</Button>
        <Button size='mini' type='primary' onClick={() => setModalVisible(true)}>Modal</Button>
        <Button size='mini' type='primary' onClick={() => setDialogVisible(true)}>Dialog</Button>
        <Counter />
      </View>
      <List />
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title='Test Modal'
      >
        点击黑色遮罩默认可关闭
      </Modal>
      <Dialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        title='Test Dialog'
        actions={[
          {title: '确认', type: 'primary'},
          {title: '取消', type: 'default'},
        ]}
        content='点击黑色遮罩默认不可关闭'
      />
    </View>
  )
};

export default Index
