import {StackScreenProps} from '@react-navigation/stack';
import React, { useState } from 'react';
import { View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image} from 'react-native';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RootStackParamList} from '../types';
import ImagePicker from 'react-native-image-crop-picker';

export default function Add({
  navigation,
}: StackScreenProps<RootStackParamList, 'Root'>) {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [transferred, setTransferred] = useState(0);

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

  const uploadImage = async () => {
    const uri  = image.path;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(`images/${filename}`)
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
    .ref(`images/${filename}`)
    .getDownloadURL();
    try {
      await url;
    } catch (e){
      console.log(e)
    }
    console.log(url)
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    setImage({ path: url});
    setUploaded(true);
  };
  
  
  return (
  <SafeAreaView style={styles.container}>
  <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
    <Text style={styles.buttonText}>Pick an image</Text>
  </TouchableOpacity>
  <View style={styles.imageContainer}>
    {image !== null ? (
      <Image source={{ uri: image.path }} style={styles.imageBox} />
    ) : null}
    {uploading || uploaded ? (
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={transferred} width={300} />
      </View>
    ) : (
      <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
        <Text style={styles.buttonText}>Upload image</Text>
      </TouchableOpacity>
    )}
  </View>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#bbded6'
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
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
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300
  }
});

