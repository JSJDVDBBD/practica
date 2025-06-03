import React, { useRef, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Background from '../components/background';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as icons from '../assets/icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import Juegos from '../screens/juegos';

export default function Menu() {
  const navigation = useNavigation()
  const bottomSheetRef = useRef(null)
  const [iconName, setIconName] = useState('keyboard-arrow-up')

  const snapPoints = useMemo(() => ['10%', '100%'], [])

  const menuItems = [
    { name: 'Colores', screen: 'colors', icon: icons.paleta_pintura },
    { name: 'Alfabeto', screen: 'alfabeto', icon: icons.alfabeto },
    { name: 'Números', screen: 'numeros', icon: icons.numeros },
    { name: 'Días de la semana', screen: 'semana', icon: icons.fines_semana },
    { name: 'Partes del cuerpo', screen: 'body_parts', icon: icons.body_parts },
    { name: 'Figuras', screen: 'figures', icon: icons.figuras },
    { name: 'Posiciones', screen: 'positions', icon: icons.positions },
    {
      name: 'Mobiliario de salón',
      screen: 'furniture',
      icon: icons.mobiliario,
    },
    { name: 'Canciones', screen: 'music', icon: icons.musica },
  ]

  const openScreen = (screen) => {
    navigation.navigate(screen)
  }

  const handleSheetChanges = useCallback((index) => {
    if (index === 0) {
      setIconName('keyboard-arrow-up')
    } else {
      setIconName('keyboard-arrow-down')
    }
  }, [])

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Text style={styles.titulo}>Menu</Text>
        <Text style={styles.titulo}>Principal</Text>
        <Text style={styles.subtitulo}>Selecciona una unidad</Text>
        <Text style={styles.subtitulo}>de aprendizaje</Text>
      </View>

      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.buttons}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.screen}
                style={styles.button}
                onPress={() => {
                  openScreen(item.screen)
                }}
              >
                <Image source={item.icon} style={styles.image} />
                <Text style={styles.texto}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleComponent={null}
        containerStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
      >
        <View style={styles.footer}>
          <Icon name={iconName} size={24} color="#fff" />
          <Text style={styles.textoFooter}>Juegos de Retroalimentación</Text>
        </View>
        <BottomSheetView style={styles.contentContainer}>
          <Juegos />
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  titulo: {
    fontFamily: 'Fredoka_SemiCondensed-Medium',
    color: '#bf0806',
    fontSize: 32,
  },
  subtitulo: {
    fontSize: 22,
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  body: {
    width: '100%',
    height: '70%',
  },
  scrollContent: {
    width: '100%',
    height: 715,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    width: 170,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
  texto: {
    fontSize: 22,
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  image: {
    width: 60,
    height: 60,
  },
  contentContainer: {
    width: '100%',
  },
  footer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: '10%',
    backgroundColor: '#7c3030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoFooter: {
    fontSize: 23,
    fontFamily: 'Fredoka_Condensed-Regular',
    color: 'white',
  },
})
