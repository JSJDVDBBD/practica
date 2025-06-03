import { registerRootComponent } from 'expo'
import TrackPlayer from 'react-native-track-player'
import App from './App'
import playerService from './playerService'

registerRootComponent(App)
TrackPlayer.registerPlaybackService(() => playerService)
