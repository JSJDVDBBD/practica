import 'react-native-gesture-handler/jestSetup';

// Mock de react-native-orientation-locker
jest.mock('react-native-orientation-locker', () => ({
    lockToPortrait: jest.fn(),
    addOrientationListener: jest.fn(),
    removeOrientationListener: jest.fn(),
}));

// Mock de react-native-sound
jest.mock('react-native-sound', () => {
    return jest.fn().mockImplementation(() => ({
        play: jest.fn(),
        stop: jest.fn(),
        release: jest.fn(),
    }));
});

// Mock de react-native-snackbar
jest.mock('react-native-snackbar', () => ({
    show: jest.fn(),
    LENGTH_SHORT: 1000,
    LENGTH_LONG: 2000,
    LENGTH_INDEFINITE: -1,
}));

// Mock de react-native-track-player
jest.mock('react-native-track-player', () => ({
    useProgress: jest.fn(),
    TrackPlayer: {
        setupPlayer: jest.fn(),
        add: jest.fn(),
        play: jest.fn(),
        stop: jest.fn(),
        release: jest.fn(),
        updateMetadataForTrack: jest.fn(),
        skipToNext: jest.fn(),
        skipToPrevious: jest.fn(),
    },
    State: {
        Playing: 'playing',
        Paused: 'paused',
        Stopped: 'stopped',
    },
}));

// Mock de React Navigation
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
        setParams: jest.fn(),
    }),
}));

// Limpieza de mocks después de cada prueba
afterEach(() => {
    jest.clearAllMocks();
});
