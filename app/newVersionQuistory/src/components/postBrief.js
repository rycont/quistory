import React from 'react'
import {
    View, Text, TouchableNativeFeedback
} from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'



export const PostBrief = ({
    commentsAmount,
    metoo
}) => {
    const IconButtonContainer = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    `
    const BottomIcon = styled(Icon)`
        margin-left: 10;
        margin-right: 5;
        `
    return <IconButtonContainer>
        <TouchableNativeFeedback onPress={() => {
            alert('GOOD')
        }}>
            <View style={{
                width: 50,
                display: 'flex',
                flexDirection: 'row'
            }}>
                <BottomIcon name="question-answer" size={20} style={{
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
                <BottomIcon name="help" size={20} />
                <Text>{metoo}</Text>
            </View>
        </TouchableNativeFeedback>
    </IconButtonContainer>
}