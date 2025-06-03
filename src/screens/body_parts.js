import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Background from '../components/background'
import * as icons from '../assets/icons'
import Sound from 'react-native-sound'

export default function Body_Parts() {
  const [currentSound, setCurrentSound] = useState(null)
  const playAudio = (audio) => {
    if (currentSound) {
      currentSound.stop(() => {
        currentSound.release()
      })
    }
    var ColorsSound = new Sound(audio, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log(error)
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
        <Text style={styles.texto}>
          Presiona los botones para escuchar{'\n'}la pronunciación
        </Text>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {body_parts.map((body_part) => (
              <TouchableOpacity
                key={body_part.name}
                style={styles.button}
                onPress={() => playAudio(body_part.audio)}
              >
                <Image source={body_part.icon} style={styles.imgColors} />
                <Text style={styles.buttonText}>
                  {body_part.name.includes('ye') ? (
                    <>
                      {body_part.name.split('ye')[0]}y
                      <Text style={styles.underline}>e</Text>
                    </>
                  ) : (
                    body_part.name
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

const body_parts = [
  { name: 'Ojo | da', icon: icons.ojo, audio: 'ojo.mp3' },
  { name: 'Oreja | gu', icon: icons.oreja, audio: 'oreja.mp3' },
  { name: 'Nariz | xiñu', icon: icons.nariz, audio: 'nariz.mp3' },
  { name: 'Boca | ne', icon: icons.boca, audio: 'boca.mp3' },
  { name: "Brazo | may'ea", icon: icons.brazo, audio: 'brazo.mp3' },
  { name: 'Pierna | xinthe', icon: icons.pierna, audio: 'pierna.mp3' },
  { name: "Diente | ts'i", icon: icons.diente, audio: 'diente.mp3' },
  { name: 'Mano | ye', icon: icons.mano, audio: 'mano.mp3' },
  { name: 'Pie | va', icon: icons.pie, audio: 'pie.mp3' },
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
