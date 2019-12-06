import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert
} from "react-native";

export default function EditTodo({ todo, handleEditTodo, closeModal }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(todo.title);
  }, []);

  const handleInputChange = newValue => {
    setValue(newValue);
  };

  const handleEditButton = () => {
    if (value === "" || value === null)
      return Alert.alert(
        "Empty Task.. Seriously?",
        null,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );

    if (value === todo.title) return closeModal();

    handleEditTodo(todo.key, {
      key: value,
      title: value
    });
    setValue("");
    closeModal();
  };

  const handleCancelButton = () => {
    setValue("");
    closeModal();
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleInputChange}
        placeholder={"Edit your task..."}
        multiline={true}
        underlineColorAndroid="transparent"
        autoCapitalize="sentences"
        maxLength={140}
        returnKeyType="done"
      />
      <View style={styles.buttonContainer}>
        <TouchableHighlight style={[styles.button, styles.addButton]}>
          <Text style={styles.buttonText} onPress={handleEditButton}>
            Update
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText} onPress={handleCancelButton}>
            Cancel
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    minHeight: 35
  },

  input: {
    flexBasis: "70%",
    minHeight: 35,
    color: "#000",
    borderBottomWidth: 1,
    borderColor: "#caa060",
    fontSize: 16
  },

  buttonContainer: {
    flexBasis: "30%",
    minHeight: 70
  },

  button: {
    flex: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginLeft: 8,
    marginRight: 0,
    justifyContent: "center"
  },

  buttonText: {
    textAlign: "center",
    color: "#caa060",
    fontSize: 16
  },

  addButton: {
    backgroundColor: "#112d63",
    marginBottom: 15,
    borderColor: "#112d63"
  },

  cancelButton: {
    borderColor: "#caa060"
  }
});
