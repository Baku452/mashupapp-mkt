import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserContextProvider} from './src/context/user.context';
import UserContext from './src/context/user.context';

import {Login} from './src/screens';
import Navigation from './src/navigations/tabs.navigation';
import GeneralNavigation from './src/navigations/general.navigation';

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <GeneralNavigation />
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;
