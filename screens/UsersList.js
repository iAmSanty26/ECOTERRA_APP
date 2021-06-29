import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const UsersList = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            {/*aquí se crea un arreglo vacío en el cual vamos a almacenar los datos que queremos que se muestren en la pantalla UsersList */ }
            const users = [];
            {/*aquí se crea el forEach el cual va a recorrer los datos que se almacenan en la BD para mostrarlos en el arreglo */ }
            querySnapshot.docs.forEach(doc => {
                const { DIU, email, nombre, contrasena, cargo, codigoUsuario, codigoRol } = doc.data()
                users.push({
                    id: doc.id,
                    DIU,
                    email,
                    nombre,
                    contrasena,
                    cargo,
                    codigoUsuario,
                    codigoRol
                })
            });

            setUsers(users)
        });
    }, []);
    {/*el props recibe el navigation y le ponemos la función navigate y lo enviara a CreateUserScreen */ }
    return (
        <ScrollView>
            <Button title="Crear nuevo usuario" onPress={() => props.navigation.navigate('CreateUserScreen')}
            />
            {
                users.map(user => {
                    return (
                        <ListItem
                            key={user.id} bottomDivider onPress={() => {
                                props.navigation.navigate('UserDetailScreen', {
                                    userId: user.id
                                })
                            }}>
                            <ListItem.Chevron />
                            <Avatar source={{uri: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'}}/>
                            <ListItem.Content>
                                <ListItem.Title>{user.cargo} {user.nombre}</ListItem.Title>
                                <ListItem.Subtitle>{user.DIU}</ListItem.Subtitle>
                            </ListItem.Content>

                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default UsersList
