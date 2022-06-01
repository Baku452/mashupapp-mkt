import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Feed,
  MyEvents,
  Profile,
  CreateEvent,
  CustomSearch,
} from '../screens/index';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity style={styles.containerButton} onPress={onPress}>
    <View style={styles.containerButton__shape}>{children}</View>
  </TouchableOpacity>
);

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#7f5af0',
        tabBarShowLabel: false,
        headerStyle: {backgroundColor: 'black'},
        headerTitleStyle: {
          color: 'white',
        },
      }}>
      <Tab.Screen
        name="Upcoming Events"
        component={Feed}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Events"
        component={MyEvents}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={CreateEvent}
        tabBarOptions={{
          showLabel: false,
        }}
        options={{
          tabBarShowLabel: false,
          showLabel: false,
          labeled: false,
          tabBarIcon: ({size, focused}) => (
            <MaterialCommunityIcons name="plus" color={'#fff'} size={size} />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Artists"
        component={CustomSearch}
        options={{
          tabBarLabel: 'Artists',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="music" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Account"
        component={Profile}
        options={{
          tabBarLabel: 'My Account',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    top: -30,
    shadowColor: '#171717',
  },
  containerButton__shape: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    margin: 0,
    borderRadius: 35,
    backgroundColor: '#7f5af0',
  },
});

export default Navigation;
