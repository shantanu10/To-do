import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  ToastAndroid,
  Platform
} from "react-native";

import _ from "lodash";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

export default function Body() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getListOfTodos();
  }, []);

  const showToast = message => {
    Platform.OS === "android"
      ? ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          20
        )
      : null;
  };

  const getListOfTodos = async () => {
    try {
      listOfTodos = await AsyncStorage.getItem("todo");
      if (listOfTodos) setTodoList(JSON.parse(listOfTodos));
    } catch (error) {
      console.log(error.message);
    }
  };

  const storeListOfTodos = async newTodoList => {
    try {
      await AsyncStorage.setItem("todo", JSON.stringify(newTodoList));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddTodo = newTodo => {
    if (todoList.find(todo => _.isEqual(todo, newTodo)))
      return Alert.alert(
        "Same task again... Seriously?",
        null,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );

    let newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    storeListOfTodos(newTodoList);
  };

  const handleEditTodo = (key, newTodo) => {
    if (todoList.find(todo => _.isEqual(todo, newTodo)))
      return Alert.alert(
        "This task already exists... Huh?",
        null,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );

    let newTodoList = todoList.filter(value => value.key !== key);
    newTodoList = [...newTodoList, newTodo];
    setTodoList(newTodoList);
    storeListOfTodos(newTodoList);
    showToast("Task updated!");
  };

  const handleDeleteTodo = key => {
    let newTodoList = todoList.filter(value => value.key !== key);
    setTodoList(newTodoList);
    storeListOfTodos(newTodoList);
    showToast("Task deleted!");
  };

  return (
    <View style={styles.body}>
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList
        todoList={todoList}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 24
  }
});
