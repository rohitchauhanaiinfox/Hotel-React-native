import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import fontFamily from './fontFamily';
import AppContext from '../Context/AppContext';

const HeaderView = () => {
  const {Context, dispatch} = useContext(AppContext);
  const {currentUserData, currentRoomData} = Context;

  return (
    <View style={styles.header}>
      <Text style={styles.welcomeText}>Welcome,</Text>
      <Text style={styles.nameText}>{currentUserData.name} 👋🏻</Text>
      <Text style={styles.roomText}>
        Room {currentRoomData[0]?.roomData.roomNumber || 'N/A'},{' '}
        {currentRoomData[0]?.roomData.category || 'N/A'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    color: '#808080',
    fontStyle: 'italic',
    fontSize: 16,
    fontFamily: fontFamily.Light,
    fontWeight: '400',
  },
  nameText: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: fontFamily.Regular,
    fontWeight: '600',
  },
  roomText: {
    paddingTop: 5,
    fontFamily: fontFamily.Light,
    color: '#808080',
    fontSize: 13,
  },
});

export default HeaderView;
