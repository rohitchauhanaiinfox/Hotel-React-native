import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import fontFamily from '../components/fontFamily';
import {apiGet} from '../service/client';
import local_storage from '../constants/local_storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [doorClosed, setDoorClosed] = useState(true);
  const [username, setUserName] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [roomType, setRoomType] = useState('');
  const [hotelId, setHotelId] = useState('');
  const [scenes, setScenes] = useState([
    {
      id: '1',
      name: 'Master Scene',
      icon: require('../assets/images/blub.png'),
      active: true,
    },
    {
      id: '2',
      name: 'Night Scene',
      icon: require('../assets/images/frame_1504.png'),
      active: true,
    },
    {
      id: '3',
      name: 'Movie Scene',
      icon: require('../assets/images/frame.png'),
      active: false,
    },
  ]);

  const quickCalls = [
    {
      id: '1',
      name: 'Call Reception',
      description: 'Need help? Call reception!',
      icon: require('../assets/images/telephone.png'),
    },
    {
      id: '2',
      name: 'Tea',
      description: 'Need a break? Tea is coming!',
      icon: require('../assets/images/tea.png'),
    },
    {
      id: '3',
      name: 'Snack',
      description: 'Peckish? Snack time!',
      icon: require('../assets/images/cookie.png'),
    },
  ];

  const quickActions = [
    {
      id: '1',
      name: 'Service Request',
      description: 'From 8:00 am - 11:00 pm',
      icon: require('../assets/images/service_request.png'),
    },
    {
      id: '2',
      name: 'Lights Control',
      description: 'Master Switch',
      icon: require('../assets/images/lights_control.png'),
      toggle: true,
    },
    {
      id: '3',
      name: 'Air Conditioner',
      description: '',
      icon: require('../assets/images/aircon.png'),
    },
    {
      id: '4',
      name: 'Food Order',
      description: '',
      icon: require('../assets/images/food.png'),
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = await AsyncStorage.getItem(local_storage.UserName);
        const roomNo = await AsyncStorage.getItem(local_storage.RoomNo);
        const hotelId = await AsyncStorage.getItem(local_storage.HotelId);
        const roomType = await AsyncStorage.getItem(local_storage.RoomType);

        if (username) {
          setUserName(username);
        }
        if (roomNo) {
          setRoomNo(roomNo);
        }
        if (hotelId) {
          setHotelId(hotelId);
        }
        if (roomType) {
          setRoomType(roomType);
        }

        console.log('Fetched user name:', username);
        console.log('Fetched room number:', roomNo);
        console.log('Fetched hotel ID:', hotelId);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchUser().then(() => {
      getRoomScene();
    });
  }, []);

  const getRoomScene = async () => {
    try {
      const res = await apiGet(`v1/roomScene?hotelId=${hotelId}`);
      console.log(res.data);
      if (res.status === 200) {
        console.log(res.data);
      } else {
        console.error('hotelId is not set');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.nameText}>{username} 👋🏻</Text>
        <Text style={styles.roomText}>
          Room {roomNo}, {roomType}
        </Text>
      </View>

      {/* Door Control */}
      <View style={styles.doorControl}>
        <Text style={styles.doorText}>
          Doors are {doorClosed ? 'closed' : 'open'}
        </Text>
        <Switch
          value={doorClosed}
          onValueChange={() => setDoorClosed(!doorClosed)}
          thumbColor="#FFD700"
          trackColor={{false: '#808080', true: '#FFD700'}}
        />
      </View>

      {/* Room Scenes */}
      <View style={styles.roomScene}>
        <Text style={styles.sectionTitle}>Room </Text>
        <Text style={styles.sectionTitleItalic}> Scenes</Text>
      </View>

      {scenes.map(item => (
        <View key={item.id} style={styles.sceneItem}>
          <Image source={item.icon} style={styles.sceneIcon} />
          <Text style={styles.sceneText}>{item.name}</Text>
          <Switch
            value={item.active}
            onValueChange={() => {
              const newScenes = scenes.map(scene =>
                scene.id === item.id
                  ? {...scene, active: !scene.active}
                  : scene,
              );
              setScenes(newScenes);
            }}
          />
        </View>
      ))}

      {/* Quick Calls */}
      <View style={styles.roomScene}>
        <Text style={styles.sectionTitle}>Quick </Text>
        <Text style={styles.sectionTitleItalic}> Calls</Text>
      </View>
      <View style={styles.quickCallsContainer}>
        {quickCalls.map(item => (
          <TouchableOpacity key={item.id} style={styles.quickCallItem}>
            <Image source={item.icon} style={styles.quickCallIcon} />
            <Text style={styles.quickCallText}>{item.name}</Text>
            <Text style={styles.quickCallDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsContainer}>
        {quickActions.map(item => (
          <TouchableOpacity key={item.id} style={styles.quickActionItem}>
            <Image source={item.icon} style={styles.quickActionIcon} />
            <Text style={styles.quickActionText}>{item.name}</Text>
            {item.toggle && (
              <Switch
                value={true}
                thumbColor="#FFD700"
                trackColor={{false: '#808080', true: '#FFD700'}}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.space}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1E',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  roomScene: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  welcomeText: {
    color: '#808080',
    fontStyle: 'italic',
    fontSize: 16,
    fontFamily: fontFamily.Light,
    fontWeight: 400,
  },
  nameText: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: fontFamily.Regular,
    fontWeight: 600,
  },
  roomText: {
    paddingTop: 5,
    fontFamily: fontFamily.Light,
    color: '#808080',
    fontSize: 13,
  },
  doorControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#303030',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  doorText: {
    color: '#F9F5DD',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#808080',
    fontSize: 18,
    fontFamily: fontFamily.Regular,
    fontWeight: 400,
  },
  sectionTitleItalic: {
    color: '#FFF',
    fontSize: 18,
    fontStyle: 'italic',
    fontFamily: fontFamily.Regular,
    fontWeight: 400,
  },
  sceneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#303030',
    borderRadius: 10,
  },
  sceneIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 15,
  },
  sceneText: {
    flex: 1,
    fontSize: 16,
    fontFamily: fontFamily.SemiBold,
    color: '#FFFFFF',
  },
  quickCallsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 150,
  },
  quickCallItem: {
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: '#303030',
    padding: 20,
    borderRadius: 10,
  },
  quickCallIcon: {
    width: 40,
    height: 40,
  },
  quickCallText: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 14,
    fontFamily: fontFamily.SemiBold,
  },
  quickCallDescription: {
    marginTop: 5,
    color: '#808080',
    fontSize: 12,
    fontFamily: fontFamily.Light,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: '#303030',
    padding: 10,
    borderRadius: 10,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
  },
  quickActionText: {
    color: '#F9F5DD',
    marginTop: 5,
  },
  space: {
    marginBottom: 30,
  },
});

export default Home;
