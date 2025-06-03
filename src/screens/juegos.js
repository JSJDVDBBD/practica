import React from 'react'
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
import { useNavigation } from '@react-navigation/native'

export default function Juegos() {
  const navigation = useNavigation();
  function OpenScreen(nav) {
    navigation.navigate(nav)
  }
  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.titulo}>
            APRENDE{'\n'}HÑÄHÑU{'\n'}JUGANDO
          </Text>
          <Image source={icons.aprende_jugando3} style={styles.image} />
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {letters.map((letter, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => OpenScreen(letter.link)}
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
  { char: 'Relaciona palabras', image: icons.relaciona, link: 'relaciona' },
  { char: 'Escucha y Selecciona', image: icons.quiz, link: 'escucha' },
  { char: 'Juego de memoria', image: icons.memoradum, link: 'memorama' },
  { char: 'Escribe y Aprende', image: icons.ordenar, link: 'escribe' },
]
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    width: '100%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '72%',
    height: '65%',
    backgroundColor: 'white',
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
    width: '40%',
    height: '100%',
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  button: {
    width: '85%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    gap: 20,
  },
  buttonImage: {
    width: 10,
    height: 10,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  imgColors: {
    width: '30%',
    height: '90%',
  },
})
