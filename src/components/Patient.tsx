import { StyleSheet, Text, View } from "react-native";
import React from "react";
import formatDate from "../../utils/formatDate";
import { Pressable } from "react-native";

type Props = {
  item: Patient;
  setModalVisible: (modalVisible: boolean) => void;
  editPatient: (id: string) => void;
};

const Patient = ({
  item: { id, name, owner, date },
  setModalVisible,
  editPatient,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate(date)}</Text>
      <Text style={styles.label}>Paciente:</Text>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.owner}>Propietario: {owner}</Text>
      </View>

      <View style={[styles.textContainer, styles.btnContainer]}>
        <Pressable
          style={[styles.btn, styles.editBtn]}
          onPress={() => {
            setModalVisible(true);
            editPatient(id);
          }}>
          <Text style={styles.btnText}>Editar</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.deleteBtn]}>
          <Text style={[styles.btnText, styles.deleteBtnText]}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Patient;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    borderBottomColor: "#415a77",
    borderBottomWidth: 2,
  },
  label: {
    color: "#0d1b2a",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    color: "#778da9",
    fontSize: 20,
    fontWeight: "700",
  },
  owner: {
    color: "#1b263b",
    fontSize: 14,
    fontWeight: "600",
  },
  date: {
    color: "#778da9",
    fontSize: 12,
    fontWeight: "400",
    alignSelf: "flex-end",
  },
  btnContainer: {
    marginTop: 20,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  editBtn: {
    backgroundColor: "#415a77",
  },
  deleteBtn: {
    borderWidth: 1,
    borderColor: "#415a77",
  },
  deleteBtnText: {
    color: "#415a77",
  },
  btnText: {
    color: "#e0e1dd",
    fontSize: 14,
    fontWeight: "700",
  },
});
