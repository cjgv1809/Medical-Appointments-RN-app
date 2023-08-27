import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import formatDate from "../../utils/formatDate";
import { ScrollView } from "react-native";

type Props = {
  patient: Patient;
  setModalPatientInfo: (modalPatientInfo: boolean) => void;
  setPatient: (patient: Patient) => void;
};

const PatientInfo = ({
  patient: { date, email, name, owner, symptoms, phone },
  setModalPatientInfo,
  setPatient,
}: Props): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cancelButtonContainer}>
          <Pressable
            style={styles.cancelButton}
            onPress={() => {
              setModalPatientInfo(false);
              setPatient({} as Patient);
            }}>
            <Icon name="close" size={30} color="#e0e1dd" />
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Informacion sobre {name}</Text>
          <View style={styles.cardContainer}>
            <View style={styles.cardContainerSection}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.text}>{formatDate(date)}</Text>
            </View>
            <View style={styles.cardContainerSection}>
              <Text style={styles.label}>Propietario:</Text>
              <Text style={styles.text}>{owner}</Text>
            </View>
            <View style={styles.cardContainerSection}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.text}>{email}</Text>
            </View>
            <View style={styles.cardContainerSection}>
              <Text style={styles.label}>Telefono:</Text>
              <Text style={styles.text}>
                {phone ? phone : "No proporcionado"}
              </Text>
            </View>
            <View style={styles.cardContainerSection}>
              <Text style={styles.label}>Sintomas:</Text>
              <Text style={styles.text}>{symptoms}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0d1b2a",
    flex: 1,
    padding: 30,
    paddingBottom: 100,
  },
  content: {
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e0e1dd",
  },
  cancelButtonContainer: {
    position: "relative",
  },
  cancelButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  cardContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#1b263b",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContainerSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#e0e1dd",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e0e1dd",
  },
});
