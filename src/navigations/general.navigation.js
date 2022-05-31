import React, {useContext, useState, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens';
import Navigation from './tabs.navigation';
import UserContext from '../context/user.context';

const Stack = createNativeStackNavigator();

const GeneralNavigation = () => {
  const {token} = useContext(UserContext);
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    console.log(token);
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [token]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {token === null ? (
        <Stack.Screen
          options={{header: () => null}}
          name="Login"
          component={Login}
        />
      ) : (
        <Stack.Screen
          name="Home"
          component={Navigation}
          options={{header: () => null}}
        />
      )}
    </Stack.Navigator>
  );
};

export default GeneralNavigation;
