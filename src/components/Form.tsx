import {
  Text,
  SafeAreaView,
  Modal,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import DatePicker from "react-native-date-picker";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
  modalVisible?: boolean;
  closeModal: () => void;
  setPatients: (patients: Patient[]) => void;
  patients: Patient[];
  patient: Patient;
  setPatient: (patient: Patient) => void;
  savePatientsInStorage: (patients: Patient[]) => void;
};

const Form = ({
  modalVisible,
  closeModal,
  setPatients,
  patients,
  patient: patientToEdit,
  setPatient: setPatientToEdit,
  savePatientsInStorage,
}: Props): React.JSX.Element => {
  const [id, setId] = useState<string>("");
  const [patient, setPatient] = useState<Patient>({
    id: "",
    name: "",
    owner: "",
    email: "",
    phone: "",
    date: new Date(),
    symptoms: "",
  });

  useEffect(() => {
    if (Object.keys(patientToEdit).length !== 0) {
      setId(patientToEdit.id);
      // Convert the date string to a Date object
      const editedDate = new Date(patientToEdit.date);

      setPatient({
        ...patientToEdit,
        date: editedDate,
      });
    }
  }, [patientToEdit]);

  const handleAddPatient = () => {
    // Validate form
    if (
      [patient.name, patient.owner, patient.email, patient.symptoms].some(
        (field) => !field.trim(),
      )
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    // Add patient to state
    const newPatient = { ...patient };

    // Check if patient is new or edited
    if (id) {
      // Edit patient in state
      const patientsEdited = patients.map((patientState) =>
        patientState.id === id ? newPatient : patientState,
      );

      setPatients(patientsEdited);
      setPatientToEdit({} as Patient);

      // Save patients in storage
      savePatientsInStorage(patientsEdited);
    } else {
      // Add new patient
      newPatient.id = Date.now().toString();
      setPatients([...patients, newPatient]);

      // Save patients in storage
      savePatientsInStorage([...patients, newPatient]);
    }

    // Reset form
    setPatient({
      id: "",
      name: "",
      owner: "",
      email: "",
      phone: "",
      date: new Date(),
      symptoms: "",
    });

    // Close modal
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setPatientToEdit({} as Patient);
    setId("");
    setPatient({
      id: "",
      name: "",
      owner: "",
      email: "",
      phone: "",
      date: new Date(),
      symptoms: "",
    });
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <SafeAreaView style={styles.content}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.mainContent}
            contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.title}>
              {patientToEdit.id ? "Editar" : "Nueva"} Cita
            </Text>

            <Pressable style={styles.cancelButton} onPress={handleCloseModal}>
              <Icon name="close" size={30} color="#e0e1dd" />
            </Pressable>

            <View style={styles.field}>
              <Text style={styles.label}>Nombre del paciente</Text>
              <TextInput
                placeholder="Ingrese nombre del paciente"
                placeholderTextColor={"#8d99ae"}
                style={styles.input}
                value={patient.name}
                onChangeText={(text) =>
                  setPatient({
                    ...patient,
                    name: text,
                  })
                }
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Nombre del propietario</Text>
              <TextInput
                placeholder="Ingrese nombre del propietario"
                placeholderTextColor={"#8d99ae"}
                style={styles.input}
                value={patient.owner}
                onChangeText={(text) =>
                  setPatient({
                    ...patient,
                    owner: text,
                  })
                }
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Ingrese email"
                placeholderTextColor={"#8d99ae"}
                style={styles.input}
                keyboardType="email-address"
                value={patient.email}
                onChangeText={(text) =>
                  setPatient({
                    ...patient,
                    email: text,
                  })
                }
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Telefono</Text>
              <TextInput
                placeholder="Ingrese telefono"
                placeholderTextColor={"#8d99ae"}
                style={styles.input}
                keyboardType="phone-pad"
                value={patient.phone}
                onChangeText={(text) =>
                  setPatient({
                    ...patient,
                    phone: text,
                  })
                }
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Fecha alta</Text>
              <View style={styles.datePickerContainer}>
                <DatePicker
                  date={patient.date}
                  locale="es"
                  onDateChange={(date) =>
                    setPatient({
                      ...patient,
                      date: date,
                    })
                  }
                  theme="dark"
                  fadeToColor="#0d1b2a"
                  minimumDate={new Date()}
                />
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Sintomas</Text>
              <TextInput
                placeholder="Ingrese sintomas"
                placeholderTextColor={"#8d99ae"}
                textAlignVertical="top"
                style={[styles.input, styles.textarea]}
                multiline
                numberOfLines={4}
                value={patient.symptoms}
                onChangeText={(text) =>
                  setPatient({
                    ...patient,
                    symptoms: text,
                  })
                }
                onSubmitEditing={handleAddPatient}
              />
            </View>

            <Pressable style={styles.addPatientBtn} onPress={handleAddPatient}>
              <Text style={styles.addPatientBtnText}>
                {patientToEdit.id ? "Editar" : "Agregar"} Paciente
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#0d1b2a",
    flex: 1,
    padding: 30,
    paddingBottom: 100,
  },
  mainContent: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e0e1dd",
  },
  cancelButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  field: {
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#e0e1dd",
  },
  input: {
    borderColor: "#e0e1dd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: "#e0e1dd",
  },
  textarea: {
    height: 100,
  },
  datePickerContainer: {
    color: "#e0e1dd",
    borderRadius: 10,
    borderColor: "#e0e1dd",
    borderWidth: 1,
    overflow: "hidden",
  },
  addPatientBtn: {
    backgroundColor: "#e0e1dd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 40,
    alignItems: "center",
  },
  addPatientBtnText: {
    color: "#0d1b2a",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Form;
