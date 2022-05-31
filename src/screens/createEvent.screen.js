/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import UserContext from '../context/user.context';
import {DEV_BACKEND_URL} from '@env';
import axios from 'axios';

const CreateEvent = () => {
  const {val, token} = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCameraUpload = async () => {
    const options = {
      title: 'Select an image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await launchCamera();
    console.log(result.uri);
  };

  const handleImageUpload = async () => {
    const options = {
      title: 'Select an image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await launchImageLibrary();
    console.log(result);
  };
  return (
    <View
      style={{
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 80,
      }}>
      <Pressable onPress={handleImageUpload}>
        <MaterialCommunityIcons name="image" color={'#000'} size={50} />
        <Text>Upload a Image</Text>
      </Pressable>
      <Pressable onPress={handleCameraUpload}>
        <MaterialCommunityIcons name="camera" color={'#000'} size={50} />
        <Text>Upload a Image</Text>
      </Pressable>
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
});

export {CreateEvent};
