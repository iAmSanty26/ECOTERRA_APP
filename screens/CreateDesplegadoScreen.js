import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import firebase from '../database/firebase'
import CanecasList from "./CanecaList";
import EstadoList from "./EstadoList";

const CreateDesplegadoScreen = (props) => {



    return (
        <ScrollView style={styles.container}>

            <Button title="Estados De La Caneca" onPress={() => props.navigation.navigate("EstadoList")}
            />
            <Button title=" Ubicación De Las Canecas" onPress={() => props.navigation.navigate("CanecaList")}
            />
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


    }

})



export default CreateDesplegadoScreen;