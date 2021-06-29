import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';
import {Icon, Input} from 'react-native-elements'
import firebase from '../database/firebase'

const UserDetailScreen = (props) => {

    {/* abajo creamos una función para inicializar los datos que estamos poniendo en el formulario, esto con el fin de actualizarlos despues */ }
    const initialState = {
        id: "",
        DIU: "",
        email: "",
        nombre: "",
        contrasena: "",
        cargo: "",
        codigoUsuario: "",
        codigoRol: ""
    }

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)
    {/* aqui estamos obteniendo los datos del documento que tiene ese id   */ }
    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get()
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
        setLoading(false)
    };
{/* este useEffect llama a getUserById, luego carga los datos, lo establece en el estado de react, luego hace el setLoading  */}
    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);

    const handleChangeText = (DIU, value) => {
        setUser({ ...user, [DIU]: value });
    };
{/* la funcion openConfirmationAlert me brinda una ventana de alerta en la cual se va mostrar si desea eliminar o no el registro */ }
    const openConfirmationAlert = () => {
        Alert.alert('Eliminar el usuario', 'Estas seguro?', [
            {text: 'Eliminar', onPress: () => deleteUser()},
            {text: 'Cancelar', onPress: () => console.log(false)},
        ])
    }
    {/* la función deleteUser borra el registro con sus respectivos datos en la base de datos de firebase */ }
    const deleteUser = async () => {
       const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
       await dbRef.delete();
       props.navigation.navigate('UserList')
    }
    {/* la función updateUser me va a permitir actualizar los datos de un determinado registro, después la función dbref me trae todos los datos actuales del registro obtenido de la base de datos */ }
    const updateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.set({
            DIU: user.DIU,
            email: user.email,
            nombre: user.nombre,
            contrasena: user.contrasena,
            cargo: user.cargo,
            codigoUsuario: user.codigoUsuario,
            codigoRol: user.codigoRol
        })
        setUser(initialState)
        props.navigation.navigate('UserList')
    }
{/* Esta función de abajo se utiliza para mostrar la contraseña en el formulario correspondiente */ }
    const [showPassword, setShowPassword] = useState(false)

{/* si esta cargando la aplicación retorna esta vista, de lo contrario no se ejecuta y sigue con el codigo  */}
    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Documento de identidad" value={user.DIU} onChangeText={(value) => handleChangeText('DIU', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Correo electronico" value={user.email} onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Nombre" value={user.nombre} onChangeText={(value) => handleChangeText('nombre', value)} />
            </View>
            <View style={styles.inputPass}>
                <Input secureTextEntry={!showPassword} placeholder="Contraseña" rightIcon={<Icon type="material-community" name={ showPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.icon} onPress={()=> setShowPassword(!showPassword)} />} value={user.contrasena} onChangeText={(value) => handleChangeText('contrasena', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Cargo de usuario" value={user.cargo} onChangeText={(value) => handleChangeText('cargo', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Código de usuario" value={user.codigoUsuario} onChangeText={(value) => handleChangeText('codigoUsuario', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Código de rol" value={user.codigoRol} onChangeText={(value) => handleChangeText('codigoRol', value)} />
            </View>
            <View >
                <Button color="#19AC52" title="Update User" onPress={() => updateUser()} />
            </View>
            <View>
            <Button color="#E37399" title="Delete User" onPress={() => openConfirmationAlert()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    icon:{
        color: "#c1c1c1",
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

export default UserDetailScreen