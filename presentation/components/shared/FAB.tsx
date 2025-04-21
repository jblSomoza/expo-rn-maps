import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface FABProps {

    iconName: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const FAB = ({iconName, onPress, style }: FABProps) => {
  return (
    <View style={[ styles.btn, style ]}>
      <Pressable
        onPress={onPress}
      >
        <Ionicons name={ iconName } size={35} color="white" />
      </Pressable>
    </View>
  )
}

export default FAB

const styles = StyleSheet.create({
    btn: {
        zIndex: 99,
        position: 'absolute',
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0.27,
            width: 0.25,
        },
        elevation: 2,
    }
})