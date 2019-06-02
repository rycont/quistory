import React, { Component } from 'react';
import MyOnboard from './screens/onboardingScreen'
import Home from './screens/home'
import QnaList from './screens/qna'
import FullscreenCard from './screens/fullscreenCard'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer, createStackNavigator } from "react-navigation"
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'



const homeBottomNavigation = createMaterialBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon({ focused }) {
        return <Icon name="home" size={25} color={focused ? '#747474' : '#C8C8C8'} />
      }
    },
  },
  QnaList: {
    screen: QnaList,
    navigationOptions: {
      tabBarIcon({ focused }) {
        return <Icon name="message" size={25} color={focused ? '#747474' : '#C8C8C8'} />
      },
      tabBarVisible(...param) {
        console.log(param)
        return true
      }
    }
  },
  Setting: {
    screen: QnaList,
    navigationOptions: {
      tabBarIcon({ focused }) {
        return <Icon name="person" size={25} color={focused ? '#747474' : '#C8C8C8'} />
      }
    }
  }
}, {
    initialRouteName: 'QnaList',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: 'white' },
    labeled: false,
  })

export default createAppContainer(
  createStackNavigator({
    HomeBottomNavigation: {
      screen: homeBottomNavigation
    },
    FullscreenCard: {
      screen: FullscreenCard
    }
  }, {
      initialRouteName: 'HomeBottomNavigation',
      headerMode: 'none'
    })
)