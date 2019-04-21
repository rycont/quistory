import React, { Component } from 'react';
import { View, Text } from 'react-native'
import MyOnboard from './screens/onboardingScreen'
import Home from './screens/home'
import Qna from './screens/qna'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer } from "react-navigation"
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'

export default createAppContainer(
  createMaterialBottomTabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon({focused}){
          return <Icon name="home" size={25} color={focused? '#747474': '#C8C8C8'} />
        }
      },
    },
    Qna: {
      screen: Qna,
      navigationOptions: {
        tabBarIcon({focused}){
          return <Icon name="message" size={25} color={focused? '#747474': '#C8C8C8'} />
        }
      }
    },
    Setting: {
      screen: Qna,
      navigationOptions: {
        tabBarIcon({focused}){
          return <Icon name="person" size={25} color={focused? '#747474': '#C8C8C8'} />
        }
      }
    }
  }, {
      initialRouteName: 'Qna',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: 'white' },
      labeled: false,
    })
)