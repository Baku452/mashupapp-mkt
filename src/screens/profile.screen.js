import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Profile = () => {
  return (
    <View>
      <Text style={styles.header}> Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export {Profile};
