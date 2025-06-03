import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Background from '../components/background'
import * as icons from '../assets/icons'
import Sound from 'react-native-sound'

export default function Colors() {
  const [currentSound, setCurrentSound] = useState(null)
  const playAudio = (audio) => {
    if (currentSound) {
      currentSound.stop(() => {
        currentSound.release()
      })
    }
    var ColorsSound = new Sound(audio, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        return
      }

      ColorsSound.play((success) => {
        if (success) {
          ColorsSound.release()
        }
      })
      setCurrentSound(ColorsSound)
    })
  }
  useEffect(() => {
    return () => {
      if (currentSound) {
        currentSound.release()
      }
    }
  }, [currentSound])

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.titulo}>
            APRENDE{'\n'}HÑAHÑU{'\n'}JUGANDO
          </Text>
          <Image source={icons.aprende_jugando} style={styles.image} />
        </View>
        <Text style={styles.texto}>Presiona los botones para escuchar</Text>
        <Text style={styles.texto}>la pronunciación</Text>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color.name}
                style={styles.button}
                onPress={() => playAudio(color.audio)}
              >
                <Image source={color.icon} style={styles.imgColors} />
                <Text style={styles.buttonText}>
                  {color.name.includes('theni') ? (
                    <>
                      {color.name.split('theni')[0]}th
                      <Text style={styles.underline}>e</Text>
                      ni
                    </>
                  ) : (
                    color.name
                  )}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const colors = [
  { name: "Amarillo | K'ast'i", icon: icons.amarillo, audio: 'amarillo.mp3' },
  { name: 'Azul | ixki', icon: icons.azul, audio: 'azul.mp3' },
  {
    name: 'Anaranjado | nanxa',
    icon: icons.anaranjado,
    audio: 'anaranjado.mp3',
  },
  { name: "Negro | mbo'i", icon: icons.negro, audio: 'negro.mp3' },
  { name: "Verde | k'angi", icon: icons.verde, audio: 'verde.mp3' },
  { name: 'Rojo | theni', icon: icons.rojo, audio: 'rojo.mp3' },
  { name: "Blanco | t'axi", icon: icons.blanco, audio: 'blanco.mp3' },
  { name: "Gris | b'ospi", icon: icons.gris, audio: 'gris.mp3' },
  { name: 'Rosa | oxa', icon: icons.rosa, audio: 'rosa.mp3' },
  { name: "Café | b'othe", icon: icons.cafe, audio: 'cafe.mp3' },
]

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'pink',
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
    width: '32%',
    height: '75%',
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
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    width: 150,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  imgColors: {
    width: 140,
    height: 140,
  },
  underline: {
    textDecorationLine: 'underline',
  },
})
