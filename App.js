import React, { useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'
import Menu from './src/nav/menu'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Orientation from 'react-native-orientation-locker'
import Colors from './src/screens/colors'
import Alfabeto from './src/screens/alfabeto'
import Numeros from './src/screens/numeros'
import Semana from './src/screens/semana'
import Juegos from './src/screens/juegos'
import Memorama from './src/screens/memorama'
import Relaciona from './src/screens/relaciona'
import Write_learn from './src/screens/write_learn'
import Escucha from './src/screens/escucha'
import Body_Parts from './src/screens/body_parts'
import Figures from './src/screens/figures'
import Positions from './src/screens/positions'
import Furniture from './src/screens/furniture'
import Music from './src/screens/music'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  const Stack = createNativeStackNavigator()
  const appState = useRef(AppState.currentState)
  const [currentAppState, setCurrentAppState] = useState(appState.current)

  useEffect(() => {
    Orientation.lockToPortrait()

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
      }
      appState.current = nextAppState
      setCurrentAppState(appState.current)
    })

    return () => {
      subscription.remove()
      Orientation.unlockAllOrientations()
    }
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer testID="navigation-container">
        <Stack.Navigator>
          <Stack.Screen
            name="menu"
            component={Menu}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="colors"
            component={Colors}
            options={{
              title: 'COLORES | Yä thuhu yä kuhu',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="alfabeto"
            component={Alfabeto}
            options={{
              title: "EL ALFABETO HÑÄHÑU | Ra hmunts'a nsihi hñähñu",
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 16,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="numeros"
            component={Numeros}
            options={{
              title: "LOS NÚMEROS | Ya b'ede",
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="semana"
            component={Semana}
            options={{
              title: 'DIAS DE LA SEMANA | Yä thuhu yä yoto mapá',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 16,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="body_parts"
            component={Body_Parts}
            options={{
              title: 'PARTES DEL CUERPO | ',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="figures"
            component={Figures}
            options={{
              title: 'FIGURAS | ',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="positions"
            component={Positions}
            options={{
              title: 'POSICIONES | ',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="furniture"
            component={Furniture}
            options={{
              title: 'MOBILIARIO DEL SALÓN | ',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="music"
            component={Music}
            options={{
              title: 'CANCIONES | ',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="juegos"
            component={Juegos}
            options={{
              title: 'JUEGOS',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="memorama"
            component={Memorama}
            options={{
              title: 'JUEGO DE MEMORIA',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="relaciona"
            component={Relaciona}
            options={{
              title: 'RELACIONA LAS PALABRAS',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="escucha"
            component={Escucha}
            options={{
              title: 'ESCUCHA Y SELECCIONA',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="escribe"
            component={Write_learn}
            options={{
              title: 'PALABRAS PERDIDAS',
              headerTitleStyle: {
                fontFamily: 'Fredoka_SemiCondensed-Medium',
                color: 'white',
                fontSize: 20,
              },
              headerStyle: {
                backgroundColor: '#7c3030',
              },
              headerTintColor: 'white',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
