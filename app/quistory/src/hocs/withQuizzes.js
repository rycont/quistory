import React from 'react'
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from 'react-apollo'

const GET_QUIZZES_AND_USER_SAVEDQUIZ = gql`
  query getQuizBySubunit($subunitId: ID!, $userId: ID!) {
    quizsubunit(id: $subunitId) {
      solved
      average
      id
      quizzes {
        contents
        comment
        selections
        examiner
        type
        answer
        otherAnswers
        selections
        id
      }
    }
    user(id: $userId) {
      id
      savedQuizs {
        id
      }
    }
  }
`

export default Component => {
  return ({navigation}) => {
    const subunitId = navigation.state.params.nowStudying
    const {refetchQueries} = navigation.state.params
    const {data, loading, error} = useQuery(GET_QUIZZES_AND_USER_SAVEDQUIZ, {
      variables: {
        subunitId,
        userId: navigation.state.params.userId
      },
    })
    if (loading) return <></>
    if(error) console.log(error)
    const usableQuizData = data.quizsubunit.quizzes.map(e => ({
      ...e,
      answer: e.type === 'multipleChoice' ? Number(e.answer) - 1 : e.answer,
      otherAnswers: e.otherAnswers || [],
      selections: e.selections || [],
    }))
    return (
      <Component
        query={GET_QUIZZES_AND_USER_SAVEDQUIZ}
        refetchQueries={refetchQueries}
        navigation={navigation}
        subunitId={subunitId}
        average={data.quizsubunit.average}
        solved={data.quizsubunit.solved}
        quizs={usableQuizData.filter(e => e.type !== 'shortAnswer')}
        savedQuizs={data.user.savedQuizs}
        userId={navigation.state.params.userId}
      />
    )
  }
}
