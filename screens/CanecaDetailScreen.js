import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from "../database/firebase";

const CanecaDetailScreen = (props) => {

  const initialState = {
    IDCanecaI: "",
    UbicacionCaneca: "",
    estadoCaneca: ""
  };

  const [Caneca, setCaneca] = useState();
  const [loading, setLoading] = useState(true);
  {/* aqui estamos obteniendo los datos del documento que tiene ese id   */ }
  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("canecaInteligente").doc(id);
    const doc = await dbRef.get();
    const Caneca = doc.data();
    setCaneca({
      ...Caneca,
      id: doc.id
    });
    setLoading(false);
  };
{/* este useEffect llama a getUserById, luego carga los datos, lo establece en el estado de react, luego hace el setLoading  */}
  useEffect(() => {
      getUserById(props.route.params.CanecaId);
  }, []);

  const handleChangeText = (DIU, value) => {
      setCaneca({ ...Caneca, [DIU]: value });
  };

  const openConfirmationAlert = () => {
      Alert.alert('Eliminar La Caneca', 'Estas seguro?', [
          {text: 'Eliminar', onPress: () => deleteCaneca()},
          {text: 'Cancelar', onPress: () => console.log(false)},
      ])
  }

  const deleteCaneca = async () => {
    const dbRef = firebase.db.collection('canecaInteligente').doc(props.route.params.CanecaId);
    await dbRef.delete();
    props.navigation.navigate('CanecaList')
 }

 const updateCaneca = async () => {
     const dbRef = firebase.db.collection('canecaInteligente').doc(Caneca.id);
     await dbRef.set({
      IDCanecaI: Caneca.IDCanecaI,
      UbicacionCaneca: Caneca.UbicacionCaneca,
      estadoCaneca: Caneca.estadoCaneca
     })
     setCaneca(initialState)
     props.navigation.navigate('CanecaList')
 }



  {/* si esta cargando la aplicación retorna esta vista, de lo contrario no se ejecuta y sigue con el codigo  */}
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>

    )
  }

  return (
    <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput placeholder="ID Caneca Inteligente" value={Caneca.IDCanecaI} onChangeText={(value) => handleChangeText('IDCanecaI', value)} />
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Ubicación Caneca" value={Caneca.UbicacionCaneca} onChangeText={(value) => handleChangeText('UbicacionCaneca', value)} />
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Estado de la caneca" value={Caneca.estadoCaneca} onChangeText={(value) => handleChangeText('estadoCaneca', value)} />
        </View>
        <View >
            <Button color="#19AC52" title="Guardar Caneca" onPress={() => updateCaneca()} />
        </View>
        <View>
        <Button color="#E37399" title="Eliminar Caneca" onPress={() => deleteCaneca()} />
        </View>
    </ScrollView>
)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default CanecaDetailScreen;