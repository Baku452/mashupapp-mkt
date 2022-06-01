/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import UserContext from '../context/user.context';
import CardEvent from '../components/cardEvent';
import {DEV_BACKEND_URL} from '@env';
import axios from 'axios';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const MyEvents = () => {
  const {userID} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getEvents().then(() => setRefreshing(false));
  }, []);

  const getEvents = async () => {
    try {
      setLoading(true);
      const res = await axios(
        `${DEV_BACKEND_URL}api/v1/events/filter?userId=${userID}`,
      );
      setEvents(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getEvents();
  }, [refreshing]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : events.length > 0 ? (
        events.map(item => <CardEvent key={item._id} eventData={item} />)
      ) : (
        <Text>No Results</Text>
      )}
    </ScrollView>
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

export {MyEvents};
