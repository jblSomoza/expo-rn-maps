import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React from "react";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 14.628434,
          longitude: -90.522713,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: 14.628434,
            longitude: -90.522713,
          }}
          title={"Marker Title"}
          description={"Marker Description"}
        />

        <Marker
          coordinate={{
            latitude: 14.628434,
            longitude: -90.522713,
          }}
          title={"Marker Title"}
          description={"Marker Description"}
          pinColor={"blue"}
        />

      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
