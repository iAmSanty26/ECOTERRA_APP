import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/firebase";

const CanecasList = (props) => {
  const [Canecas, setCanecas] = useState([]);

  useEffect(() => {
    firebase.db.collection("canecaInteligente").onSnapshot((querySnapshot) => {
      {/*aquí se crea un arreglo vacío en el cual vamos a almacenar los datos que queremos que se muestren en la pantalla UsersList */ }
      const Canecas = [];
      {/*aquí se crea el forEach el cual va a recorrer los datos que se almacenan en la BD para mostrarlos en el arreglo */ }
      querySnapshot.docs.forEach((doc) => {
        const { IDCanecaI, UbicacionCaneca, estadoCaneca  } = doc.data();
        Canecas.push({
          id: doc.id,
          IDCanecaI,
          UbicacionCaneca,
          estadoCaneca

        });
      });
      setCanecas(Canecas);
    });
  }, []);


  {/*el props recibe el navigation y le ponemos la función navigate y lo enviara a CreateUserScreen */ }
  return (
    <ScrollView>
      <Button title="Añadir Ubicación" onPress={() => props.navigation.navigate("CreateCanecaScreen")}
      />

      {Canecas.map((Caneca) => {
        return (
          <ListItem
            key={Caneca.id} bottomDivider onPress={() => {
              props.navigation.navigate("CanecaDetailScreen", {
                CanecaId: Caneca.id
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar source={{ uri: "https://www.google.com.co/url?sa=i&url=https%3A%2F%2Fwww.estra.com%2Fp%2Fcaneca-con-tapa-vaiven-plana-estampada--azul-53-l%2F&psig=AOvVaw0RIYiHUXZVMaSrtqvlieFn&ust=1617759730548000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiTh-O-6O8CFQAAAAAdAAAAABAD", }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title> {Caneca.UbicacionCaneca} </ListItem.Title>
              <ListItem.Subtitle>{Caneca.estadoCaneca}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>

        );
      })}
    </ScrollView>
  );
};

export default CanecasList;