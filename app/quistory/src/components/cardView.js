import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

function CardView({ render, innerPadding = true, styleMix = {} }) {
    const Container = styled.View`
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        ${innerPadding ? 'padding: 15px;' : ''}
        margin-top: 7px;
        background-color: white;
    `
    return (
        <Container style={styleMix}>
            {render()}
        </Container>
    )
}

export { CardView }