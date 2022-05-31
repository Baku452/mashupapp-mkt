import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {DEV_BACKEND_URL} from '@env';
import UserContext from '../context/user.context';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 226,
    resizeMode: 'cover',
  },
  boxContent: {
    color: 'white',
    padding: 20,
    width: '100%',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    fontWeight: 'bold',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  textWhite: {},

  button: {
    backgroundColor: '#2cb67d',
    borderRadius: 25,
    fontWeight: 'bold',
    maxWidth: '50%',
    alignSelf: 'center',
  },
  button__title: {
    padding: 10,
    paddingHorizontal: 30,
    color: 'white',
  },
});

const CardEvent = ({eventData}) => {
  const {userID} = useContext(UserContext);
  console.log(userID);
  const subscribeToEvent = async idEvent => {
    try {
      const eventUpdated = await axios.put(
        `${DEV_BACKEND_URL}api/v1/events/${idEvent}/attende?userId=${userID}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const buttonClickedHandler = () => {
    subscribeToEvent(eventData._id);
  };

  return (
    <View style={[styles.container]}>
      <Image style={styles.image} source={{uri: eventData.imageURL}} />
      <View style={styles.boxContent}>
        <Text style={[styles.textWhite, styles.textBold, styles.textCenter]}>
          {eventData.title}
        </Text>
        <View>
          <Text style={[styles.textWhite, styles.textBold]}>
            {eventData.artistName}
          </Text>
          <Text style={styles.textWhite}>{eventData.artistGenre}</Text>
        </View>
        <TouchableOpacity onPress={buttonClickedHandler} style={styles.button}>
          <Text style={[styles.button__title]}>Join Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardEvent;
