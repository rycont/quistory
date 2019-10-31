import React from 'react'
import {View} from 'react-native'
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from 'react-apollo'
import styled from 'styled-components/native'
import {QuestionCard} from './questioncard'

const GET_QUESTION_BY_USER = gql`
  query getQuestionByUser($userId: ID!) {
  questions(where: { user: $userId }) {
    reported
    id
    contents
    comments {
      contents
      user {
        name
      }
    }
    user {
      name
      photo
      id
    }
    created_at
    metoo {
      id
    }
  }
}

`

const GET_USER_METOOED_QUESTION = gql`
query getUserSavedQUestions($userId: ID!) {
  user(id: $userId) {
    metooed {
      reported
      contents
      comments {
        contents
        user {
          name
          id
        }
        id
      }
      user {
        name
        photo
        id
      }
      created_at
      metoo {
        id
      }
      id
    }
    id
  }
}

`

const QuestionListView = ({
  navigation: {
    state: {
      params: {userId, title},
    },
    navigate
  },
}) => {
  const {loading, error, data, refetch} = useQuery(title.includes('작성') ? GET_QUESTION_BY_USER : GET_USER_METOOED_QUESTION, {
    variables: {userId}
  })
  if (loading) return <></>
  if(error) console.log(error)
  if (!(data.questions || data.user)) return
  return <View style={{
    marginTop: 10,
    paddingLeft: 9,
    paddingRight: 9,
  }}>{[
    ...(title.includes('작성') ? data.questions : data.user.metooed).map(x => ({
      ...x,
      date: new Date(x.created_at),
      metoo: x.metoo.map(e => Number(e.id)),
      questionId: x.id
    })),
  ]
    .reverse()
    .map(x => (
      <QuestionCard
        navigate={navigate}
        {...x}
        key={`${x.date.toISOString()}시 ${x.user?.name}의 ${x.contents}`}
        userId={userId}
        query={GET_QUESTION_BY_USER}
        briefly={title.includes('작성')}

      />
    ))}</View>
}
export default QuestionListView
QuestionListView.navigationOptions = ({navigation}) => {
  return {
    title: navigation.state.params.title
  }
}