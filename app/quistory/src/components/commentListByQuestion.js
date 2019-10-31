import React from 'react'
import {View} from 'react-native'
import {CardView} from './cardView'
import styled from 'styled-components/native'
import Markdown from '@stream-io/react-native-simple-markdown'
import formatDate from '../utils/formatDate'

const QuestionContents = styled(Markdown)`
  font-size: 15px;
  color: #000000;
  opacity: 0.7;
`
const HorizontalLine = styled.View`
  opacity: 0.1;
border: 0.5px solid #000000;
margin-top: 5px;
margin-bottom: 5px;
`
const QuestionUserName = styled.Text`
  font-size: 15px;
  color: #707070;
`
const QuestionInfo = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`
const QuestionCreated = styled.Text`
  font-size: 15px;
  opacity: 0.4;
  margin-left: 10px;
`

const CommentContents = styled.Text`
  font-size: 15px;
`
const CommentCreated = styled(QuestionCreated)`
  font-size: 15px;
  margin-left: 0px;
  margin-bottom: 10px;
`

export default ({question, created_at, user, comments}) => {
  return (
    <CardView styleMix={{
      padding: 20
    }}>
      <QuestionInfo>
        <QuestionUserName>{user}</QuestionUserName>
        <QuestionCreated>{formatDate(created_at)}</QuestionCreated>
      </QuestionInfo>
      <QuestionContents>{question}</QuestionContents>
      <HorizontalLine />
      {comments.map(e => (
        <View key={e.created_at}>
          <CommentContents>{e.contents}</CommentContents>
          <CommentCreated>{formatDate(new Date(e.created_at))}</CommentCreated>
        </View>
      ))}
    </CardView>
  )
}
