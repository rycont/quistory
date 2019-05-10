// @flow
import React from 'react'
import { Text, View, Image } from 'react-native'
import styled from 'styled-components/native'



function FullscreenCard({navigation} : {navigation: any}) {
    const {state: {params: {
        author, content, date, comments, metoo
    }}} = navigation
    
    const Background = styled.View`
    background-color: white;
    `
    return (
        <Background>
        </Background>
    )
}

FullscreenCard.navigationOptions = (({navigation}) => ({
    //title: '질문',
}))

export default FullscreenCard