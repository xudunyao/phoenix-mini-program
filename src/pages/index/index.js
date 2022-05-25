import { useState } from 'react';
import { useDidHide, useDidShow, navigateTo } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Modal, Dialog, Button, NavBar } from '@/components';
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
  };

  const handleToResult = () => {
    navigateTo({
      url: '/pages/result/index'
    })
  };
  return (
    <View className={styles.container}>
      <NavBar showBack />
      <View style='display: flex; align-items: center; justify-content: space-between; flex-wrap: no-wrap;padding-top:100px'>
        <Button
          type='primary'
          onClick={handleFormClick}
          ghost
        >表单</Button>
        <Button
          size='mini'
          type='primary'
          ghost
          onClick={() => setModalVisible(true)}
        >Modal</Button>
        <Button
          size='mini'
          type='primary'
          ghost
          disabled
          onClick={() => setModalVisible(true)}
        >Disabled</Button>
        <Button
          size='mini'
          type='primary'
          ghost
          round={false}
        >NoRound</Button>
      </View>
      <View style='display: flex; align-items: center; margin-top: 10Px; justify-content: space-between; flex-wrap: no-wrap'>
        <Button
          size='mini'
          type='primary'
          loading
          onClick={() => setModalVisible(true)}
        >Modal</Button>
        <Button
          size='mini'
          type='primary'
          onClick={() => setDialogVisible(true)}
        >Dialog</Button>
        <Button
          size='mini'
          type='primary'
          onClick={() => setDialogVisible(true)}
          disabled
        >Disabled</Button>
        <Button
          size='mini'
          type='primary'
          round={false}
          loading
        >NoRound</Button>
      </View>
      <View style='display: flex; align-items: center; margin-top: 10Px'>
        <Button
          size='mini'
          type='primary'
          onClick={handleToResult}
        >结果页</Button>
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
