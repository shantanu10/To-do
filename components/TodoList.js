import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";

import { ListItem } from "react-native-elements";
import { Overlay } from "react-native-elements";

import EditTodo from "./EditTodo";

function Item({ item, handleDeleteTodo, openModal }) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => openModal(item)}
          onLongPress={() => {}}
        >
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.delete}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTodo(item.key)}
          onLongPress={() => {}}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TodoList({
  todoList,
  handleDeleteTodo,
  handleEditTodo
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  const renderItem1 = ({ item }) => {
    return (
      <Item
        item={item}
        handleDeleteTodo={handleDeleteTodo}
        openModal={todo => {
          setModalVisible(true);
          setSelectedTodo(todo);
        }}
      />
    );
  };

  const renderItem2 = ({ item }) => {
    return (
      <ListItem
        title={item.title}
        subtitle={item.title}
        bottomDivider
        chevron
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={todoList} renderItem={renderItem1} />
      <Overlay
        animationType="slide"
        isVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        width="auto"
        height="auto"
        windowBackgroundColor="rgba(0, 0, 0, .7)"
      >
        <View style={styles.modal}>
          <EditTodo
            todo={selectedTodo}
            handleEditTodo={handleEditTodo}
            closeModal={() => setModalVisible(false)}
          />
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "flex-start",
    paddingVertical: 24
  },

  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  item: {
    width: "70%",
    backgroundColor: "#112d63",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 1
  },

  title: {
    fontSize: 16,
    color: "#fff"
  },

  delete: {
    width: "30%"
  },

  deleteButton: {
    borderStyle: "solid",
    borderColor: "#caa060",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 15,
    marginRight: 8
  },

  deleteButtonText: {
    textAlign: "center",
    color: "#caa060"
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    minHeight: 100,
    borderStyle: "solid",
    borderColor: "#caa060",
    borderWidth: 1,
    borderRadius: 5
  }
});
