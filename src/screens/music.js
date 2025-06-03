import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Background from '../components/background'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as icons from '../assets/icons'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import TrackPlayer, { useProgress, State } from 'react-native-track-player'
import { Slider } from '@miblanchard/react-native-slider'

let isPlayerInitialized = false

async function initializePlayer() {
  if (isPlayerInitialized) {
    console.log('El reproductor ya está inicializado.')
    return
  }

  try {
    await TrackPlayer.setupPlayer()
    const currentQueue = await TrackPlayer.getQueue()
    if (currentQueue.length === 0) {
      await TrackPlayer.add([
        {
          id: '1',
          url: require('../assets/music/cancion1.mp3'),
          title: 'Canción 1',
          artist: 'Artista 1',
        },
        {
          id: '2',
          url: require('../assets/music/cancion2.mp3'),
          title: 'Canción 2',
          artist: 'Artista 2',
        },
      ])
    }
    isPlayerInitialized = true
  } catch (error) {
    console.error('Error al inicializar el reproductor:', error)
  }
}

export default function Music() {
  const bottomSheetModalRef = useRef(null)
  const [selectedMusic, setSelectedMusic] = useState(null)
  const navigation = useNavigation()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const progress = useProgress()
  const snapPoints = useMemo(() => ['100%', '100%'], [])
  const musics = useMemo(
    () => [
      {
        name: 'Mi flor de SAN JUAN',
        letra: (
          <>
            <Text>Zi D</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>ni sanjua{'\n'}Zi D</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>ni sanjua{'\n'}Di d</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>
              ngä ua{'\n'}
              {'\n'}
            </Text>
            <Text>Zi D</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>ni sanjua{'\n'}Zi D</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>ni sanjua{'\n'}Di d</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>
              ngä ua{'\n'}
              {'\n'}
            </Text>
            <Text>Dä 'ñep</Text>
            <Text style={{ textDecorationLine: 'underline' }}>u</Text>
            <Text> dä 'ñehe{'\n'}Dä d</Text>
            <Text style={{ textDecorationLine: 'underline' }}>u</Text>
            <Text>gägi, di d</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>ngäua{'\n'}</Text>
            <Text>Dä 'ñep</Text>
            <Text style={{ textDecorationLine: 'underline' }}>u</Text>
            <Text> dä 'ñehe{'\n'}Dä d</Text>
            <Text style={{ textDecorationLine: 'underline' }}>u</Text>
            <Text>gägi, di d</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>ngäua{'\n\n'}</Text>
            <Text>Donby</Text>
            <Text style={{ textDecorationLine: 'underline' }}>e</Text>
            <Text> d</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>ni</Text>
            <Text>
              {' '}
              mande{'\n'}Hindä du nu ma hmäte{'\n'}
            </Text>
            <Text>Donby</Text>
            <Text style={{ textDecorationLine: 'underline' }}>e</Text>
            <Text> d</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>ni</Text>
            <Text>
              {' '}
              mande{'\n'}Hindä du nu ma hmäte{'\n\n'}
            </Text>
            <Text>Zi D</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>ni sanjua{'\n'}</Text>
            <Text>Zi D</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>ni sanjua{'\n'}Di d</Text>
            <Text style={{ textDecorationLine: 'underline' }}>o</Text>
            <Text>
              ngä ua{'\n'}
              {'\n'}
            </Text>
          </>
        ),
        icons: icons.san_juan,
      },
      {
        name: 'Cabeza, hombro, rodilla, pie',
        letra:
          "Näxu Si'nsi Ñähmu Ua Ñähmu Ua\n\nNäxu Si'nsi Ñähmu ua Ñähmu ua  Da Gu ne xiñu Näxu Si'nsi Ñähmu Ua Ñähmu Ua\n\nNäxu Si'nsi Ñähmu Ua Ñähmu Ua\n\nNäxu Si'nsi Ñähmu Ua Ñähmu Ua\n\nDa Gu Ne Xiñu Näxu Si'nsi Ñähmu Ua Ñähmu Ua",
        icons: icons.cancion2,
      },
    ],
    []
  )

  useEffect(() => {
    const initializePlayerAndCheckStatus = async () => {
      await initializePlayer()

      const currentTrackId = await TrackPlayer.getCurrentTrack()
      if (currentTrackId !== null) {
        const track = await TrackPlayer.getTrack(currentTrackId)
        if (track) {
          const isPlaying = (await TrackPlayer.getState()) === State.Playing
          setCurrentTrack(currentTrackId)
          setIsPlaying(isPlaying)
        }
      }
    }

    initializePlayerAndCheckStatus()

    const trackChangedListener = TrackPlayer.addEventListener(
      'playback-track-changed',
      async ({ nextTrack }) => {
        const track = await TrackPlayer.getTrack(nextTrack)
        if (track) {
          setCurrentTrack(nextTrack)
          setIsPlaying(true)
        } else {
          setIsPlaying(false)
          await TrackPlayer.pause()
        }
      }
    )
    return () => {
      trackChangedListener.remove()
    }
  }, [])

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause()
    } else {
      await TrackPlayer.play()
    }
    setIsPlaying(!isPlaying)
  }

  const skipToNext = async () => {
    const nextTrack = (currentTrack + 1) % musics.length
    setCurrentTrack(nextTrack)
    await TrackPlayer.skip(nextTrack)
  }

  const skipToPrevious = async () => {
    const prevTrack = (currentTrack - 1 + musics.length) % musics.length
    setCurrentTrack(prevTrack)
    await TrackPlayer.skip(prevTrack)
  }

  const handlePresentModalPress = useCallback(
    async (music) => {
      const trackIndex = musics.findIndex((track) => track.name === music.name)

      if (trackIndex !== -1 && trackIndex !== currentTrack) {
        if (isPlaying) {
          await TrackPlayer.pause()
        }
        await TrackPlayer.skip(trackIndex)
        await TrackPlayer.play()
        setCurrentTrack(trackIndex)
        setIsPlaying(true)
      }

      bottomSheetModalRef.current?.present()
    },
    [isPlaying, musics, currentTrack]
  )

  useEffect(() => {
    const music = musics[currentTrack]
    setSelectedMusic(music)
  }, [currentTrack])

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Background />
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.titulo}>
              APRENDE{'\n'}ESCUCHANDO{'\n'}MÚSICA
            </Text>
            <Image source={icons.aprende_escucha} style={styles.image} />
          </View>
          <Text style={styles.texto}>
            Presiona los botones para escuchar la{'\n'}música
          </Text>
        </View>
        <View style={styles.body}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              {musics.map((music, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() => handlePresentModalPress(music)}
                >
                  <Image source={music.icons} style={styles.buttonImagen} />
                  <Text style={styles.buttonText}>{music.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backgroundStyle={styles.modalBackground}
      >
        <BottomSheetView style={styles.modalContent}>
          {selectedMusic && (
            <>
              <View style={styles.albumArtContainer}>
                <Text style={styles.letra}>{selectedMusic.letra}</Text>
              </View>
              <Text style={styles.songTitle}>{selectedMusic.name}</Text>
              <View style={styles.controlsContainer}>
                <TouchableOpacity
                  onPress={skipToPrevious}
                  style={styles.controlButton}
                >
                  <Icon name="skip-previous" size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={togglePlayback}
                  style={[styles.controlButton, styles.playButton]}
                >
                  <Icon
                    name={isPlaying ? 'pause' : 'play-arrow'}
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={skipToNext}
                  style={styles.controlButton}
                >
                  <Icon name="skip-next" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  value={progress.position}
                  minimumValue={0}
                  maximumValue={progress.duration}
                  onSlidingComplete={(value) => TrackPlayer.seekTo(value[0])}
                  minimumTrackTintColor="#007bff"
                  maximumTrackTintColor="#d3d3d3"
                  thumbTintColor="#ffffff"
                />
                <Text style={styles.time}>
                  {formatTime(progress.position)} /{' '}
                  {formatTime(progress.duration)}
                </Text>
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

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
    fontSize: 27,
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
    width: '85%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    gap: 10,
  },
  buttonImagen: {
    width: 100,
    height: 100,
  },
  buttonText: {
    fontSize: 22,
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  modalBackground: {
    backgroundColor: '#f09590',
    borderRadius: 15,
  },
  modalContent: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  albumArtContainer: {
    width: '80%',
    height: '72%',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  letra: {
    fontSize: 21,
    textAlign: 'center',
    fontFamily: 'Fredoka_Condensed-Regular',
  },
  songTitle: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Fredoka_Condensed-Regular',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
  },
  playButton: {
    backgroundColor: '#007bff',
  },
  sliderContainer: {
    width: '70%',
    alignSelf: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  time: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
})
