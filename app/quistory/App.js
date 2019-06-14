import React, { Component } from 'react'
import Home from './src/screens/home'
import QnaList from './src/screens/qna'
import FullscreenCard from './src/screens/fullscreenCard'
import Setting from './src/screens/setting'
import NewQuestionEditor from './src/screens/newQuestionEditor'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { createAppContainer, createStackNavigator } from "react-navigation"
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'



const homeBottomNavigation = createMaterialBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon({ focused }) {
        return <Icon name="home" size={25} color={focused ? '#FAC564' : 'white'} />
      }
    },
  },
  QnaList: {
    screen: QnaList,
    navigationOptions: {
      tabBarIcon({ focused }) {
        return <Icon name="message" size={25} color={focused ? '#FAC564' : 'white'} />
      }
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      tabBarIcon({ focused }) {
        return <Icon name="person" size={25} color={focused ? '#FAC564' : 'white'} />
      }
    }
  },

}, {
    initialRouteName: 'QnaList',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {
      backgroundColor: '#344955',
      elevation: 0
    },
    labeled: false,
  })

export default createAppContainer(
  createStackNavigator({
    HomeBottomNavigation: {
      screen: homeBottomNavigation,
      navigationOptions: {
        header: null
      },
    },
    FullscreenCard: {
      screen: FullscreenCard,
      navigationOptions: {
        title: '질문'
      }
    },
    NewQuestionEditor: {
      screen: NewQuestionEditor,
      navigationOptions: {
        title: '새 질문'
      }
    }
  }, {
      initialRouteName: 'HomeBottomNavigation',
      defaultNavigationOptions: {
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1.3,
          borderBottomColor: 'rgba(0, 0, 0, 0.2)'
        }
      }
    })
)