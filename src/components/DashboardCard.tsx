import * as React from 'react';
import { TouchableWithoutFeedback, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { stringify } from 'flatted'

export default function DashboardCard({marker, navigation}:any ) {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Details', stringify(marker))} style={styles.cardContainer} >
            <View style={styles.card} >
              <Image
                source={marker.images.length && {uri: marker.images[0]}}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardTitle}>{marker?.price}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    cardContainer:{
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: Dimensions.get('window').width * 0.1,
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
      cardTitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
      },
      cardDescription: {
        fontSize: 12,
        color: "#444",
      },
})