import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import Background from '../components/background'
import * as icons from '../assets/icons'
import { useNavigation } from '@react-navigation/native'
import Sound from 'react-native-sound'
import Snackbar from 'react-native-snackbar'
import SuccessAlert from '../components/successalert'

export default function Escucha() {
  const navigation = useNavigation()
  const [currentSound, setCurrentSound] = useState(null)
  const initialPairs = [
    { id: 1, translation: "K'AST'I", audio: 'amarillo.mp3' },
    { id: 2, translation: 'IXKI', audio: 'azul.mp3' },
    { id: 3, translation: 'NANXA', audio: 'anaranjado.mp3' },
    { id: 4, translation: "MBO'I", audio: 'negro.mp3' },
    { id: 5, translation: "K'ANGI", audio: 'verde.mp3' },
    { id: 6, translation: 'THENI', audio: 'rojo.mp3' },
    { id: 7, translation: "T'AXI", audio: 'blanco.mp3' },
    { id: 8, translation: "B'OSPI", audio: 'gris.mp3' },
    { id: 9, translation: 'OXA', audio: 'rosa.mp3' },
    { id: 10, translation: "B'OTHE", audio: 'cafe.mp3' },
  ]
  const [currentOptions, setCurrentOptions] = useState([])
  const [correctOption, setCorrectOption] = useState(null)
  const [remainingAttempts, setRemainingAttempts] = useState(3)
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAnimationFinished, setSuccessAnimationFinished] = useState(false);

  useEffect(() => {
    Alert.alert(
      '¡Escucha y selecciona!',
      'Reproduce los sonidos y selecciona la palabra correcta',
      [{ text: 'Continuar' }]
    )
    generateOptions()
  }, [])

  const generateOptions = () => {
    setRemainingAttempts(3)
    const correct =
      initialPairs[Math.floor(Math.random() * initialPairs.length)]
    const incorrectOptions = initialPairs.filter(
      (option) => option.id !== correct.id
    )
    const randomIncorrects = shuffleArray(incorrectOptions).slice(0, 2)
    const options = shuffleArray([correct, ...randomIncorrects])

    setCorrectOption(correct)
    setCurrentOptions(options)
  }

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

  const checkAnswer = (selectedOption) => {
    if (selectedOption.id === correctOption.id) {
      setShowSuccess(true);
      setSuccessAnimationFinished(false);
      setTimeout(() => {
        setShowSuccess(false);
        setSuccessAnimationFinished(true);
      }, 3000);
      Snackbar.show({
        text: 'Respuesta Correcta!',
        duration: Snackbar.LENGTH_SHORT,
      })
      setRemainingAttempts(3)
      generateOptions()
    } else {
      const updatedAttempts = remainingAttempts - 1
      setRemainingAttempts(updatedAttempts)
      if (updatedAttempts === 0) {
        Alert.alert('Ya no tienes intentos.', '¿Salir o reintentar?', [
          { text: 'Salir', onPress: () => navigation.goBack() },
          { text: 'Reintentar', onPress: generateOptions },
        ])
        setRemainingAttempts(3)
      } else {
        Snackbar.show({
          text: 'Respuesta Incorrecta!',
          duration: Snackbar.LENGTH_SHORT,
        })
      }
    }
  }
  const onAnimationFinish = () => {
    setSuccessAnimationFinished(true);
    setShowSuccess(false);
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5)
  }

  return (
    <View style={styles.container}>
      <Background />
      <SuccessAlert visible={showSuccess} onAnimationFinish={onAnimationFinish} />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.titulo}>
            ESCUCHA{'\n'}Y{'\n'}ACIERTA
          </Text>
          <Image source={icons.aprende_jugando3} style={styles.image} />
        </View>
        <Text style={styles.texto}>
          Escucha el sonido y elige la{'\n'}respuesta correcta.
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColors.play }]}
            onPress={() => {
              playAudio(correctOption.audio)
            }}
          >
            <Text>ESCUCHAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: buttonColors.checkAnswer },
            ]}
            onPress={generateOptions}
          >
            <Text>CAMBIAR {'\n'} SONIDO</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.texto}>
          Intentos restantes: {remainingAttempts}
        </Text>
        <View style={styles.optionsContainer}>
          {currentOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => checkAnswer(option)}
            >
              <Text style={styles.optionText}>
                {option.translation === 'THENI' ? (
                  <>
                    {option.translation.slice(0, 2)}
                    <Text style={styles.underline}>E</Text>
                    {option.translation.slice(3)}
                  </>
                ) : (
                  option.translation
                )}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

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
  texto: {
    fontSize: 22,
    fontFamily: 'Fredoka_Condensed-Regular',
    textAlign: 'center',
  },
  body: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
  },
  containerButtons: {
    flexDirection: 'row',
  },
  button: {
    width: '30%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  optionButton: {
    backgroundColor: '#2196F3',
    padding: 20,
  },
  underline: {
    textDecorationLine: 'underline',
  },
})

const buttonColors = {
  play: 'orange',
  checkAnswer: '#4CAF50',
}
