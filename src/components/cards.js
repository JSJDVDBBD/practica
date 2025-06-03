import * as React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native'
import * as icons from '../assets/icons'
import { useNavigation } from '@react-navigation/native'
import Sound from 'react-native-sound'

export default function Cards({ onAttemptsChange }) {
  const navigation = useNavigation()
  const [board, setBoard] = React.useState(() => shuffle([...cards, ...cards]))
  const [flippedCards, setFlippedCards] = React.useState([])
  const [matchedCards, setMatchedCards] = React.useState([])
  const [attempts, setAttempts] = React.useState(5)
  const timeoutRef = React.useRef(null)
  const [currentSound, setCurrentSound] = React.useState(null)
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

  const handleCardPress = (card, index) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(card.char)
    )
      return

    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards
      const firstCard = board[firstIndex]
      const secondCard = board[secondIndex]

      if (firstCard.char === secondCard.char) {
        playAudio(firstCard.audio)
        const newMatchedCards = [...matchedCards, firstCard.char]
        setMatchedCards(newMatchedCards)
        setFlippedCards([])

        if (newMatchedCards.length === cards.length) {
          Alert.alert('¡Ganaste!', 'Has emparejado todas las cartas', [
            { text: 'Jugar de nuevo', onPress: resetGame },
          ])
        }
      } else {
        const newAttempts = attempts - 1
        setAttempts(newAttempts)
        onAttemptsChange(newAttempts)

        if (newAttempts === 0) {
          Alert.alert('Perdiste', 'Se agotaron los intentos', [
            { text: 'Salir', onPress: () => navigation.goBack() },
            { text: 'Reintentar', onPress: resetGame },
          ])
        }
        timeoutRef.current = setTimeout(() => {
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    clearTimeout(timeoutRef.current)
    setBoard(shuffle([...cards, ...cards]))
    setFlippedCards([])
    setMatchedCards([])
    setAttempts(5)
    onAttemptsChange(5)
  }

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])
  React.useEffect(() => {
    return () => {
      if (currentSound) {
        currentSound.release()
      }
    }
  }, [currentSound])

  return (
    <View style={styles.content}>
      {board.map((card, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleCardPress(card, index)}
        >
          {flippedCards.includes(index) || matchedCards.includes(card.char) ? (
            <Image source={card.image} style={styles.imgColors} />
          ) : (
            <Text style={styles.texto}>?</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  )
}

const cards = [
  { char: 'amarillo', audio: 'amarillo.mp3', image: icons.amarillo },
  { char: 'azul', audio: 'azul.mp3', image: icons.azul },
  { char: 'anaranjado', audio: 'anaranjado.mp3', image: icons.anaranjado },
  { char: 'negro', audio: 'negro.mp3', image: icons.negro },
  { char: 'verde', audio: 'verde.mp3', image: icons.verde },
  { char: 'rojo', audio: 'rojo.mp3', image: icons.rojo },
  { char: 'blanco', audio: 'blanco.mp3', image: icons.blanco },
  { char: 'gris', audio: 'gris.mp3', image: icons.gris },
  { char: 'rosa', audio: 'rosa.mp3', image: icons.rosa },
  { char: 'cafe', audio: 'cafe.mp3', image: icons.cafe },
]

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }
  return array
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    width: 100,
    height: 180,
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
  texto: {
    fontFamily: 'Fredoka_Condensed-Bold',
    color: 'red',
    fontSize: 120,
  },
})
