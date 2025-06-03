import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Background from '../components/background'
import * as icons from '../assets/icons'
import Sound from 'react-native-sound'

export default function Furniture() {
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
          <Image source={icons.aprende_escucha} style={styles.image} />
        </View>
        <Text style={styles.texto}>
          Presiona los botones para escuchar{'\n'}la pronunciación
        </Text>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {furnitures.map((furniture) => (
              <TouchableOpacity
                key={furniture.name}
                style={styles.button}
                onPress={() => playAudio(furniture.audio)}
              >
                <Image source={furniture.icon} style={styles.imgColors} />
                <Text style={styles.buttonText}>
                  {furniture.name.includes('nku hemi') ? (
                    <>
                      {furniture.name.split('nku hemi')[0]}nk
                      <Text style={styles.underline}>u</Text>
                      <Text> h</Text>
                      <Text style={styles.underline}>e</Text>
                      <Text>mi</Text>
                    </>
                  ) : (
                    furniture.name
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

const furnitures = [
  { name: 'Mesa | mexa', icon: icons.mesa, audio: 'mesa.mp3' },
  { name: "Silla | njuat'i", icon: icons.silla, audio: 'silla.mp3' },
  {
    name: "Pizarrón | n'andí nthoni",
    icon: icons.pizarron,
    audio: 'pizarron.mp3',
  },
  { name: 'Librero | nku hemi', icon: icons.estante, audio: 'librero.mp3' },
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
    fontSize: 18,
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
