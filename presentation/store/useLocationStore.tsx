import React from "react";
import { LocationSubscription } from "expo-location";


import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { create } from "zustand";
import { getCurrentLocation, watchCurrentPosition } from "@/core/actions/location/location";


interface LocationStore {
    lastKnownLocation: LatLng | null;
    userLocationList: LatLng[];
    watchSubscription: LocationSubscription | null;

    getLocation: () => Promise<LatLng>;
    watchLocation: () => void;
    clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationStore>()((set, get) => ({
    lastKnownLocation: null,
    userLocationList: [],
    watchSubscription: null,

    getLocation: async () => {
        const location = await getCurrentLocation();
        set({ lastKnownLocation: location });
        return location;
    },

    watchLocation: async() => {
        const oldSubscription = get().watchSubscription;
        if (oldSubscription !== null) {
            get().clearWatchLocation();
        }

        const watchSubscription = await watchCurrentPosition(
            (latlng) => {
                set({
                    lastKnownLocation: latlng,
                    userLocationList: [...get().userLocationList, latlng],
                });
            }
        );

        set({
            watchSubscription,
        })
    },

    clearWatchLocation: () => {
        const { watchSubscription } = get();
        if (watchSubscription) {
            watchSubscription.remove();
            set({ watchSubscription: null });
        }
    },
}));