import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {DEV_BACKEND_URL} from '@env';
import axios from 'axios';
import CardEvent from '../components/cardEvent';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Feed = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
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

export {Feed};
