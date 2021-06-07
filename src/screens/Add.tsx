import {StackScreenProps} from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  ScrollView} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as Progress from 'react-native-progress';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RootStackParamList} from '../types';
//import ImagePicker from 'react-native-image-crop-picker';
import MultipleImagePicker from "@baronha/react-native-multiple-image-picker";
import marker from '../assets/icons8-marker.png';
import auth, {firebase} from '@react-native-firebase/auth';


export default function Add({
  navigation,
}: StackScreenProps<RootStackParamList, 'Root'>) {

  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [renderedImages, setRenderedImages] = useState(null);
  const [uploadedImages, setUploadedImages ] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [price, setPrice] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 49.9801,
    longitude: 36.3553,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  });

  const selectImages = async () => {
    const options = {
      isPreview:false,
      doneTitle: 'done',
      cancelTitle: 'cancel',
      selectedAssets: images,
      maxSelectedAssets: 6,
      mediaType: 'image',
    }

    MultipleImagePicker.openPicker(options)
    .then(response => {
      setImages(response)
      console.log(response)
    })
    .catch(e => {
      setImages([]);
      console.log(e);
    });
  
  }

/*
  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

/*    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
*/

/*
    ImagePicker.openPicker({
      width: 500,
      height: 300,
      cropping: true    
    }).then(image => {
      console.log(image);
      setImage(image);
      setUploaded(false);
      setUploading(false);
    });
  };
*/

  const uploadImgs = async() => {
    try {
      if (title && text && price && images.length) {
        uploadImages().then((images) => {
          addPost(images);
        });    
      } else {
        throw `no data provided`
      }
    } catch(e){
      console.log(e)
    }
  }

  const uploadImages = async () => {
    try {
      const uploaded = await Promise.all(images.map( async image => {
        const url =  await uploadImage(image.path);
        console.log(url);
        return await url
      }));
      console.log(uploaded);
      await setUploadedImages(uploaded);
      return await uploaded;  
    } catch(e) {}
  }

  const uploadImage = async (uri) => {
    //const uri  = images[0].path;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    console.log(`${filename}, ${uploadUri}`);
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(`${auth().currentUser?.uid}/${filename}`)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    const url = await storage()
    .ref(`${auth().currentUser?.uid}/${filename}`)
    .getDownloadURL();
    try {
      await url;
    } catch (e){
      console.log(e)
    }
    setUploading(false);
    return await url;
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
//    setImage({ path: url});
    setUploaded(true);
  };

  const addPost = (data) => {
    firestore()
      .collection('posts')
      .add({
        apiVersion: 1,
        author: auth().currentUser?.uid,
        user: firebase.firestore().doc('users/' + auth().currentUser?.uid),
        title: title,
        description: text,
        price: price,
        coordinates: new firebase.firestore.GeoPoint(coordinates.latitude, coordinates.longitude),
        images: data,
      })
      .then(() => {
        setPrice(null);
        setText('');
        setTitle('');
        setImages([]);
        setUploadedImages(null);
        console.log('Post added!');
      });
  }

  const onRegionChange = e => {
    setCoordinates(
      e
    );
  }

  
  return (
  <SafeAreaView style={styles.container}>

    <ScrollView>
    <TouchableOpacity onPress={selectImages}>
      <View style={styles.imagesContainerHorisontal}>
        <View style={styles.imageContainer} >
        {image !== null ? (
          <Image source={{uri: `file:///${image.path}`}} style={styles.imageBox} />
        ) : null}
        {images !== null ? images.map(image => {
          return (
            <Image source={{uri: `file:///${image.path}`}} style={styles.imageBox} key={image?.localIdentifier}/>
          )
        }) : 
          <View style={styles.selectButton}>
            <Text style={styles.buttonText}>Pick an image</Text>
          </View>
      }
        </View>
      </View>
    </TouchableOpacity>

    {uploading ? (
        <View style={styles.progressBarContainer}>
          <Progress.Bar progress={transferred} width={300} />
        </View>
      ) : (
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImgs}>
          <Text style={styles.buttonText}>Upload image</Text>
        </TouchableOpacity>
      )}
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Заголовок"
        onChangeText={title => setTitle(title)}
        defaultValue={title}
      />
      <TextInput
        style={{}}
        placeholder="Описание"
        multiline
        numberOfLines = {5}
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Цена"
        onChangeText={price => setPrice(price)}
        defaultValue={price}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
      <TouchableOpacity style={styles.selectButton} onPress={addPost}>
        <Text style={styles.buttonText}>Add post</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.map}>
        <MapView
          style={styles.map}
          initialRegion= {coordinates}
          onRegionChangeComplete={onRegionChange}
        />
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View>

      </View>
      <SafeAreaView style={styles.footer}>
          <Text style={styles.region}>{JSON.stringify(coordinates, null, 2)}</Text>
        </SafeAreaView>


    </ScrollView>


</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  selectButton: {
    borderRadius: 5,
    width: 250,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  uploadButton: {
    borderRadius: 5,
    width: 250,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent:'center',
    justifyContent: 'flex-start',
    height: 210,
    marginTop: 30,
    marginBottom: 30,
  },
  imagesContainerHorisontal:{
    },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 125,
    height: 125,
  },
  mapContainer: {
    flex: 1,
  },
  map:{
    width: 350,
    height: 400,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  }

});

