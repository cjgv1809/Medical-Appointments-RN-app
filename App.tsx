/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Form from "./src/components/Form";
import { FlatList } from "react-native";
import Patient from "./src/components/Patient";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [modalVisible, setModalVisible] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>({} as Patient);

  const handleAddAppointment = () => {
    setModalVisible(!modalVisible);
  };

  const editPatient = (id: string) => {
    const patientFiltered = patients.find(
      (patientToEdit) => patientToEdit.id === id,
    );

    if (!patientFiltered) return;

    setPatient(patientFiltered);
  };

  const deletePatient = (id: string) => {
    Alert.alert(
      "Eliminar paciente",
      "¿Estás seguro que quieres eliminar este paciente? Esta acción no se puede deshacer",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Si, Eliminar",
          onPress: () => {
            const patientsFiltered = patients.filter(
              (patientToDelete) => patientToDelete.id !== id,
            );

            setPatients(patientsFiltered);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={styles.content}>
        <Text style={styles.title}>Administrador de Citas</Text>
        <Text style={styles.subTitle}>Veterinaria</Text>
        <Pressable
          onPress={handleAddAppointment}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#0d1b2a" : "#415a77",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginVertical: 20,
            },
          ]}>
          <Text style={styles.buttonText}>Agregar Cita</Text>
        </Pressable>
      </View>

      {patients.length > 0 ? (
        <View style={styles.patientContainer}>
          <Text style={styles.subTitle}>Administra tus citas</Text>
          <FlatList
            data={patients}
            renderItem={({ item }) => (
              <Patient
                item={item}
                setModalVisible={setModalVisible}
                editPatient={editPatient}
                deletePatient={deletePatient}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <Text style={styles.subTitle}>No hay citas</Text>
      )}

      <Form
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        patients={patients}
        setPatients={setPatients}
        patient={patient}
        setPatient={setPatient}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e1dd",
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  patientContainer: {
    marginVertical: 20,
    flex: 1,
  },
  title: {
    color: "#0d1b2a",
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
  },
  subTitle: {
    color: "#778da9",
    fontSize: 24,
    fontWeight: "700",
  },
  buttonText: {
    color: "#e0e1dd",
    fontSize: 20,
    fontWeight: "700",
  },
});

export default App;
