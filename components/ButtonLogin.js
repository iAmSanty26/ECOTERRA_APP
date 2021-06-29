import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const ButtonLogin = ({Title, ...rest}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{Title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonLogin;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: 200,
    backgroundColor: '#1e90ff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});