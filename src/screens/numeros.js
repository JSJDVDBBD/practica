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

export default function Numeros() {
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
                <Image source={letter.image} style={styles.imgColors} />
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
  { char: "Uno | n'a", audio: 'uno.mp3', image: icons.icons8_1_100 },
  { char: 'Dos | yoho', audio: 'dos.mp3', image: icons.icons8_2_100 },
  { char: 'Tres | hñu', audio: 'tres.mp3', image: icons.icons8_3_100 },
  { char: 'Cuatro | goho', audio: 'cuatro.mp3', image: icons.icons8_4_100 },
  { char: "Cinco | kut'a", audio: 'cinco.mp3', image: icons.icons8_5_100 },
  { char: "Seis | r'ato", audio: 'seis.mp3', image: icons.icons8_6_100 },
  { char: 'Siete | yoto', audio: 'siete.mp3', image: icons.icons8_7_100 },
  { char: 'Ocho | hñato', audio: 'ocho.mp3', image: icons.icons8_8_100 },
  { char: 'Nueve | guto', audio: 'nueve.mp3', image: icons.icons8_9_100 },
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
    gap: 30,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    width: 150,
    height: 180,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  imgColors: {
    width: 100,
    height: 100,
  },
})
