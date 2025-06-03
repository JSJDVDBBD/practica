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

export default function Semana() {
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
            ESCUCHA{'\n'}Y{'\n'}APRENDE
          </Text>
          <Image source={icons.aprende_jugando2} style={styles.image} />
        </View>
        <Text style={styles.texto}>
          Presiona los botones para escuchar la{'\n'}pronunciación
        </Text>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {letters.map((letter, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => playAudio(letter.audio)}
              >
                <Text style={styles.buttonImage}>{letter.image}</Text>
                <Text style={styles.buttonText}>{letter.char}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
const letters = [
  { char: 'Lunes | Nonxi', audio: 'lunes.mp3', image: 'L' },
  { char: 'Martes | Marte', audio: 'martes.mp3', image: 'M' },
  { char: 'Miercoles | Mierkole', audio: 'miercoles.mp3', image: 'M' },
  { char: 'Jueves | Njuebe', audio: 'jueves.mp3', image: 'J' },
  { char: 'Viernes | Mbehe', audio: 'viernes.mp3', image: 'V' },
  { char: 'Sabado | Nsabdo', audio: 'sabado.mp3', image: 'S' },
  { char: 'Domingo | Ndomingo', audio: 'domingo.mp3', image: 'D' },
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
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    width: 170,
    height: 140,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
  buttonImage: {
    fontSize: 70,
    color: 'red',
    fontFamily: 'Fredoka_Condensed-SemiBold',
  },
  buttonText: {
    fontSize: 22,
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  imgColors: {
    width: 100,
    height: 100,
  },
})
