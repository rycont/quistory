import React from 'react'
import {Text, View, TouchableNativeFeedback, Image} from 'react-native'
import styled from 'styled-components/native'

const Background = styled.View`
    background-color: #f7f7f7;
    padding-bottom: 20px;
    `

function CommentsList({
    comments = false
}){
    const Comment = styled.View`
    background-color: white;
    padding: 12px;
    border: 0px solid rgba(0, 0, 0, 0.1);
    border-top-width: 1px;
    `
    const Author = styled.Text`
    color: #202020;
    font-weight: 700;
    margin-bottom: 2px;
    `
    const Content = styled.Text`
    color: #202020;
    `
    return (
        <Background>
            {comments.map(v => <TouchableNativeFeedback key={encodeURI(`${v.author}ABCDEDDD${v.content}`)} onLongPress={() => {
                alert('댓글 팝업')
            }}>
                <Comment>
                <Author>{v.author}</Author>
                <Content>{v.content}</Content>
            </Comment>
            </TouchableNativeFeedback>)}
        </Background>
    )
}

function NoComments() {
    return <Background>
    </Background>
}

export {
    CommentsList,
    NoComments
}