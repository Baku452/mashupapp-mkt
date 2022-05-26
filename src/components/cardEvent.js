import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  image: {
    width: 320,
    height: 226,
  },
});

const CardEvent = ({eventData}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: eventData.imageURL}} />
      <Text>{eventData.title}</Text>
    </View>
  );
};

export default CardEvent;
