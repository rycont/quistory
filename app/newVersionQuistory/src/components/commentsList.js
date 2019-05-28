import React from 'react'
import {Text, View, TouchableNativeFeedback} from 'react-native'
import styled from 'styled-components/native'

const Background = styled.View`
    background-color: #f3f3f3;
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
        <Text>
            악플보다 가슴 아픈건 무플입니다. 댓글을 달아보시겠어요?
        </Text>
    </Background>
}

export {
    CommentsList,
    NoComments
}