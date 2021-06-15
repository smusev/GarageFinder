import {StackScreenProps} from '@react-navigation/stack';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, FlatList} from 'react-native';
import {RootStackParamList} from '../types';
import GallerySwiper from "react-native-gallery-swiper"; //TODO uninstall this 
import ImageView from "react-native-image-viewing"; //TODO uninstall this
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import { parse } from 'flatted'

export default function Details({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'Root'>) {

  const item = parse(route.params);
  const images = item.images.map((image, index) => {return {key: index, id: index, uri: image}}); 

  const itemSeparatorComponent = () => {
    return <View style = {
        {
            height: '100%',
            width: 5,
            backgroundColor: 'red',
        }
    }
    />
    }

  const [visible, setIsVisible] = useState(false);
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.returnButton}>
          <FontAwesome
            style={styles.returnIcon}
            icon={SolidIcons.arrowLeft}
          />
      </TouchableOpacity>
    
    <View style={styles.galleryContainer}>
      <FlatList
        horizontal 
        pagingEnabled
        data={images}
        style={styles.galleryList}
        initialNumToRender={2} 
        keyExtractor={image => image.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          console.log(`item details: ${JSON.stringify(item)}`)
          return (
            <View style={styles.imageContainer}>
              <Image style={styles.galleryImage} source={{uri: item.uri}} />
            </View>
          );
        }}
    />
    </View>

      <View style={styles.styledInfo}>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      <View style={styles.notStyledInfo}>
        <Text style={styles.linkText}>{item.price}</Text>
      </View>

      <View style={styles.notStyledInfo}>
        <Text style={styles.linkText}>{item.description}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
  },
  returnButton:{ 
    margin: 5,
    width: 50,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    },
  returnIcon:{
    color: 'white',
    fontSize: 24,
  },
  galleryContainer:{
    height: "40%",
  },
  galleryList:{

  },
  imageContainer:{
  },
  galleryImage:{
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1,
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
  gallery: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  flatlist: {
    flex: 1,
    height: Dimensions.get('window').height*0.35,
    backgroundColor: 'blue',
    aspectRatio: 1,
  },
  cardImage: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    }  
});
