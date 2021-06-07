import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, Animated, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
//import ClusteredMapView from "react-native-maps-super-cluster";
import { COORDS, INITIAL_POSITION } from "../Data";
import firestore from '@react-native-firebase/firestore';
import {RootStateOrAny, useSelector} from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'


export default function Dashboard({navigation}:any) {

  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;
  const CARD_HEIGHT = HEIGHT / 4;
  const CARD_WIDTH = Dimensions.get('window').width * 0.85;

  const [ cardList, setCardList ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ markerList, setMarkerList ] = useState([])
  const _scrollView = useRef();
  const superCluster = useRef();

  let zoomLevel = 9;

  useFirestoreConnect(['posts']);
  const posts = useSelector((state: RootStateOrAny) => state.firestore.data.posts )
  
  useEffect(() => {
    getMarkers();
  }, [posts]);

  const getMarkers = () => {
    var arr = [];
    for (let key in posts) {    
      if (posts[key]){
        arr.push({id: key, ...posts[key]});
      }
    }
    console.log(arr);

    const result = arr.map(data => {
      return(
      <Marker 
        key = {data.id}
        identifier	= {data.id}
        coordinate = {{ latitude: data.coordinates._latitude, longitude: data.coordinates._longitude}}
        style = {styles.markerWrap}
        onPress = {handleMarkerPress}
        tracksViewChanges={false}
        >
        <Text style={styles.markerText}>
          {data.price}
        </Text>
        <View style={styles.arrowDown} />
        <View style={styles.marker} />
      </Marker>   
      )
    });
    setLoading(false)
    setMarkerList(result);
  }

  const handleMarkerPress = (e) => {
    let card = posts[e.nativeEvent.id]
    console.log(card);
    setCardList([card]);
  }

  const xOffset = new Animated.Value(0);

  const getMarkersList = (COORDS) => {
    const markers = COORDS.map(data => renderMarker(data));
    setMarkerList(markers);
    console.log(markerList);
  };

  const renderMarker = (data) => {
    return (
      <Marker
        key = {data.id || Math.random()}
        identifier	= {data.identifier}
        coordinate = {data.location}
        style = {styles.markerWrap}
        onPress = {handleMarkerPress}
        tracksViewChanges={false}
        >
        <Text style={styles.markerText}>
          {data.price}
        </Text>
        <View style={styles.arrowDown} />
        <View style={styles.marker} />
      </Marker>
  )}

  /*
  const getMarkers = async () => {
    const markers = await firestore().collection('posts').get();
    const result = markers._docs.map(data => {
      return(
      <Marker 
        key = {data.id}
        identifier	= {data.id}
        coordinate = {data._data.coordinate}
        style = {styles.markerWrap}
        onPress = {handleMarkerPress}
        tracksViewChanges={false}
        >
        <Text style={styles.markerText}>
          {data._data.price}
        </Text>
        <View style={styles.arrowDown} />
        <View style={styles.marker} />
      </Marker>   
      )
    });
    setLoading(false)
    setMarkerList(result);
    wow();
  }
*/

  const onRegionChangeComplete = (region) => {
    zoomLevel = Math.log2(360 * ((WIDTH/256) / region.longitudeDelta)) + 1
  }

  const onClusterPress = (clusterId, children) => {
    if (zoomLevel >= 16) {
      setCardList(children)
    }
    console.log(children.length)
  }
/*
  const renderCluster = (cluster, onPress) => {
        const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId

        return (
          <Marker tracksViewChanges={false} identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
            <View style={styles.clusterContainer}>
              <Text style={styles.clusterText}>
                {pointCount}
              </Text>
            </View>
          </Marker>
        )
      }
*/

const renderCluster = (cluster) => {
  const { geometry, onPress, id } = cluster;

  const markers = superCluster.current.getLeaves(id, Infinity);
  console.log(`id = ${id} Кол-во элементов: ${markers.length}`);  // here you can find properties of your markers

  return (
    <Marker
      key={`${geometry.coordinates[0]}_${geometry.coordinates[1]}`}
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}
      onPress={onPress}
    />
  );
}

      const INITIAL_REGION = {
        latitude: 50,
        longitude: 36,
        latitudeDelta: 1.5,
        longitudeDelta: 1.5,
      };
      
      function getRandomLatitude(min = 49.88, max = 50.03) {
        return Math.random() * (max - min) + min;
      }
      
      function getRandomLongitude(min = 36.15, max = 36.4) {
        return Math.random() * (max - min) + min;
      }

      const _generateMarkers = count => {
        const markers = [];
    
        for (let i = 0; i < count; i++) {
          markers.push(
            <Marker
              key={i}
              coordinate={{
                latitude: getRandomLatitude(),
                longitude: getRandomLongitude()
              }}
              style = {styles.markerWrap}
              tracksViewChanges={false}
              onPress = {handleMarkerPress}
            >
              <Text style={styles.markerText}>
                {Math.round(Math.random()*10000 / 100) * 100}$
              </Text>
              <View style={styles.arrowDown} />
              <View style={styles.marker} />
            </Marker>
          );
        }
    
        return markers;
      };
   
  return (
    <View style={styles.container}>

      {/* == от этого можно избавиться, новая библиотека работает лучше ==
      <ClusteredMapView
        style={{flex: 1}}
        maxZoom	= {18}
        radius = {80}
        maxZoomLevel = {18}
        data={COORDS}
        initialRegion={INITIAL_POSITION}
        //ref={(r) => { this.map = r }}
        preserveClusterPressBehavior = {true}
        onClusterPress = {onClusterPress}
        renderMarker = {renderMarker}
        renderCluster = {renderCluster}
        onRegionChangeComplete = {onRegionChangeComplete} >
      </ClusteredMapView> 
      */ }

      <TouchableOpacity
        onPress={() => getMarkers()}
        style={styles.filterButton}>
        <Text style={styles.filterText}>Filter goes here</Text>
      </TouchableOpacity>
      

      <MapView 
        initialRegion={INITIAL_REGION} 
        style={styles.mapStyle}
        onClusterPress = {onClusterPress}
        //renderCluster = {renderCluster}
        superClusterRef={superCluster}
        >
        {markerList && markerList }
        </MapView>
        { cardList.length === 0 ? null :
        <Animated.ScrollView
          ref = {_scrollView}
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: xOffset,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle = {styles.endPadding}
          onContentSizeChange = {() => { _scrollView.current.scrollTo({x:0, y:0, animated: true})}}
        >
          {cardList.map((marker, index) => (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Details')} key={index}>
            <View style={styles.card} >
              <Image
                source={{uri: marker.images[0]}}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.price}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
            </TouchableWithoutFeedback>
          ))}
        </Animated.ScrollView>
      }

{/*  == оригинальный мапвьюб можно удалить ==
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 49.98,
          longitude: 36.33,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05
        }}
      >
      <Marker
        key='12'
        coordinate={{ latitude: 49.98, longitude: 36.36 }}
        title='wtf title'
        description='wtf description'
      >
      </Marker >
      <Marker
        key='11'
        coordinate={{ latitude: 49.97, longitude: 36.35 }}
        title='wtf title'
        description='wtf description'
      >
      </Marker>
      </MapView> */}
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton:{ 
    margin: 5,
    width: 350,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  clusterContainer: {
    width: 30,
    height: 30,
    padding: 6,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
    clusterText: {
    fontSize: 13,
    color: '#65bc46',
    fontWeight: '500',
    textAlign: 'center',
  },
    scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
    endPadding: {
    paddingRight: Dimensions.get('window').width * 0.01,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width * 0.8,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerText:{
    padding: 6,
    backgroundColor: 'green',
    borderRadius: 12,
    fontSize: 13,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderLeftColor: "rgba(158, 150, 150, .01)",
    borderRightWidth: 6,
    borderRightColor: "rgba(158, 150, 150, .01)",
    borderTopWidth: 6,
    borderTopColor: 'green',
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0,
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});
