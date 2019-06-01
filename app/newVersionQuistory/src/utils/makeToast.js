import { ToastAndroid } from 'react-native'

export const makeTopToast = (text) => ToastAndroid.showWithGravityAndOffset(
    text,
    ToastAndroid.SHORT,
    ToastAndroid.TOP,
    0,
    90
)