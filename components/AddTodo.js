import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  Keyboard
} from "react-native";

export default function Body({ handleAddTodo }) {
  const [value, setValue] = useState("");

  const handleInputChange = newValue => {
    setValue(newValue);
  };

  const handleAddButton = () => {
    if (value === "" || value === null)
      return Alert.alert(
        "Empty Task.. Seriously?",
        null,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );

    handleAddTodo({
      key: value,
      title: value
    });
    setValue("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleInputChange}
        placeholder={"Write your task..."}
        multiline={true}
        underlineColorAndroid="transparent"
        autoCapitalize="sentences"
        maxLength={140}
        returnKeyType="done"
      />
      <TouchableHighlight style={styles.addButton}>
        <Text style={styles.addButtonText} onPress={handleAddButton}>
          Add
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 35,
    marginBottom: 24
  },

  input: {
    flex: 4,
    color: "#000",
    borderBottomWidth: 1,
    borderColor: "#caa060"
  },

  addButton: {
    flex: 1,
    borderStyle: "solid",
    borderColor: "#112d63",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#112d63",
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginLeft: 15,
    marginRight: 8
  },

  addButtonText: {
    textAlign: "center",
    color: "#caa060",
    fontSize: 16
  }
});
