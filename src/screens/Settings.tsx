import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ScrollView, Image, Platform, Button, TouchableWithoutFeedback } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native' // <-- import useNavigation hook
//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStateOrAny,useDispatch, useSelector } from 'react-redux';
import { login, loginRequestGoogle, loginSuccess, logoutSuccess } from '../actions/auth';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


export default function ProfileScreen({navigation}){

  const dispatch = useDispatch();
  const userState = useSelector((state: RootStateOrAny) => state.loginReducer)
  const stateRedux = useSelector((state: RootStateOrAny) => state)
  const [state, setState] = useState({ user: null });
  const [userInfo, setUserInfo] = useState(null);

  console.ignoredYellowBox = ['Warning:'];
  const WebClientID = '217160887815-h7rbqk8i1d6hiiebd7gp0ktoqvqibm6c.apps.googleusercontent.com';

  GoogleSignin.configure({
    webClientId: '217160887815-h7rbqk8i1d6hiiebd7gp0ktoqvqibm6c.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
  });
 
  const signIn = async () => {
    dispatch(loginRequestGoogle());
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      dispatch(logoutSuccess());
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = () => {
    signIn()
    .then(data => {
      // data provides us with an idToken and accessToke, we use these to set up a credential
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      try {
          firebase.auth().signInWithCredential(googleCredential)
          .then(user => {
              //after we have the credential - lets check if the user exists in firestore
              var docRef = firestore().collection('users').doc(auth().currentUser.uid);

              docRef.get()
              .then(doc => {
                  dispatch(loginSuccess({id:auth().currentUser?.uid, email:data?.user.email, profilePicture:data?.user.photo }));
                  if (doc.exists) {
                  //user exists then just update the login time
                  setUserInfo(data);
                  return user
                  } else {
                  //user doesn't exist - create a new user in firestore
                  addNewUserToFirestore(user);
                  setUserInfo(data);
                  }
              })
              .catch(error => {
                  console.error('Checking if customer exists failed" ' + error);
              });
          })
          .catch(error => {
              console.error('GoogleSignIn to firebase Failed ' + error);
          })
      } catch (error) {
          console.log("Something generic went wrong, ", error )
      }
    })
    .catch(error => {
        console.error('GoogleSignIn to firebase Failed ' + error);
    })
  }

  function addNewUserToFirestore(user) {
    const collection = firestore().collection('users');
    const {profile} = user.additionalUserInfo;
    const uid = auth().currentUser?.uid;
    const details = {
      firstName: profile.given_name,
      lastName: profile.family_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
      createdDtm: firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firestore.FieldValue.serverTimestamp(),
    };
    collection.doc(auth().currentUser.uid).set(details);
    return {user, details};
  }

  return (
    <View style={styles.container}>
      {userInfo != null 
        ? <View style={styles.headerColumn}>
           <Image style={styles.userImage} source={{uri: userInfo?.user.photo}}/>
           <Text style={styles.userNameText}>{userInfo?.user.name}</Text>
           </View>
        : <GoogleSigninButton
            style={{ width: '100%', height: 64 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signUp}
            disabled={false} />
      }
        
      <Button
        title="SignOut"
        onPress={() => signOut()}
      />
      { userState.user !== null ?
      <View style={styles.loggedInContainer}>
        <Text>{userState?.user.id}</Text>
        <Text>{userState?.user.email}</Text>
        <Image style={styles.userImage} source={{uri: userState?.user.profilePicture}}/>
        <Text style={styles.loggedInText}>Logged In: </Text>
        <Button
          title="State"
          style={styles.loginButton}
          onPress = {() => {console.log(stateRedux)}}
        />
    </View> :
    null
      }
    </View>
  );
}


// ** Styles **
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    marginTop: 10,
    paddingBottom: 5,
    justifyContent: 'space-between'
  },
  itemMeta: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  itemImage: {
    width:'100%',
    height: 200,
    marginRight: 20,
  },
  title: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: "#111",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  loggedInContainer: {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 40,
},
loggedInText: {
  fontFamily: 'System',
  fontSize: 17,
  fontWeight: '400',
  color: '#000',
},
loginButton: {
  marginTop: 20,
  paddingTop: 20,
},
headerColumn: {
  backgroundColor: 'transparent',
  ...Platform.select({
    ios: {
      alignItems: 'center',
      elevation: 1,
      marginTop: -1,
    },
    android: {
      alignItems: 'center',
    },
  }),
},

header: {
  fontSize: 25
},
userImage: {
  borderRadius: 60,
  height: 120,
  marginBottom: 10,
  width: 120,

},
userNameText: {
  color: '#5B5A5A',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  paddingBottom: 8,
},

});
