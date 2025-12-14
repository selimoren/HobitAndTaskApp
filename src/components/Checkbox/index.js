import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import Icons from '../../config/Icons';

const Checkbox = ({ 
  checked, 
  onPress, 
  size = 24,
  color = '#AED89D'
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        { 
          width: size, 
          height: size,
          borderColor: checked ? color : '#CCCCCC',
          backgroundColor: checked ? color : 'transparent',
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {checked && (
        <Image 
          source={Icons.checked} 
          style={[styles.checkmark, { width: size * 0.7, height: size * 0.7 }]} 
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    tintColor: '#FFFFFF',
  },
});

export default Checkbox;
