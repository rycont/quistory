import React from 'react'
import {TouchableNativeFeedback, Alert} from 'react-native'
import styled from 'styled-components/native'

const Background = styled.View`
  background-color: #f7f7f7;
  padding-bottom: 10px;
`

const Comment = styled.View`
  background-color: white;
  padding: 12px;
  border: 0px solid rgba(0, 0, 0, 0.1);
  border-top-width: 1px;
`
const Author = styled.Text`
  color: #202020;
  font-weight: bold;
  margin-bottom: 2px;
`
const Content = styled.Text`
  color: #202020;
`

function CommentsList({comments = []}) {
  return (
    <Background>
      {comments.map(v => (
        <TouchableNativeFeedback
          key={encodeURI(`${v.created_at}${v.contents}`)}
          onLongPress={() => {
            // alert('댓글 팝업')
          }}>
          <Comment>
            <Author>{v.user.name}</Author>
            <Content>{v.contents}</Content>
          </Comment>
        </TouchableNativeFeedback>
      ))}
    </Background>
  )
}

function NoComments() {
  return <Background></Background>
}

export {CommentsList, NoComments}
