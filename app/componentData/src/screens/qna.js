import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import withTitleAndContent from '../components/basicScreen'
import {QuestionCard} from '../components/questioncard'
import {gql} from 'apollo-boost'
import {CardView} from '../components/cardView'
import AsyncStorage from '@react-native-community/async-storage'
import userInit from '../utils/userSet'
import {useQuery} from 'react-apollo'
import {useNetInfo} from '@react-native-community/netinfo'
import styled from 'styled-components/native'
import {NavigationEvents} from 'react-navigation'
import {useAsyncStorage} from '../utils/useAsyncstorage'

const GET_QUESTIONS = gql`
  query {
    questions {
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

const NotAvailableText = styled.Text`
  opacity: 0.7;
`

const QuestionsListWithLocalData = ({navigate}) => {
  const [data, setData] = useState({
    questions: [],
  })
  useEffect(() => {
    AsyncStorage.getItem('@questions').then(e => e && setData(JSON.parse(e)))
  }, [])
  if (data.questions.length === 0)
    return (
      <CardView>
        <NotAvailableText>
          저장된 데이터가 없습니다! 인터넷에 연결되면 자동으로 다운로드받습니다.
        </NotAvailableText>
      </CardView>
    )
  return [
    <CardView key="notavailablecontent">
      <NotAvailableText>
        오프라인으로 저장된 글을 보고계십니다. 댓글, 질문 작성, 궁금해요 표시를
        남길 수 없습니다.
      </NotAvailableText>
    </CardView>,
    ...[
      ...data.questions.map(x => ({
        ...x,
        date: new Date(x.created_at),
        numericMetoo: x.metoo.map(e => e.id),
      })),
    ]
      .reverse()
      .map(x => (
        <QuestionCard
          navigate={navigate}
          {...x}
          refetch={() => {}}
          offline
          key={`${x.date.toISOString()}시 ${x.user.name}의 ${x.contents}`}
        />
      )),
  ]
}

const QuestionsList = ({style, navigate, userData}) => {
  const {loading, error, data, refetch} = useQuery(GET_QUESTIONS)
  if (error) console.log(error)
  if (loading) return <></>
  if (!data.questions) return
  AsyncStorage.setItem('@questions', JSON.stringify(data))

  return [
    ...data.questions.map(x => ({
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
        key={`${x.date.toISOString()}시 ${x.user.name}의 ${x.contents}`}
        userData={userData}
        query={GET_QUESTIONS}
      />
    ))
}

export default ({navigation: {navigate}}) => {
  const [userData] = useAsyncStorage('@user')
  console.log(typeof userData)
  const QnaScreenWithData = withTitleAndContent('질문')(false)([
    {
      name: 'create',
      action: async () => {
        if (userData === null) {
          await userInit()
          return
        }
        navigate({
          routeName: 'NewQuestionEditor',
          params: {
            userData,
            query: GET_QUESTIONS
          },
        })
      },
    },
  ])({})(() => {
    const netInfo = useNetInfo()
    if (true) return <QuestionsList navigate={navigate} userData={userData} />
    return <QuestionsListWithLocalData navigate={navigate} />
  })
  return <QnaScreenWithData />
}
