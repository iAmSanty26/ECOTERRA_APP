import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/firebase";

const MensajesList = (props) => {
  const [Estadoss, setEstados] = useState([]);

  useEffect(() => {
    firebase.db.collection("estadosCaneca").onSnapshot((querySnapshot) => {
      {/*aquí se crea un arreglo vacío en el cual vamos a almacenar los datos que queremos que se muestren en la pantalla UsersList */ }
      const Estadoss = [];
      {/*aquí se crea el forEach el cual va a recorrer los datos que se almacenan en la BD para mostrarlos en el arreglo */ }
      querySnapshot.docs.forEach((doc) => {
        const { Estados } = doc.data();
        Estadoss.push({
          id: doc.id,
          Estados,


        });
      });
      setEstados(Estadoss);
    });
  }, []);


  {/*el props recibe el navigation y le ponemos la función navigate y lo enviara a CreateUserScreen */ }
  return (
    <ScrollView>
      {Estadoss.map((Estados) => {
        return (
          <ListItem
          >
            <ListItem.Chevron />
            <Avatar source={{uri:"https://www.google.com.co/url?sa=i&url=https%3A%2F%2Fwww.estra.com%2Fp%2Fcaneca-con-tapa-vaiven-plana-estampada--azul-53-l%2F&psig=AOvVaw0RIYiHUXZVMaSrtqvlieFn&ust=1617759730548000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiTh-O-6O8CFQAAAAAdAAAAABAD",}}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title> {Estados.Estados} </ListItem.Title>
            </ListItem.Content>
            </ListItem>

        );
      })}
    </ScrollView>
  );
};

export default MensajesList;