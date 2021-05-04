import {StackScreenProps} from '@react-navigation/stack';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {RootStackParamList} from '../types';

export default function Filter({
  navigation,
}: StackScreenProps<RootStackParamList, 'Root'>) {

  const dispatch = useDispatch();
  const {loggedIn} = useSelector(state => state.postReducer)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.link}>
          <Text style={styles.linkText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Фильтр</Text>
      </View>
      <View>
        <Text style={styles.title}>Types of property</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    padding: 20,
  },
  headerContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between'
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
