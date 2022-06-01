/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import UserContext from '../context/user.context';
import {DEV_BACKEND_URL} from '@env';
import axios from 'axios';
import Auth0 from 'react-native-auth0';
const credentials = require('../../auth0-configuration');
const auth0 = new Auth0(credentials);

const CreateEvent = () => {
  const {token, userID} = useContext(UserContext);

  const [loadingInfo, setLoading] = useState(false);
  const [titleEvent, setTitleEvent] = useState(null);
  const [priceEvent, setPriceEvent] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [image, setImage] = useState();
  const [userInfo, setUserInfo] = useState();

  const handleCameraUpload = async () => {
    const {assets} = await launchCamera();
    setImage(...assets);
  };

  const handleImageUpload = async () => {
    const {assets} = await launchImageLibrary();
    setImage(...assets);
  };

  const submitData = () => {
    const data = new FormData();
    data.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    data.append('title', titleEvent);
    data.append('price', 99);
    data.append('startDate', startDate);
    data.append('endDate', endDate);
    data.append('artist', userInfo.name);
    data.append('artistGenre', userInfo.userMetadata.artistGenre);
    axios({
      method: 'post',
      url: `${DEV_BACKEND_URL}api/v1/events/`,
      data: data,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(function (response) {
        Alert.alert('Event Created');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const getUserMetadata = () => {
      setLoading(true);
      auth0
        .users(token)
        .getUser({id: userID})
        .then(res => setUserInfo(res))
        .catch(e => console.log(e));
      setLoading(false);
    };

    getUserMetadata();
  }, [token, userID]);
  return (
    <ScrollView>
      {loadingInfo || !userInfo ? (
        <ActivityIndicator />
      ) : (
        <View style={{alignSelf: 'center', padding: 20}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            {userInfo.name}
          </Text>
          <Text style={{textAlign: 'center'}}>
            {' '}
            {userInfo.userMetadata.artistGenre}
          </Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        onChangeText={setTitleEvent}
        value={titleEvent}
        placeholder="Event Title "
      />
      <TextInput
        style={styles.input}
        onChangeText={setPriceEvent}
        value={priceEvent}
        placeholder="Price Event"
        keyboardType="numeric"
      />
      <View
        style={{
          margin: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: 80,
        }}>
        <Text>Upload a Image or take a photo</Text>
        {image ? (
          <View style={styles.image}>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={{width: 200, height: 200}}
              source={{uri: image.uri}}
            />
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 50,
          }}>
          <Pressable style={{margin: 'auto'}} onPress={handleImageUpload}>
            <MaterialCommunityIcons name="image" color={'#000'} size={50} />
          </Pressable>
          <Pressable onPress={handleCameraUpload}>
            <MaterialCommunityIcons name="camera" color={'#000'} size={50} />
          </Pressable>
        </View>
        <View>
          <Text>Start Date</Text>

          <DatePicker
            style={{width: 280, height: 100}}
            date={startDate}
            onDateChange={setStartDate}
          />
        </View>
        <View>
          <Text>End Date</Text>

          <DatePicker
            style={{width: 280, height: 100}}
            date={endDate}
            onDateChange={setEndDate}
          />
        </View>
        <TouchableOpacity onPress={submitData} style={styles.buttonLogout}>
          <Text style={[styles.buttonLogout__text]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonLogout: {
    marginTop: 30,
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

export {CreateEvent};
