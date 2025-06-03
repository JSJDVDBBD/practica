import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Background() {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '24%',
    borderBottomLeftRadius: 50,
    borderBottomEndRadius: 50,
    backgroundColor: '#f09590',
  },
})
