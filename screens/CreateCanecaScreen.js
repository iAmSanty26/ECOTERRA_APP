import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import firebase from '../database/firebase'

const CreateCanecaScreen = (props) => {
  {/* Esto es un componente */ }
  {/* abajo creamos un estado con los valores que queremos guardar en este para que posterior a esto sean actualizados */ }
  const [state, setState] = useState({
    IDCanecaI: "",
    UbicacionCaneca: "",
    estadoCaneca: ""
  });

  {/* función para manipular el texto que quiero guardar en mi estado con el fin de actualizarlo */ }
  const handleChangeText = (IDCanecaI, value) => {
    setState({ ...state, [IDCanecaI]: value });
  };

  const createNewCaneca = async () => {
    if (state.IDCanecaI === '') {
    alert('please')
    } else {
      await firebase.db.collection('canecaInteligente').add({
        IDCanecaI: state.IDCanecaI,
        UbicacionCaneca: state.UbicacionCaneca,
        estadoCaneca: state.estadoCaneca
      })
      alert('Guardado')
      props.navigation.navigate('CanecaList');

    }

  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="ID Caneca Inteligente" onChangeText={(value) => handleChangeText('IDCanecaI', value)} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Ubicación Caneca" onChangeText={(value) => handleChangeText('UbicacionCaneca', value)} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Estado de la caneca" onChangeText={(value) => handleChangeText('estadoCaneca', value)} />
      </View>
      <View >
        <Button title="Añadir" onPress={() => createNewCaneca()} />
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

  }
})

export default CreateCanecaScreen;