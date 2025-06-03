import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Sound from 'react-native-sound'
import Background from '../components/background'
import * as icons from '../assets/icons'

export default function Alfabeto() {
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
          <Image source={icons.aprende_escucha} style={styles.image} />
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
                <Text
                  style={
                    letter.underline ? styles.buttonTextLine : styles.buttonText
                  }
                >
                  {letter.char}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
const letters = [
  { char: 'Aa', audio: 'a.mp3' },
  { char: 'Ää', audio: 'a_puntitos.mp3' },
  { char: 'Bb', audio: 'b.mp3' },
  { char: 'Dd', audio: 'd.mp3' },
  { char: 'Ee', audio: 'e.mp3' },
  { char: 'Ee', audio: 'e_.mp3', underline: 'true' },
  { char: 'Ff', audio: 'f.mp3' },
  { char: 'Gg', audio: 'g.mp3' },
  { char: 'Hh', audio: 'h.mp3' },
  { char: 'li', audio: 'i.mp3' },
  { char: 'Kk', audio: 'k.mp3' },
  { char: 'Ll', audio: 'l.mp3' },
  { char: 'Mm', audio: 'm.mp3' },
  { char: 'Nn', audio: 'n.mp3' },
  { char: 'Ññ', audio: 'n_cejita.pm3' },
  { char: 'Oo', audio: 'o.mp3' },
  { char: 'Oo', audio: 'o_.mp3', underline: 'true' },
  { char: 'Pp', audio: 'p.mp3' },
  { char: 'Rr', audio: 'r.mp3' },
  { char: 'Ss', audio: 's.mp3' },
  { char: 'Tt', audio: 't.mp3' },
  { char: 'Uu', audio: 'u.mp3' },
  { char: 'Uu', audio: 'u_.mp3', underline: 'true' },
  { char: 'Xx', audio: 'x.mp3' },
  { char: 'Yy', audio: 'y.mp3' },
  { char: 'Zz', audio: 'z.mp3' },
]

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
    width: '45%',
    height: '76%',
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
    width: 100,
    height: 100,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#e3cbcb',
    elevation: 5,
  },
  buttonText: {
    fontSize: 50,
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  buttonTextLine: {
    textDecorationLine: 'underline',
    fontSize: 50,
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  imgColors: {
    width: 140,
    height: 140,
  },
})
