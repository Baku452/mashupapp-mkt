import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserContextProvider} from './src/context/user.context';

import {Login} from './src/screens';
import Navigation from './src/navigations/tabs.navigation';

const Stack = createNativeStackNavigator();

const HomeGeneral = () => {
  return <Navigation />;
};

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            options={{header: () => null}}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Home"
            component={HomeGeneral}
            options={{header: () => null}}
          />
          {/* <Stack.Screen name="Profile" /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;
