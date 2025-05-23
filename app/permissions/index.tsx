import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { ThemedText } from '@/presentation/components/shared/ThemedText'
import { usePermissionsStore } from '@/presentation/store/usePermissions'
import ThemedPressable from '@/presentation/components/shared/ThemedPressable'

const PermissionsScreen = () => {

  const { locationStatus,requestLocationPermission } = usePermissionsStore()

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ThemedPressable onPress={requestLocationPermission}>
          Request location permission
        </ThemedPressable>

      <ThemedText>
        Estado actual: { locationStatus}
      </ThemedText>
    </View>
  )
}

export default PermissionsScreen