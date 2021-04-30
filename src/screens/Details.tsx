import {StackScreenProps} from '@react-navigation/stack';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, FlatList} from 'react-native';
import {RootStackParamList} from '../types';
import GallerySwiper from "react-native-gallery-swiper";
import ImageView from "react-native-image-viewing";
import { useState } from 'react';

export default function Details({
  navigation,
}: StackScreenProps<RootStackParamList, 'Root'>) {

  const images = [
    {
      key: 1,
      uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
    {
      key: 2,
      uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    },
    {
      key: 3,
      uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
  ];
  
  const renderPhoto = ({ item, index }) => {
    return (
        <View style = {{ width: SCREEN_WIDTH + 5, height: 'auto', 
          flexDirection:'row'}}>
          <FastImage 
            style = { styles.photo }
            resizeMode = { FastImage.resizeMode.contain }
            source = {{ uri: item.source.uri }}
          /> 
          {itemSeparatorComponent()}
        </View>
  )}

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
{/*
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

          <FlatList
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={images}
            renderItem={item => renderPhoto(item)}
            keyExtractor={photo => photo.id}
            style={{width: SCREEN_WIDTH + 5, height:'100%'}}
          />
*/}
    <FlatList
      horizontal
      pagingEnabled
      data={images}
      style={styles.flatlist}
      keyExtractor={image => image.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: item.uri}} />
          </View>
        );
      }}
    />

        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.link}>
            <Text style={styles.linkText}>RETURN BUTTON</Text>
        </TouchableOpacity>
        {/*
        <ScrollView
            style={styles.gallery}
            horizontal
            snapToInterval={640}
        >
        <Image
        style = {styles.cardImage}
            source={require('../assets/1.jpg')}
                resizeMode="cover"
              />
        <Image
                source={require('../assets/2.jpg')}
                resizeMode="cover"
              />        
        <Image
              source={require('../assets/3.jpg')}
              resizeMode="cover"
            />
        </ScrollView>
        */}
      <Text style={styles.title}>This screen Details exist.</Text>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  gallery: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cardImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    }  
});
