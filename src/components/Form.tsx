import {Text, SafeAreaView, Modal} from 'react-native';
import React from 'react';

type Props = {
  modalVisible: boolean;
};

const Form = ({modalVisible}: Props) => {
  return (
    <SafeAreaView>
      <Modal visible={modalVisible} animationType="slide">
        <Text>Modal</Text>
      </Modal>
    </SafeAreaView>
  );
};

export default Form;
