import {gql} from 'apollo-boost'
import {useQuery, useMutation} from 'react-apollo'
import React from 'react'
import {View} from 'react-native'
import {QuizListItem} from './quizListItem'
import {CardView} from './cardView'

const GET_USER_SAVEDQUIZ = gql`
  query getUserSavedquiz($userId: ID!) {
  user(id: $userId) {
    id
    savedQuizs {
      contents
      comment
      selections
      examiner
      type
      answer
      otherAnswers
      selections
      id
      quizsubunit {
        subunit
        quizlargeunit {
          largeunit
        }
      }
    }
  }
}

`

const QuizListVIew = ({
  navigation: {
    state: {
      params: {userId},
    },
  },
}) => {
  const {data, loading, error} = useQuery(GET_USER_SAVEDQUIZ, {
    variables: {
      userId
    }
  })
  if(loading) return <></>
  if(error) console.log(error)
  console.log(data)
  return <View style={{
    marginTop: 10,
    paddingLeft: 9,
    paddingRight: 9,
  }}>
    {data.user.savedQuizs.map(e => ({
      ...e,
      answer: e.type === 'multipleChoice' ? Number(e.answer) - 1 : e.answer,
      otherAnswers: e.otherAnswers || [],
      selections: e.selections || [],
    })).map((item, index) => <CardView key={item.id}><QuizListItem item={item} isLast /></CardView>)}
  </View>
}

export default QuizListVIew

QuizListVIew.navigationOptions = () => ({
  title: '중요 표시 한 문제',
})
