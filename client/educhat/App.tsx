import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chat from './screens/Chat';
import { ChatInfo } from './types/ChatInfo';
import { Temporal } from '@js-temporal/polyfill';

export default function App() {

  return (
    <View style={styles.container}>
      <Chat id={1} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});