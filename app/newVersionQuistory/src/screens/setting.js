import React from 'react'
import { Text, Image, Animated } from 'react-native'
import styled from 'styled-components/native'
import withTitleAndContent from '../components/basicScreen'

export default () => {
    const SettingPageWithData = withTitleAndContent(headerAnimated =>
        <Animated.View style={{
            height: headerAnimated.interpolate({
                inputRange: [0, 50, Infinity],
                outputRange: [90, 70, 70]
            }),
            backgroundColor: '#F7F7F7',
            display: 'flex',
            flexDirection: 'row',
            paddingTop: headerAnimated.interpolate({
                inputRange: [0, 50, Infinity],
                outputRange: [20, 15, 15]
            }),
            paddingLeft: 20
        }}>
            <Animated.Image source={{
                uri: 'https://pbs.twimg.com/profile_images/899119956054335488/7KKkdNRo_400x400.jpg'
            }} style={{
                width: headerAnimated.interpolate({
                    inputRange: [0, 50, Infinity],
                    outputRange: [50, 40, 40]
                }),
                height: headerAnimated.interpolate({
                    inputRange: [0, 50, Infinity],
                    outputRange: [50, 40, 40]
                }),
                borderRadius: 60
            }} />
            <Animated.Text style={{
                color: 'black',
                fontSize: headerAnimated.interpolate({
                    inputRange: [0, 50, Infinity],
                    outputRange: [23, 20, 20]
                }),
                paddingTop: headerAnimated.interpolate({
                    inputRange: [0, 50, Infinity],
                    outputRange: [8, 3, 3]
                }),
                marginLeft: 10
            }}>
                test님
            </Animated.Text>
        </Animated.View>
    )(false)({
        height: [90, 70],
        shadow: false
    })(() => (
        <Text style={{
            height: 15000
        }}>설정</Text>
    ))
    return <SettingPageWithData />
}