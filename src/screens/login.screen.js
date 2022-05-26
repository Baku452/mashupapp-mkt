import React, {useState} from 'react';
import {Alert, ImageBackground, Button, StyleSheet, Text} from 'react-native';
import Auth0 from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';

const credentials = require('../../auth0-configuration');
const auth0 = new Auth0(credentials);
const {BGAPP} = require('../../img/index');

const Login = ({navigation}) => {
  let [accessToken, setAccessToken] = useState(null);

  const onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
      })
      .then(resCredentials => {
        // Alert.alert('AccessToken: ' + credentials);
        setAccessToken(resCredentials.accessToken);
        getUserInfo(resCredentials.accessToken);
        navigation.navigate('Home');
      })
      .catch(error => console.log(error));
  };

  const onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert('Logged out!');
        setAccessToken(null);
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  };

  const getUserInfo = async tokenUser => {
    if (tokenUser !== null) {
      try {
        await AsyncStorage.setItem('@token', tokenUser);
      } catch (e) {
        console.log(e);
      }
      auth0.auth
        .userInfo({token: tokenUser})
        .then(async info => {
          const [, idUser] = info.sub.split('|');
          try {
            await AsyncStorage.setItem('@userID', idUser);
          } catch (e) {
            console.log(e);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  let loggedIn = accessToken !== null;
  return (
    <ImageBackground source={BGAPP} style={styles.container}>
      <Text style={styles.header}> Mashup Login</Text>
      <Text>You are{loggedIn ? ' ' : ' not '}logged in. </Text>
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </ImageBackground>
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

export {Login};
