import React, {useContext, useEffect, useState} from 'react';
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
import AppContext from '../Context/AppContext';
import HeaderView from '../components/HeaderView';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/Colors';

const Facilities = () => {
  const {Context, dispatch} = useContext(AppContext);
  const categories = [
    {id: 1, name: 'Dining', icon: 'restaurant-outline', isActive: true},
    {id: 2, name: 'Event', icon: 'calendar-outline', isActive: false},
    {id: 3, name: 'Fitness', icon: 'barbell-outline', isActive: false},
    {id: 4, name: 'Spa', icon: 'water-outline', isActive: false},
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const facilities = [
    {
      id: 1,
      name: 'Latitude',
      type: 'Cuisine - All Day Dining, Multi Cuisine',
      timing:
        'Timings - 24×7 (except on Tuesday it will be closed between 12:00 AM to 06:00 AM)',
      price: 'Avg price for 2 ₹ 2500',
      image:
        'https://api.a0.dev/assets/image?text=luxury%20hotel%20restaurant%20interior%20fine%20dining%20ambient%20lighting&aspect=16:9',
    },
    {
      id: 2,
      name: 'Tango',
      type: 'Max Capacity - 200',
      description:
        'Inbuilt technology allowing drop-down screen, high-speed wireless internet communication through the entire...',
      area: 'Area: 320 Sq. Mt.',
      image:
        'https://api.a0.dev/assets/image?text=modern%20hotel%20conference%20hall%20with%20blue%20accent%20lighting&aspect=16:9',
    },
    {
      id: 3,
      name: 'Rhythm',
      type: 'Max Capacity - 40',
      description:
        'Rhythm hall accommodates a maximum of 40 people and has area of 114 sq. m.',
      area: 'Area: 320 Sq. Mt.',
      image:
        'https://api.a0.dev/assets/image?text=cozy%20hotel%20lounge%20area%20with%20warm%20lighting&aspect=16:9',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <HeaderView />

      <ScrollView horizontal style={styles.categories}>
        {categories.map(category => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(category)}
            key={category.id}
            style={[
              styles.categoryButton,
              category.isActive && styles.activeCategoryButton,
            ]}>
            {category.id === selectedCategory?.id && (
              <LinearGradient
                colors={[Colors.appColorSecondary,Colors.appColor]}
                start={{x: 1, y: 1}}
                end={{x: 0, y: 0}}
                style={styles.gradientBackground}
              />
            )}
            <Ionicons
              name={category.icon}
              size={22}
              style={{marginRight: 5}}
              color={
                selectedCategory?.id === category?.id
                  ? Colors.black
                  : Colors.white
              }
            />
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    selectedCategory?.id === category?.id
                      ? Colors.black
                      : Colors.white,
                },
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
  categories: {
    flexDirection: 'row',
    // padding: 16,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: Colors.buttonBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginRight: 10,
    // gap: 8,
  },
  activeCategoryButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: '600',
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

export default Facilities;
