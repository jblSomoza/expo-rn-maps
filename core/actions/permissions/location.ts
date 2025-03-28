import { PermissionStatus } from '@/infrastructure/interfaces/location';
import { getForegroundPermissionsAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { Alert, Linking } from 'react-native';

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    const { status } = await requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        if(status === 'denied') {
            manualRequestLocationPermission();
        }

        return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
}

export const checkLocationPermission = async () => {
    const { status } = await getForegroundPermissionsAsync();

    switch (status) {
        case 'granted':
            return PermissionStatus.GRANTED;
        case 'denied':
            return PermissionStatus.DENIED;
        default:
            return PermissionStatus.UNDETERMINED;
    }
}

const manualRequestLocationPermission = async () => {
    Alert.alert(
        'Permiso de ubicación',
        'Necesitamos tu permiso para acceder a tu ubicación',
        [
            {
                text: 'Cancelar',
                style: 'destructive',
            },
            {
                text: 'Abrir ajustes',
                onPress: async () => {
                    Linking.openSettings();
                },
            },
        ]
    );
}