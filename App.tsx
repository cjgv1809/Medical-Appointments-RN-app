/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Form from './src/components/Form';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddAppointment = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <Text style={styles.title}>Administrador de Citas</Text>
        <Text style={styles.subTitle}>Veterinaria</Text>
        <Pressable
          onPress={handleAddAppointment}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#0d1b2a' : '#415a77',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginVertical: 20,
            },
          ]}>
          <Text style={styles.buttonText}>Agregar Cita</Text>
        </Pressable>
      </View>

      <Form modalVisible={modalVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e1dd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#0d1b2a',
    fontSize: 30,
    fontWeight: '600',
  },
  subTitle: {
    color: '#778da9',
    fontSize: 24,
    fontWeight: '700',
  },
  buttonText: {
    color: '#e0e1dd',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default App;
