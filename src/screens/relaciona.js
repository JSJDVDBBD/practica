import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Background from '../components/background'
import * as icons from '../assets/icons'
import SuccessAlert from '../components/successalert'

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function Relaciona() {
  const navigation = useNavigation()
  const initialPairs = [
    { id: 1, color: 'Amarillo', translation: "K'AST'I" },
    { id: 2, color: 'Azul', translation: 'IXKI' },
    { id: 3, color: 'Anaranjado', translation: 'NANXA' },
    { id: 4, color: 'Negro', translation: "MBO'I" },
    { id: 5, color: 'Verde', translation: "K'ANGI" },
    { id: 6, color: 'Rojo', translation: 'THENI' },
    { id: 7, color: 'Blanco', translation: "T'AXI" },
    { id: 8, color: 'Gris', translation: "B'OSPI" },
    { id: 9, color: 'Rosa', translation: 'OXA' },
    { id: 10, color: 'Café', translation: "B'OTHE" },
  ]

  const [pairs, setPairs] = useState([])
  const [selectedColorId, setSelectedColorId] = useState(null)
  const [selectedTranslationId, setSelectedTranslationId] = useState(null)
  const [attempts, setAttempts] = useState(3)
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAnimationFinished, setSuccessAnimationFinished] = useState(false);

  useEffect(() => {
    Alert.alert(
      '¡Relaciona las palabras!',
      'Relaciona las palabras con su significado correspondiente\n\nTienes 3 intentos para relacionarlas, de lo contrario el juego termina.',
      [{ text: 'Continuar' }]
    )
  }, [])

  useEffect(() => {
    resetGame()
  }, [])

  const resetGame = () => {
    const combinedPairs = initialPairs.flatMap((pair) => [
      { id: pair.id, type: 'color', value: pair.color },
      { id: pair.id, type: 'translation', value: pair.translation },
    ])
    setPairs(shuffleArray(combinedPairs))
    setAttempts(3)
    setSelectedColorId(null)
    setSelectedTranslationId(null)
  }

  const handlePress = (id, type) => {
    if (type === 'color') {
      if (selectedTranslationId) {
        checkMatch(id, selectedTranslationId)
      } else {
        setSelectedColorId(id)
      }
    } else {
      if (selectedColorId) {
        checkMatch(selectedColorId, id)
      } else {
        setSelectedTranslationId(id)
      }
    }
  }

  const checkMatch = (colorId, translationId) => {
    if (colorId === translationId) {
      const newPairs = pairs.filter(
        (pair) => pair.id !== colorId && pair.id !== translationId
      )
      setPairs(newPairs)
      if (newPairs.length === 0) {
        setShowSuccess(true);
        setSuccessAnimationFinished(false);
        setTimeout(() => {
          setShowSuccess(false);
          setSuccessAnimationFinished(true);
          onAnimationFinish();
        }, 3000);
      }
    } else {
      setAttempts((prev) => {
        const newAttempts = prev - 1
        if (newAttempts <= 0) {
          Alert.alert('Fallaste!', '¡Te has quedado sin intentos!', [
            {
              text: 'SALIR',
              onPress: () => {
                navigation.goBack()
              },
            },
            { text: 'REINICIAR', onPress: resetGame },
          ])
        }
        return newAttempts
      })
    }

    setSelectedColorId(null)
    setSelectedTranslationId(null)
  }

  const onAnimationFinish = () => {
    setSuccessAnimationFinished(true);
    setTimeout(() => {
      Alert.alert('¡Felicidades!', '¡Has completado el juego!', [
        {
          text: 'SALIR',
          onPress: () => {
            navigation.goBack();
          },
        },
        { text: 'VOLVER A JUGAR', onPress: resetGame },
      ]);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <Background />
      <SuccessAlert visible={showSuccess} onAnimationFinish={onAnimationFinish} />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.titulo}>
            RELACIONA{'\n'}LAS{'\n'}PALABRAS
          </Text>
          <Image source={icons.aprende_escucha} style={styles.image} />
        </View>
        <Text style={styles.texto}>
          Relaciona la palabra con su{'\n'}significado
        </Text>
        <Text style={styles.texto}>Intentos: {attempts}</Text>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.columnContainer}>
            <View style={styles.column}>
              {pairs
                .filter((pair) => pair.type === 'color')
                .map((pair) => (
                  <TouchableOpacity
                    key={pair.id}
                    style={[
                      styles.button,
                      selectedColorId === pair.id && styles.selectedButton,
                    ]}
                    onPress={() => handlePress(pair.id, 'color')}
                  >
                    <Text style={styles.buttonText}>{pair.value}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            <View style={styles.column}>
              {pairs
                .filter((pair) => pair.type === 'translation')
                .map((pair) => (
                  <TouchableOpacity
                    key={pair.id}
                    style={[
                      styles.button,
                      selectedTranslationId === pair.id &&
                      styles.selectedButton,
                    ]}
                    onPress={() => handlePress(pair.id, 'translation')}
                  >
                    <Text style={styles.buttonText}>
                      {pair.value === 'THENI' ? (
                        <>
                          {pair.value.slice(0, 2)}
                          <Text style={styles.underline}>E</Text>
                          {pair.value.slice(3)}
                        </>
                      ) : (
                        pair.value
                      )}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </ScrollView>
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
    gap: 10,
  },
  titulo: {
    fontSize: 30,
    fontFamily: 'Fredoka_Condensed-Regular',
    textAlign: 'center',
  },
  image: {
    width: '50%',
    height: '90%',
  },
  texto: {
    fontSize: 22,
    fontFamily: 'Fredoka_Condensed-Regular',
    textAlign: 'center',
  },
  body: {
    marginTop: '3%',
    width: '100%',
    height: '57%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 140,
    height: 100,
    marginBottom: 20,
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
  selectedButton: {
    backgroundColor: 'lightgreen',
  },
  underline: {
    textDecorationLine: 'underline',
  },
})
