import React, { useEffect, useState } from 'react'
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

export default function Figures() {
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
          Presiona los botones para escuchar{'\n'}la pronunciación
        </Text>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {figures.map((figure) => (
              <TouchableOpacity
                key={figure.id}
                style={styles.button}
                onPress={() => playAudio(figure.audio)}
              >
                <Image source={figure.icon} style={styles.imgColors} />
                <Text style={styles.buttonText}>
                  {figure.name.includes('mahyegi') ? (
                    <>
                      {figure.name.split('mahyegi')[0]}mahy
                      <Text style={styles.underline}>e</Text>
                      <Text>gi</Text>
                      {figure.name.split('mahyegi')[1]}
                    </>
                  ) : (
                    figure.name
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

const figures = [
  {
    id: 1,
    name: 'Cuadrado | goho hyo mahyegi',
    icon: icons.cuadrado,
    audio: 'cuadrado.mp3',
  },
  {
    id: 2,
    name: "Rectangulo | yoho hyo mahyegi ne yoho hyo nts'lki",
    icon: icons.rectangulo,
    audio: 'rectangulo.mp3',
  },
  {
    id: 3,
    name: 'Triangulo | hñu hyo mahyegi',
    icon: icons.triangulo,
    audio: 'triangulo.mp3',
  },
  {
    id: 4,
    name: "Circulo | tsant'i",
    icon: icons.circulo,
    audio: 'circulo.mp3',
  },
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
    width: 155,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  imgColors: {
    width: 140,
    height: 120,
  },
  underline: {
    textDecorationLine: 'underline',
  },
})
