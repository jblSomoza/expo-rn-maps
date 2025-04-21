import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import * as location from 'expo-location';


export const getCurrentLocation = async (): Promise<LatLng> => {
    try {
        const { coords } = await location.getCurrentPositionAsync({
            accuracy: location.Accuracy.Highest,
        });

        return {
            latitude: coords.latitude,
            longitude: coords.longitude,
        }
    } catch (error) {
        throw new Error('Error getting location');
    }
}

export const watchCurrentPosition = ( locationCallback: (location: LatLng) => void, ) => {
    return location.watchPositionAsync({
        accuracy: location.Accuracy.Highest,
        distanceInterval: 10,
        timeInterval: 1000,
    }, ({ coords }) => {
        locationCallback({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    });
}