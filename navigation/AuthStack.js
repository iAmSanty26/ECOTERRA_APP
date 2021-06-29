import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import LoginUserScreen from '../screens/LoginUserScreen'
import CreateUserScreen from '../screens/CreateUserScreen'




const Stack = createStackNavigator()

const AuthStack = () => {

    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginUserScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Signup"
          component={CreateUserScreen}
          options={({navigation}) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#f9fafd',
              shadowColor: '#f9fafd',
              elevation: 0,
            },
            headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <FontAwesome.Button 
                  name="long-arrow-left"
                  size={25}
                  backgroundColor="#f9fafd"
                  color="#333"
                  onPress={() => navigation.navigate('Login')}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
      </NavigationContainer>
    );
  };

  export default AuthStack;