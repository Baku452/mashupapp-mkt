/* eslint-disable react-native/no-inline-styles */
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

export const TextInfo = ({data}) => {
  return <Text style={styles.textInfo}>{data}</Text>;
};

const Profile = () => {
  const {token, userID, setToken} = useContext(UserContext);

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
    const getUserMetadata = () => {
      auth0
        .users(token)
        .getUser({id: userID})
        .then(res => setUserInfo(res))
        .catch(e => console.log(e));
    };

    getUserMetadata();
  }, [token, userID]);
  return (
    <View>
      {loadingInfo || !userInfo ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.containerInfo}>
            <View>
              <Text style={styles.header}>{userInfo.name}</Text>
              <TextInfo data={`Email: ${userInfo.email}`} />
              {userInfo.userMetadata ? (
                <TextInfo
                  data={`Music Genre: ${userInfo.userMetadata.artistGenre}`}
                />
              ) : (
                <TextInfo data={'You´re not an artist yet'} />
              )}
            </View>
            <Image
              style={{width: 50, height: 50, borderRadius: 400 / 2}}
              source={{uri: userInfo.picture}}
            />
          </View>
        </>
      )}
      <TouchableOpacity onPress={onLogout} style={styles.buttonLogout}>
        <Text style={[styles.buttonLogout__text]}>Log Out</Text>
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
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 30,
  },
  containerInfo: {
    flexDirection: 'row',
    margin: 30,
  },
  textInfo: {
    marginBottom: 20,
  },
  buttonLogout: {
    backgroundColor: '#7f5af0',
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  buttonLogout__text: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export {Profile};
