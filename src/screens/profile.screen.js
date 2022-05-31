import React, {useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Auth0 from 'react-native-auth0';
import UserContext from '../context/user.context';

const credentials = require('../../auth0-configuration');
const auth0 = new Auth0(credentials);

const Profile = () => {
  const {setToken} = useContext(UserContext);

  const [userInfo, setUserInfo] = useState();
  const [loadingInfo, setLoading] = useState(false);

  const onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert('Logged out!');
        setToken(null);
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  };
  useEffect(() => {
    AsyncStorage.getItem('userInfo')
      .then(value => {
        if (value) {
          setLoading(true);
          setUserInfo(JSON.parse(value));
          setLoading(false);
        }
      })
      .catch(e => {
        throw new Error('No token saved', e);
      });
  }, []);
  return (
    <View>
      {loadingInfo || !userInfo ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.header}> {userInfo.name}</Text>

          <Image
            style={{width: 50, height: 50, borderRadius: 400 / 2}}
            source={{uri: userInfo.picture}}
          />
        </>
      )}
      <TouchableOpacity onPress={onLogout} style={styles.button}>
        <Text style={[styles.button__title]}>Log Out</Text>
      </TouchableOpacity>
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
    // color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export {Profile};
