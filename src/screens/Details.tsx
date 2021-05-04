import {StackScreenProps} from '@react-navigation/stack';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, FlatList} from 'react-native';
import {RootStackParamList} from '../types';
import GallerySwiper from "react-native-gallery-swiper";
import ImageView from "react-native-image-viewing";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';

export default function Details({
  navigation,
}: StackScreenProps<RootStackParamList, 'Root'>) {

  const images = [
    {
      key: 1,
      id: 1,
      uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
    {
      key: 2,
      id: 2,
      uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    },
    {
      key: 3,
      id: 3,
      uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
  ];
  /*
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
*/

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
          return (
            <View style={styles.imageContainer}>
              <Image style={styles.galleryImage} source={require('../assets/1.jpg')} />
            </View>
          );
        }}
    />
    </View>

    <View style={styles.styledInfo}>
      <Text style={styles.title}>Площадь: 32кв.м.</Text>
    </View>

    <View style={styles.notStyledInfo}>
      <Text style={styles.linkText}>Продам гараж, утепен, приватизирован, крыша перекрыта в мае 2020годаб ондулин. Есть свет, яма, установлены полочки для хранения. Салтовка, 602 м/р-н</Text>
    </View>

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
