import styled from 'styled-components/native'
import React from 'react'
import {TouchableNativeFeedback} from 'react-native'

const Selection = styled.Text`
    flex: 1;
    text-align: center;
    padding: 15px;
    text-align-vertical: center;
    `
const RightBorderSelection = styled(Selection)`
    border-right-width: 1px;
    border-right-color: rgba(0, 0, 0, 0.1);
    `

export const AnswerButton = ({ label, rightBorder, action, textSize }) => <TouchableNativeFeedback onPress={() => action(label)}>
    {
        rightBorder ?
        <RightBorderSelection style={{
            fontSize: textSize
        }}>
            {label}
        </RightBorderSelection>
        : 
        <Selection style={{
            fontSize: textSize
        }}>
            {label}
        </Selection>
    }
</TouchableNativeFeedback>