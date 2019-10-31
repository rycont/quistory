import {Dimensions, StatusBar, Modal, Text, Alert} from 'react-native'
import React, {useState, useRef, memo} from 'react'
import Carousel from 'react-native-snap-carousel'
import styled from 'styled-components/native'
import {FlashCard} from '../components/quizCard'
import QuizResultReport from './quizResultReport'
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from 'react-apollo'

const Background = styled.View`
  background-color: #566e80;
  flex: 1;
`

const UPDATE_USER_SAVEDQUIZ = gql`
  mutation updateUserSavedquiz($userId: ID!, $savedQuizs: [ID]!) {
    updateUser(input: {where: {id: $userId}, data: {savedQuizs: $savedQuizs}}) {
      user {
        savedQuizs {
          contents
        }
      }
    }
  }
`

export default ({
  solved,
  subunitId,
  query,
  quizs,
  navigation,
  userId,
  average,
  savedQuizs,
  refetchQueries
}) => {
  const [isFinished, setIsFinished] = useState(false)
  const [result, setResult] = useState(null)
  const carousel = useRef()
  const [updateUserSavedquiz] = useMutation(UPDATE_USER_SAVEDQUIZ)
  const deviceWidth = Dimensions.get('window').width
  const deviceHeight = Dimensions.get('window').height
  const answers = [...quizs]
  const savedQuizsId = savedQuizs.map(e => e.id)
  const submitAnswer = (isRight, index, userEntered) => {
    answers[index].isRight = isRight
    answers[index].userEntered = userEntered
  }
  const reportClose = () => {
    navigation.goBack()
  }
  const onPressNext = isLast => {
    setTimeout(() => carousel.current.snapToNext(), 250)
    if (!isLast) return
    const unsolved = answers
      .map((e, i) => typeof e.isRight !== 'boolean' && i + 1)
      .filter(e => e !== false)
    if (unsolved.length != 0) {
      Alert.alert(
        undefined,
        `${unsolved.join(
          ', ',
        )}번 문제를 풀지 않았습니다. 끝내시겠습니까? 풀지 않은 문제는 오답처리됩니다.`,
        [
          {
            text: '더 생각해보기',
            onPress: () => {
              carousel.snapToItem(unsolved[0] - 1)
            },
          },
          {
            text: '끝내기',
            onPress: () => {
              setResult(answers)
              setIsFinished(true)
            },
          },
        ],
      )
    } else {
      Alert.alert(undefined, `문제 풀이를 끝내시겠습니까?`, [
        {
          text: '끝내기',
          onPress: () => {
            setResult(answers)
            setIsFinished(true)
          },
        },
      ])
    }
  }

  const onPressSaveQuiz = id => {
    const mutatedSavedQuiz = savedQuizsId.includes(id) ? savedQuizsId.filter(e => e !== id) : [...savedQuizsId, id]
    updateUserSavedquiz({
      variables: {
        userId,
        savedQuizs: mutatedSavedQuiz.map(e => Number(e))
      },
      refetchQueries: [{
        query,
        variables: {
          userId,
          subunitId
        }
      }]
    })
  }
  return (
    <>
      <StatusBar translucent />
      <Modal visible={isFinished} onRequestClose={reportClose}>
        <QuizResultReport
          result={result}
          average={average}
          solved={solved}
          subunitId={subunitId}
          onPressClose={reportClose}
          query={query}
          userId={userId}
          refetchQueries={refetchQueries}
        />
      </Modal>
      <Background>
        <Carousel
          data={quizs}
          renderItem={({item, index}) => (
            <FlashCard
              item={item}
              index={index}
              length={quizs.length}
              onPressNext={onPressNext}
              onSubmitAnswer={submitAnswer}
              isSaved={savedQuizsId.includes(item.id)}
              onPressSave={() => onPressSaveQuiz(item.id)}
            />
          )}
          itemWidth={deviceWidth - 36}
          itemHeight={deviceHeight}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={0.3}
          sliderWidth={deviceWidth}
          sliderHeight={deviceHeight}
          ref={carousel}
        />
      </Background>
    </>
  )
}