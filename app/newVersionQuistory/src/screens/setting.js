import React from 'react'
import { Text, Image, Animated } from 'react-native'
import styled from 'styled-components/native'
import withTitleAndContent from '../components/basicScreen'

export default () => {
    const TitleText = styled.Text`
        color: black;
        font-size: 23px;
    `
    const SettingPageWithData = withTitleAndContent(headerAnimated => <Animated.View style={{
        height: headerAnimated.interpolate({
            inputRange: [0, 50, Infinity],
            outputRange: [90, 70, 70]
        }),
        backgroundColor: '#F7F7F7'
    }}>
    <Image source={{
        uri: 'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2018/05/materialdesignfeat-796x398.jpg'
    }} style={{
        width: 20,
        height: 20
    }} />
        <TitleText>
            test님
    </TitleText>
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