import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './home';
import FacilitiesScreen from './facilities';
import ServicesScreen from './services';
import ChatScreen from './chat';
import fontFamily from '../components/fontFamily';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? require('../assets/images/home_full.png')
              : require('../assets/images/home_border.png');
          } else if (route.name === 'Reception') {
            iconName = focused
              ? require('../assets/images/reception_fulll.png')
              : require('../assets/images/reception_border.png');
          } else if (route.name === 'Facilities') {
            iconName = focused
              ? require('../assets/images/facility_full.png')
              : require('../assets/images/facility_border.png');
          } else if (route.name === 'Services') {
            iconName = focused
              ? require('../assets/images/service_full.png')
              : require('../assets/images/service_border.png');
          }
          return <Image source={iconName} style={styles.icon} />;
        },
        tabBarStyle: {
          backgroundColor: '#202020',
          borderTopWidth: 0,
          paddingTop: 10,
          height: 70,
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#808080',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Reception" component={ChatScreen} />
      <Tab.Screen name="Facilities" component={FacilitiesScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: '#FFD700',
    fontSize: 15,
    fontFamily: fontFamily.Light,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default NavBar;
