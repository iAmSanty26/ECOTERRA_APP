import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import FormButton from '../components/FormButton';
import "firebase/auth";
import firebase from 'firebase/app'
import getCurrentUser from '../components/Actions'
import UserDetailScreen from './UserDetailScreen';

const MainScreen = (props) => {

  function signOut() {
    // aqui abajo se autentifica si el usuario esta logeado para posteriormente cerrar sesión
    firebase.auth().signOut().then(() => {
      // Aquí ya me valida el cierre de sesión
      alert('Sesion cerrada exitosamente')
      props.navigation.navigate('LoginUserScreen')
    }).catch((error) => {

    });

  }


  return (
    <ScrollView>
    <View style={styles.container}>

      <Image source={require('../assets/logo.png')}
        resizeMode="center"
        style={styles.image} />
        </View>

      <Text style={styles.text} >{

        
        }

       </Text>

<View style={styles.navigate}>
      <FormButton Title="Gestionar Empleados" onPress={() => props.navigation.navigate("UserList")}/>
      <FormButton Title="Gestionar Canecas" onPress={() => props.navigation.navigate("CanecaList")}/>
      <FormButton Title="Cerrar sesion" onPress={() => signOut()}/>
</View>

    </ScrollView>
  )}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  text: {
    fontSize: 30,
    color: '#333333',
    textAlign: "center",
  },
  image: {
    width: 400,
    height: 250,
    marginVertical: 10
  },
  navigate: {
    marginTop: 20,
  }
});