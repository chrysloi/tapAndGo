import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {HomeScreen} from './src';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.app}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
