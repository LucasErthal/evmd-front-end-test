import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import openDatabase from '../../services/sqlite';
import { UserCard } from '../../components';
import { useState } from 'react';
import { useEffect } from 'react';
import { setId } from '../../store/actions' 
import { useDispatch } from 'react-redux';

const Home = ({ navigation}) => {
  const db = openDatabase();
  const [users, setUsers] = useState();
  const dispatch = useDispatch();

  const GetUsers = () => {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM users", null,
        (_, { rows: { _array } }) => setUsers(_array));
    })
  }

  function HandleNavigateToDetails(item) {
    dispatch(setId(item._id));
    
    navigation.navigate('Details' /* {
      name:item.name, 
      email: item.email,
      age: item.age,
      balance: item.balance,
      latitude: item.latitude,
      longitude: item.longitude,
      picture: item.picture
    } */);
  }

  useEffect(() => {
    GetUsers();
  }, []);

  const item = ({item}) => {
    return (
      <UserCard
        name={item.name}
        age={`${item.age}`}
        email={item.email}
        picture={item.picture}
        onPress={() => HandleNavigateToDetails(item)}
      />
    );
  }

  return (
    <View
      style={styles.container}
    >
      {!users &&
        <Text>Wait...</Text>
      }
      {users &&
        <FlatList 
          data={users} 
          renderItem={item} 
          keyExtractor={item => item._id}
          initialNumToRender={15}
        />
      }
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
