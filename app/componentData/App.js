import React from 'react'
import Home from './src/screens/home'
import QnaList from './src/screens/qna'
import FullscreenCard from './src/screens/fullscreenCard'
import Setting from './src/screens/setting'
import NewQuestionEditor from './src/screens/newQuestionEditor'
import Quiz from './src/screens/quiz'
import withQuestions from './src/hocs/withQuestions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import AsyncStorage from '@react-native-community/async-storage'

const apiServer = __DEV__ ? 'http://192.168.35.66' : '아직몰라유 하하'
console.log(`${apiServer}:13370/graphql`)

const homeBottomNavigation = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon({focused}) {
          return (
            <Icon name="home" size={25} color={focused ? '#FAC564' : 'white'} />
          )
        },
      },
    },
    QnaList: {
      screen: QnaList,
      navigationOptions: {
        tabBarIcon({focused}) {
          return (
            <Icon
              name="message"
              size={25}
              color={focused ? '#FAC564' : 'white'}
            />
          )
        },
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarIcon({focused}) {
          return (
            <Icon
              name="person"
              size={25}
              color={focused ? '#FAC564' : 'white'}
            />
          )
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {
      backgroundColor: '#344955',
      elevation: 0,
    },
    labeled: false,
  },
)

export default () => {
  const AppCon = createAppContainer(
    createStackNavigator(
      {
        HomeBottomNavigation: {
          screen: homeBottomNavigation,
          navigationOptions: {
            header: null,
          },
        },
        FullscreenCard: {
          screen: FullscreenCard,
          navigationOptions: {
            title: '질문',
          },
        },
        NewQuestionEditor: {
          screen: NewQuestionEditor,
          navigationOptions: {
            title: '새 질문',
          },
        },
        Quiz: {
          screen: withQuestions(Quiz),
          navigationOptions: {
            header: null,
          },
        },
      },
      {
        initialRouteName: 'HomeBottomNavigation',
        defaultNavigationOptions: {
          headerStyle: {
            elevation: 2,
            borderBottomWidth: 1.3,
            borderBottomColor: 'rgba(0, 0, 0, 0.2)',
            backgroundColor: '#344955',
          },
          headerTintColor: 'white',
        },
      },
    ),
  )
  return (
    <ApolloProvider
      client={
        new ApolloClient({
          uri: `${apiServer}:13370/graphql`,
          request: async (operation) => {
            const token = JSON.parse(await AsyncStorage.getItem('@user')).data.jwt
            operation.setContext({
              headers: {
                Authorization: `bearer ${token}`
              }
            });
          }
        })
      }>
      <AppCon />
    </ApolloProvider>
  )
}
