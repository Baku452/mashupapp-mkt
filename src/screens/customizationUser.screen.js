import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import UserContext from '../context/user.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DEV_BACKEND_URL} from '@env';
import axios from 'axios';
import CardEvent from '../components/cardEvent';

const CustomSearch = () => {
  const {val, token} = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(DEV_BACKEND_URL + 'api/v1/events/');
  const getEvents = async () => {
    try {
      setLoading(true);
      const res = await axios(`${DEV_BACKEND_URL}api/v1/events/`);
      setEvents(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  return <Text>Coming Soon</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export {CustomSearch};
