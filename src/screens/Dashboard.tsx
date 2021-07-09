import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, Animated, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
//import ClusteredMapView from "react-native-maps-super-cluster"; //TODO uninstall
import {RootStateOrAny, useSelector} from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { stringify } from 'flatted'
import DashboardCard from '../components/DashboardCard'

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
          {data.price} $
        </Text>
        <View style={styles.arrowDown} />
        <View style={styles.marker} />
      </Marker>   
      )
    });
    setLoading(false)
    setMarkerList(result);
  }

  const handleMarkerPress = (e:any) => {
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

  const onRegionChangeComplete = (region) => {
    zoomLevel = Math.log2(360 * ((WIDTH/256) / region.longitudeDelta)) + 1
  }

  const onClusterPress = (clusterId, children) => {
    if (zoomLevel >= 16) {
      setCardList(children)
    }
    console.log(children.length)
  }

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
      <TouchableOpacity
        onPress={() => navigation.navigate('Filter')}
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
            <DashboardCard navigation={navigation} marker={marker} key={index}/>
          ))}
        </Animated.ScrollView>
      }
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
    marginVertical: 10,
    marginHorizontal: Dimensions.get('window').width * 0.1,
    width: Dimensions.get('window').width * 0.8,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
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
