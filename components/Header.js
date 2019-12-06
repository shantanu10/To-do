import React, { useState, useEffect } from "react";
import * as Font from "expo-font";

import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFont = async () => {
    await Font.loadAsync({
      "open-sans-bold": require("../assets/fonts/Open_Sans/OpenSans-SemiBold.ttf")
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFont();
  }, []);

  return fontLoaded ? (
    <View style={styles.header}>
      <Text style={styles.heading}>To-Do</Text>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: "#112d63",
    paddingLeft: 10,
    paddingTop: 20,
    justifyContent: "center"
  },
  heading: {
    fontSize: 40,
    fontFamily: "open-sans-bold",
    color: "#caa060"
  }
});
