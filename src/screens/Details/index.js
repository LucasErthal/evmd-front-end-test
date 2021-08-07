import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  View, Image, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { connect, useSelector } from 'react-redux';
import openDatabase from '../../services/sqlite';

const Details = () => {
  const state = useSelector((state => state));
  const [user, setUser] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const db = openDatabase();

  async function GetSelectedUser() {
    await db.transaction(tx => {
      tx.executeSql(`SELECT * FROM users WHERE _id = "${state.id}";`, null,
        (_, { rows: { _array } }) => { setUser(_array[0]), setIsFavorite(_array[0].favorite)});
    })
  }

  function SetFavorite() {
    db.transaction(tx => {
      tx.executeSql(`UPDATE users SET favorite=${user.favorite == 1 ? 0 : 1} WHERE _id = "${state.id}";`)
    })

    setIsFavorite(isFavorite == 1 ? 0 : 1);
  }

  useEffect(() => {
    GetSelectedUser();
  }, [])

  return (
    <View style={styles.container}>
      {user &&
        <>
          <View>
            <Image
              source={{
                uri: user.picture,
              }}
              style={styles.image}
            />
          </View>
          <View
            style={styles.detailsContainer}
          >
            <Text>Nome: {user.name}</Text>
            <Text>E-mail: {user.email}</Text>
            <Text>Idade: {user.age}</Text>
            <Text>Salário: {user.balance}</Text>
            <Text>Latitude: {user.latitude}</Text>
            <Text>Longitude: {user.longitude}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={SetFavorite}
          >
            <Text>
              {isFavorite == 1 ? "Desfavoritar" : "Favoritar"}
            </Text>
          </TouchableOpacity>
        </>
      }

    </View>
  );
};
/* Details.propTypes = {
  props: PropTypes.shape({
    route: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        age: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired,
        latitude: PropTypes.string.isRequired,
        longitude: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
      })
    })
  })
}; */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f3f3f3',
  },
  detailsContainer: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#e5e5e5',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#b1b1b1',
    backgroundColor: '#e5e5e5',
  },
});

export default connect(state => ({ item: state }))(Details);
