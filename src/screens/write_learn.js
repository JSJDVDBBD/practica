import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Background from '../components/background';
import * as icons from '../assets/icons';
import SuccessAlert from '../components/successalert';

export default function Write_learn() {
  const [inputValue, setInputValue] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [letters, setLetters] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAnimationFinished, setSuccessAnimationFinished] = useState(false);

  const palabras = [
    { name: "N'A" },
    { name: 'YOHO' },
    { name: 'HÑU' },
    { name: 'GOHO' },
    { name: "KUT'A" },
    { name: "R'ATO" },
    { name: 'YOTO' },
    { name: 'HÑATO' },
    { name: 'GUTO' },
    { name: 'NONXI' },
    { name: 'MARTE' },
    { name: 'MIERKOLE' },
    { name: 'NJUEBE' },
    { name: 'MBEHE' },
    { name: 'NSABDO' },
    { name: 'NDOMINGO' },
  ];

  useEffect(() => {
    setNewWord();
  }, []);

  const setNewWord = () => {
    const randomIndex = Math.floor(Math.random() * palabras.length);
    const selectedWord = palabras[randomIndex].name;

    setCurrentWord(selectedWord);
    const uniqueLetters = Array.from(new Set(selectedWord.split('')));
    setLetters(shuffleArray(uniqueLetters));
    setInputValue('');
  };

  const handleLetterPress = (letter) => {
    setInputValue((prev) => prev + letter);
  };

  const deleteLetterPress = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleCheckAnswer = () => {
    if (inputValue.toLowerCase() === currentWord.toLowerCase()) {
      setShowSuccess(true);
      setSuccessAnimationFinished(false);
      setTimeout(() => {
        setShowSuccess(false);
        setSuccessAnimationFinished(true);
      }, 3000);
      setTimeout(setNewWord, 3100);
    } else {
      Alert.alert(
        '¡Fallaste!',
        'La palabra ingresada no es correcta. Intenta de nuevo.',
        [{ text: 'OK' }]
      );
    }
  };

  const onAnimationFinish = () => {
    setSuccessAnimationFinished(true);
    setShowSuccess(false);
  };

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
          Escribe la palabra como se muestra{'\n'}en el texto
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.word}>{currentWord}</Text>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder=""
          editable={false}
        />
        <View style={styles.letterButtons}>
          {letters.map((letter, index) => (
            <TouchableOpacity
              style={styles.button}
              key={index}
              onPress={() => handleLetterPress(letter)}
            >
              <Text style={styles.letters}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={[styles.footerbutton, { backgroundColor: buttonColors.newWord }]}
            onPress={setNewWord}
          >
            <Text style={styles.footerText}>NUEVA{'\n'}PALABRA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.footerbutton, { backgroundColor: buttonColors.deleteLetter }]}
            onPress={deleteLetterPress}
          >
            <Text style={styles.footerText}>BORRAR{'\n'}LETRA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.footerbutton, { backgroundColor: buttonColors.checkAnswer }]}
            onPress={handleCheckAnswer}
          >
            <Text style={styles.footerText}>VERIFICAR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SuccessAlert visible={showSuccess} onAnimationFinish={onAnimationFinish} />
    </View>
  );
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const buttonColors = {
  newWord: '#2196F3',
  deleteLetter: '#F44336',
  checkAnswer: '#4CAF50',
};

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
    alignItems: 'center',
    gap: 30,
  },
  letterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 5,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    elevation: 5,
  },
  input: {
    width: '80%',
    height: 60,
    borderBottomWidth: 1,
    fontSize: 38,
    color: 'black',
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  word: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 38,
    fontFamily: 'Fredoka_Condensed-Light',
  },
  letters: {
    fontSize: 23,
    fontFamily: 'Fredoka_Condensed-Regular',
    color: 'white',
  },
  containerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  footerbutton: {
    width: '25%',
    height: '43%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  footerText: {
    fontFamily: 'Fredoka_Condensed-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
});
