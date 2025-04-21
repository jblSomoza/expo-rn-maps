import { View, Text, ViewProps, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import MapView from "react-native-maps";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import FAB from "../shared/FAB";

interface CustomMapProps extends ViewProps {
  showUserLocation?: boolean;
  initialLocation: LatLng;
}

const CustomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: CustomMapProps) => {
  const { lastKnownLocation, watchLocation, clearWatchLocation, getLocation } =
    useLocationStore();
  const mapRef = useRef<MapView>(null);
  const [isFollowUser, setIsFollowUser] = useState(true);

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnownLocation && isFollowUser) {
      moveCameraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowUser]);

  const moveCameraToLocation = (location: LatLng) => {
    if (mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          zoom: 15,
        },
        { duration: 1000 }
      );
    }
  };

  const moveToCurrent = async () => {
    if (!lastKnownLocation) {
      moveCameraToLocation(initialLocation);
    } else {
      moveCameraToLocation(lastKnownLocation);
    }

    const location = await getLocation();
    if (!location) {
      return;
    }

    moveCameraToLocation(location);
  };

  return (
    <View {...rest}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onTouchStart={() => setIsFollowUser(false)}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={showUserLocation}
      />

      <FAB
        iconName={isFollowUser ? "walk-outline" : "compass-outline"}
        onPress={moveToCurrent}
        style={{ bottom: 90, right: 20 }}
      />

      <FAB
        iconName={ "compass-outline" }
        onPress={moveToCurrent}
        style={{ bottom: 20, right: 20 }}
      />
    </View>
  );
};

export default CustomMap;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
