import { View, Text, Pressable, StyleSheet, PressableProps } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'

interface Props extends PressableProps {
    children: string
}

const ThemedPressable = ({ children, ...rest }: Props) => {
  return (
    <Pressable style={styles.btnPrimary} {...rest}>
        <ThemedText style={{ color: 'white' }}>
            {children}
        </ThemedText>
    </Pressable>
  )
}

export default ThemedPressable

const styles = StyleSheet.create({
    btnPrimary: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        margin: 10,
    }
})