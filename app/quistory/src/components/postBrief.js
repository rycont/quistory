import React from 'react'
import {
    View, Text, TouchableNativeFeedback
} from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {makeTopToast} from '../utils/makeToast'


export const PostBrief = ({
    commentsAmount = 0,
    metoo = 0,
    briefly,
    onClickMetoo,
    ifMe = false
}) => {
    const IconButtonContainer = styled.View`
        display: flex;
        flex-direction: row;
        margin-top: ${briefly ? 10 : 20}px;
        opacity: 0.6;
    `
    const BottomIcon = styled(Icon)`
        margin-left: ${briefly ? 3 : 10};
        margin-right: 5;
    `
    const iconSize = briefly ? 17 : 20
    return <IconButtonContainer>
            <View style={{
                width: 50,
                display: 'flex',
                flexDirection: 'row'
            }}>
                <BottomIcon name="question-answer" size={iconSize} style={{
                    marginLeft: 0,
                }} />
                <Text>{commentsAmount}</Text>
            </View>
        <TouchableNativeFeedback onPress={() => onClickMetoo(metoo)}>
            <View style={{
                width: 50,
                display: 'flex',
                flexDirection: 'row'
            }}>
                <BottomIcon name="help" size={iconSize} {...ifMe && ({
                    color: '#00C850'
                })} />
                <Text>{metoo}</Text>
            </View>
        </TouchableNativeFeedback>
    </IconButtonContainer>
}