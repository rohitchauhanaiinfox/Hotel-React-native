import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import globalStyles from '../styles/style';

const Button = ({ onPress, title, loading = false, disabled = false, style = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity
      style={[globalStyles.button, style, disabled ? globalStyles.disabledButton : {}]}
      onPress={onPress}
      disabled={loading || disabled}
    >
      <Text style={[globalStyles.buttonText, textStyle]}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
