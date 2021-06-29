import React, { useState } from "react";
import { Alert, View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import { Icon, Input} from 'react-native-elements'
import firebase from '../database/firebase'
import "firebase/auth";


const CreateUserScreen = (props) => {

    {/* Esto es un componente */ }
    {/* abajo creamos un estado con los valores que queremos guardar en este para que posterior a esto sean actualizados */ }
    const [state, setState] = useState({
        DIU: "",
        email: "",
        nombre: "",
        contrasena: "",
        cargo: "",
        codigoUsuario: "",
        codigoRol: "",
    });



    {/* abajo creamos una función para manipular el texto que quiero guardar en mi estado con el fin de actualizarlo */ }
    const handleChangeText = (DIU, value) => {
        setState({ ...state, [DIU]: value });
    };

    {/* aquí está la función para guardar los usuarios con sus respectivos datos en la base de datos  */ }
    const saveNewUser = async () => {
            await firebase.db.collection('users').add({
                DIU: state.DIU,
                email: state.email,
                nombre: state.nombre,
                contrasena: state.contrasena,
                cargo: state.cargo,
                codigoUsuario: state.codigoUsuario,
                codigoRol: state.codigoRol
            })
            alert('Guardado')
            props.navigation.navigate('UserList')
    };

    {/* Esta función de abajo se utiliza para mostrar la contraseña en el formulario correspondiente */ }
    const [showPassword, setShowPassword] = useState(false)


    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Documento de identidad" onChangeText={(value) => handleChangeText('DIU', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Correo electronico" onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Nombre" onChangeText={(value) => handleChangeText('nombre', value)} />
            </View>
            <View style={styles.inputPass}>
                <Input secureTextEntry={!showPassword} type="" placeholder="Contraseña" rightIcon={<Icon type="material-community" name={ showPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.icon} onPress={()=> setShowPassword(!showPassword)} />} placeholder="Contraseña" onChangeText={(value) => handleChangeText('contrasena', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Cargo de usuario" onChangeText={(value) => handleChangeText('cargo', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Código de usuario" onChangeText={(value) => handleChangeText('codigoUsuario', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Código de rol" onChangeText={(value) => handleChangeText('codigoRol', value)} />
            </View>
            <View >
                <Button title="Crear Usuario" onPress={() => saveNewUser()} />
            </View>
        </ScrollView>
    )
}

{/* Esto es un objeto de estilos el cual podemos llamar en los views para ponerle estilos a los inputs, esto sirve para no tener que poner estos estilos a cada uno */ }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    icon:{
        color: "#c1c1c1"
    },
    inputPass: {
        width: '101%',
        height: 50,
        marginTop: 0,
        marginBottom: 15,
        borderBottomWidth: 0,
        borderBottomColor: '#cccccc'
    },
})

export default CreateUserScreen