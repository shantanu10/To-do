import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import Body from '../components/Body';

export default function Home() {
  return (
    <View style={styles.main}>
      <Header />
      <Body />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  }
})