import {StackScreenProps} from '@react-navigation/stack';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useFirestoreConnect } from 'react-redux-firebase'
import {RootStackParamList} from '../types';
import {RootStateOrAny, useSelector} from 'react-redux';
import auth, {firebase} from '@react-native-firebase/auth';
import { parse } from 'flatted'
import { Image } from 'react-native-elements/dist/image/Image';

export default function Favorite({
  navigation,
}: StackScreenProps<RootStackParamList, 'Root'>) {

  const [ favoritesList, setFavoritesList ] = useState ([]);
  const uid = auth().currentUser?.uid;

  useFirestoreConnect([{collection: 'favorites', doc: uid}]);
  const favorites = useSelector(({ firestore: { data } }) => data.favorites && data.favorites[uid] );

  useEffect(() => {
    getFavoritesList();
  }, [favorites]);

  const getFavoritesList = async () => {
    try {
      const userFavoritesList = await Promise.all(favorites?.posts.map(async post => {return await post.get()}));
      const result = userFavoritesList.map(item => {
        return (
          <View key={item._data.id}>
            <Text>{item._data.title}</Text>
            <Text>{item._data.description}</Text>
            <Text>{item._data.price}</Text>
          </View>
        )
      })
      setFavoritesList(result);
      console.log(favoritesList)
    } catch (e) {
    }
  };

  return (
    <View style={styles.container}>
      {favoritesList}
      <Text style={styles.title}>This screen WTF exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
