import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native'
import Background from '../components/background'
import Cards from '../components/cards'
import * as icons from '../assets/icons'

export default function Memorama() {
  const [attempsRemaining, setattempsRemaining] = useState(5)
  useEffect(() => {
    Alert.alert(
      'Memorama!',
      '¡Tienes 5 intentos para encontrar las parejas de cada tarjeta!',
      [{ text: 'Continuar' }]
    )
  }, [])
  const handleAttemptsChange = (newAttempts) => {
    setattempsRemaining(newAttempts)
  }

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.titulo}>
            BUSCA{'\n'}LAS{'\n'}PAREJAS
          </Text>
          <Image source={icons.aprende_jugando2} style={styles.image} />
        </View>
        <Text style={styles.texto}>Busca la pareja de cada color</Text>
        <Text style={styles.texto}>Intentos restantes: {attempsRemaining}</Text>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Cards onAttemptsChange={handleAttemptsChange} />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: '38%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '72%',
    height: '55%',
    backgroundColor: 'white',
    marginTop: '15%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  titulo: {
    fontSize: 30,
    fontFamily: 'Fredoka_Condensed-Regular',
    textAlign: 'center',
  },
  image: {
    width: '50%',
    height: '100%',
  },
  texto: {
    fontSize: 22,
    fontFamily: 'Fredoka_Condensed-Regular',
    textAlign: 'center',
  },
  body: {
    width: '100%',
    height: '60%',
  },
})
