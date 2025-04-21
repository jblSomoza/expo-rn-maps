import { ActivityIndicator, View } from "react-native";
import React, { useEffect } from "react";
import CustomMap from "@/presentation/components/maps/CustomMap";
import { useLocationStore } from "@/presentation/store/useLocationStore";

const MapScreen = () => {
  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if(lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  if (lastKnownLocation === null) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View>
      <CustomMap
        initialLocation={lastKnownLocation}
        showUserLocation
      />
    </View>
  );
};

export default MapScreen;

