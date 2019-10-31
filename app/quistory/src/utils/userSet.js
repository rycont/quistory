import {GoogleSignin} from '@react-native-community/google-signin'
import AsyncStoreage from '@react-native-community/async-storage'
import {Alert} from 'react-native'
import axios from 'axios'
import NetInfo from "@react-native-community/netinfo"

const apiServer = __DEV__ ? 'http://192.168.35.248' : '아직몰라유 하하'

export default async () => {
  const network = await NetInfo.fetch()
  console.log(network)
  if(!network.isConnected) return

  console.log('Try logging in..')
  GoogleSignin.configure({
    webClientId:
      '266296274697-nmd6qd0acsi062vgsgh78lnthunc48t3.apps.googleusercontent.com',
  })
  await GoogleSignin.hasPlayServices()
  const googleUserData = await GoogleSignin.signIn()
  const userLoginData = {
    identifier: googleUserData.user.id,
    password: encodeURIComponent(googleUserData.user.email + googleUserData.user.name),
  }
  const userRegisterData = {
    email: googleUserData.user.email,
    username: userLoginData.identifier,
    password: userLoginData.password,
    name: googleUserData.user.name,
    photo: googleUserData.user.photo
  }
  try {
    const loginData = await axios.post(
      `${apiServer}:13370/auth/local`,
      userLoginData,
    )
    console.log('Successfully Logged in!', loginData.data.jwt)
    await AsyncStoreage.setItem('@user', JSON.stringify(loginData))
    axios.put(
      `${apiServer}:13370/users/${loginData.data.user.id}`,
      userRegisterData,
      {
        headers: {
          Authorization: `bearer ${loginData.data.jwt}`,
        },
      },
    )
    return loginData
  } catch (error) {
    console.log(error)
    Alert.alert(
      undefined,
      'Google로 회원가입하시면 기능을 사용하실 수 있습니다.',
      [
        {
          text: '가입하기',
          onPress: async () => {
            const registerData = await axios.post(
              `${apiServer}:13370/auth/local/register`,
              {...userRegisterData, friends: []},
            )
            console.log('Successfully Signed in!')
            await AsyncStoreage.setItem('@user', JSON.stringify(registerData))
          },
        },
      ],
      {
        cancelable: true,
      },
    )
  }
}
