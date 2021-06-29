import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import firebase from '../database/firebase'
import { db } from '../database/firebase'

const CreateEstadoScreen = (props) => {
  {/* Esto es un componente */ }
  {/* abajo creamos un estado con los valores que queremos guardar en este para que posterior a esto sean actualizados */ }
  const [state, setState] = useState({
    Estados: "",

  });

  {/* función para manipular el texto que quiero guardar en mi estado con el fin de actualizarlo */ }
  const handleChangeText = (DIU, value) => {
    setState({ ...state, [DIU]: value });
  };

  const createNewEstados = async () => {
    if (state.Estados === '') {
    alert('please')
    } else {
      await firebase.db.collection('estadosCaneca').add({
        Estados: state.Estados,

      })
      alert('Guardado')
      props.navigation.navigate('EstadoList');

    }

  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Estados" onChangeText={(value) => handleChangeText('Estados', value)} />
      </View>
      <View >
        <Button title="Añadir" onPress={() => createNewEstados()} />
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

export default CreateEstadoScreen;