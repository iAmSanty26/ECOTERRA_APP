import React, { useState, useEffect } from "react";
import {View, ScrollView, TextInput, StyleSheet, Text, Image, Button } from "react-native";
import {Icon, Input} from 'react-native-elements'
import "firebase/auth";
import firebase from 'firebase/app'
import FormButton from '../components/ButtonLogin';
import ButtonLogin from "../components/ButtonLogin";

const LoginUserScreen = (props) => {

    const [showPassword, setShowPassword] = useState(false)

    const [state, setState] = useState({

        email: "",
        password: ""

    });
    const handleChangeText = (email, value) => {
        setState({ ...state, [email]: value });
    }

    function signInWithEmailPassword() {
        var email = state.email
        var password = state.password
        // Aquí se valida si el usuario ingreso los datos correspondientes a la base de datos para posteriormente logearse
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Firebasae.auth me autentifica si el usuario ingresado si se encuentra en la base de datos, despues me envía a la MainScreen ya logeado
            var user = userCredential.user;
            props.navigation.navigate('MainScreen')
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert ("Los datos ingresados no son correctos")
          });
        // En caso de que los datos sean erroneos el then catch me valida esto, en caso de que los datos sean erroneos se mostrará la alerta que los datos son incorrectos
      }

      function signUpWithEmailPassword() {
        var email = state.email
        var password = state.password
        // Esta función igualmente de firebase me permite registrarme y autenticarme en la base de datos para posteriormente logearme con esta cuenta
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // En caso que los datos cumplan los requisitos necesarios el usuario será registrado y posteriormente será logeado automaticamente y me redirigirá a MainScreen
            var user = userCredential.user;
            props.navigation.navigate('MainScreen')
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert ("Los datos ingresados no corresponden a el formato adecuado, la contraseña debe llevar mínimo 6 digitos")
          });
        // En el catch anterior se validan los campos ingresados por el usuario, debe ser un correo valido con su @ y una contraseña de mínimo 6 digitos
      }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')}
                    resizeMode="center"
                    style={styles.image} />
                

                <View style={styles.inputGroup}>
                    <TextInput style={styles.inputText} placeholder="Correo electronico" onChangeText={(value) => handleChangeText('email', value)} ></TextInput>
                </View>
                <View style={styles.inputGroup}>
                <Input style={styles.inputPass} secureTextEntry={!showPassword} type="" placeholder="Contraseña" onChangeText={(value) => handleChangeText('password', value)}
                rightIcon={<Icon type="material-community" name={ showPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.icon} onPress={()=> setShowPassword(!showPassword)} />} ></Input>
                </View>
                <View >
                <ButtonLogin Title="Iniciar sesión" onPress={() => signInWithEmailPassword()}/>
                <ButtonLogin Title="Registrarse" onPress={() => signUpWithEmailPassword()}/>
            </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    image: {
        width: 400,
        height: 250,
        marginVertical: 10

    },
    textTitle: {
        flex: 1,
        fontSize: 40,
        marginVertical: 10,
        marginBottom: 30,
        marginLeft: 30,
        alignItems: "center"
    },
    icon:{
        color: "#c1c1c1"
    },
    inputGroup: {
        borderColor: 'gray',
        width: '90%',
        height: 50,
        borderRadius: 40,
        marginVertical: 10,
        borderWidth: 3.0,

    },
    inputText: {
        flex: 1,
        color: 'black',
        marginTop: 2,
        marginLeft: 10,
        justifyContent: 'center',
        fontSize: 20,
        borderBottomWidth: 0
    },
    inputPass: {
        flex: 1,
        color: 'black',
        marginTop: 2,
        marginLeft: 3,
        justifyContent: 'center',
        fontSize: 20,
        borderBottomWidth: 0
    },
});

export default LoginUserScreen;