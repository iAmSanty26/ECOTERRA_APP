import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator()


import LoginUserScreen from './screens/LoginUserScreen'
import UserList from './screens/UsersList'
import CreateUserScreen from './screens/CreateUserScreen'
import UserDetailScreen from './screens/UserDetailScreen'
import MainScreen from './screens/MainScreen'
import CreateCanecaScreen from "./screens/CreateCanecaScreen";
import CreateEstadoScreen from "./screens/CreateEstadoScreen";
import CanecaDetailScreen from "./screens/CanecaDetailScreen";
import CanecaList from "./screens/CanecaList";
import EstadoList from "./screens/EstadoList";
import MensajesList from "./screens/MensajesList";
import CreateDesplegadoScreen from "./screens/CreateDesplegadoScreen";

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginUserScreen" component={LoginUserScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UserList" component={UserList} options={{ title: 'Lista de usuarios' }} />
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{ title: 'Crear nuevo usuario' }} />
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title: 'Información del usuario' }} />
      <Stack.Screen
        name="CanecaList"
        component={CanecaList}
        options={{ title: "Ubicación Canecas" }}
      />
      <Stack.Screen
        name="EstadoList"
        component={EstadoList}
        options={{ title: "Estados De La Caneca" }}
      />
      <Stack.Screen
        name="MensajesList"
        component={MensajesList}
        options={{ title: "Mensajes" }}
      />
      <Stack.Screen
        name="CreateCanecaScreen"
        component={CreateCanecaScreen}
        options={{ title: "Añadir Ubicación" }}
      />
      <Stack.Screen
        name="CreateDesplegadoScreen"
        component={CreateDesplegadoScreen}
        options={{ title: "Menu Desglegado" }}
      />
      <Stack.Screen
        name="CreateEstadoScreen"
        component={CreateEstadoScreen}
        options={{ title: "Estados De La Caneca" }}
      />
      <Stack.Screen
        name="CanecaDetailScreen"
        component={CanecaDetailScreen}
        options={{ title: "Actualizar Ubicación" }}
      />
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
