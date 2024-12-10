import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CustomSnackbar = ({ visible, message, status, onDismiss }) => {
  useEffect(() => {
    let timer;
    if (visible) {
      timer = setTimeout(() => {
        onDismiss();
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <View style={[styles.container, { backgroundColor: status ? '#76BF4C' : '#D94A3F' }]}>
      <View style={styles.content}>
        <Image
          source={status ? require('../assets/images/success.png') : require('../assets/images/close.png')}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{status ? 'Great!' : 'Ooops!'}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
          <Image source={require('../assets/images/close.png')} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: '90%',
    borderRadius: 18,
    padding: 15,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
  message: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
    maxWidth: '85%',
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  closeIcon: {
    height: 18,
    width: 18,
  },
});

export default CustomSnackbar;