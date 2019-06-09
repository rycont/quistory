import React from 'react'
import {
    View, Text, TouchableNativeFeedback
} from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'



export const PostBrief = ({
    commentsAmount = 0,
    metoo = 0,
    briefly
}) => {
    const IconButtonContainer = styled.View`
        display: flex;
        flex-direction: row;
        margin-top: ${briefly ? 10 : 20}px;
    `
    const BottomIcon = styled(Icon)`
        margin-left: ${briefly ? 3 : 10};
        margin-right: 5;
    `
    const iconSize = briefly ? 17 : 20
    return <IconButtonContainer>
        <TouchableNativeFeedback onPress={() => {
            alert('GOOD')
        }}>
            <View style={{
                width: 50,
                display: 'flex',
                flexDirection: 'row'
            }}>
                <BottomIcon name="question-answer" size={iconSize} style={{
                    marginLeft: 0
                }} />
                <Text>{commentsAmount}</Text>
            </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => {
            alert('궁금해요 표시되었습니다')
        }}>
            <View style={{
                width: 50,
                display: 'flex',
                flexDirection: 'row'
            }}>
                <BottomIcon name="help" size={iconSize} />
                <Text>{metoo}</Text>
            </View>
        </TouchableNativeFeedback>
    </IconButtonContainer>
}