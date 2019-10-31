import React, {useState} from 'react'
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {CardView} from '../components/cardView'
import {PostBrief} from '../components/postBrief'
import styled from 'styled-components/native'
import pad from '../utils/pad'
import Markdown from '@stream-io/react-native-simple-markdown'
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from 'react-apollo'
import formatDate from '../utils/formatDate'

const Photo = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-top: 5px;
  margin-right: 5px;
`
const Uploder = styled.Text`
  color: #505050;
  font-weight: bold;
  margin-left: 3px;
`
const Content = styled(Markdown)`
  color: #202020;
  font-size: 15;
  line-height: 25;
`

const UPDATE_METOO = gql`
  mutation updateMetoo($question: ID!, $metoo: [ID]!) {
    updateQuestion(input: {data: {metoo: $metoo}, where: {id: $question}}) {
      question {
        metoo {
          id
        }
      }
    }
  }
`

function QuestionCard({
  user,
  contents,
  date,
  comments,
  metoo = [],
  navigate,
  briefly,
  questionId,
  refetch,
  offline,
  userId,
  reported,
  query,
}) {
  const [updateMetoo] = useMutation(UPDATE_METOO)

  const BasicInfo = styled.View`
    display: flex;
    flex-direction: row;
    margin-bottom: ${briefly ? 7 : 15}px;
  `
  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigate({
          routeName: 'FullscreenCard',
          params: {
            user,
            contents,
            date: formatDate(date),
            comments,
            metoo,
            questionId,
            offline,
            userId,
            reported,
            query,
          },
        })
      }>
      <View>
        <CardView
          styleMix={{
            paddingTop: 12,
          }}>
          <View>
            <BasicInfo>
              {!briefly && (
                <Photo
                  source={{
                    uri: user?.photo,
                  }}
                />
              )}
              <View>
                {!briefly && <Uploder>{user?.name || '탈퇴한 사용자'}</Uploder>}
                <Text style={briefly && {
                  opacity: 0.7
                }}>{formatDate(date)}</Text>
              </View>
            </BasicInfo>
            <Markdown>{contents}</Markdown>
            <PostBrief
              commentsAmount={comments.length}
              metoo={metoo.length}
              briefly={briefly}
              ifMe={metoo.includes(userId)}
              onClickMetoo={async () => {
                metoo.includes(userId)
                  ? await updateMetoo({
                      variables: {
                        question: questionId,
                        metoo: metoo.filter(e => e !== userId),
                      },
                      refetchQueries: [
                        {
                          query,
                        },
                      ],
                    })
                  : await updateMetoo({
                      variables: {
                        question: questionId,
                        metoo: [...metoo, userId],
                      },
                      refetchQueries: [
                        {
                          query,
                        },
                      ],
                    })
              }}
            />
          </View>
        </CardView>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  verticalDots: {
    flex: 1,
    textAlign: 'right',
  },
})

export {QuestionCard}
