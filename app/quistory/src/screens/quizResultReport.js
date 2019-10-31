import React, {useEffect} from 'react'
import {TouchableNativeFeedback} from 'react-native'
import styled from 'styled-components/native'
import {QuizListItem, Card, CardTitle} from '../components/quizListItem'
import {gql} from 'apollo-boost'
import {useMutation} from 'react-apollo'

const Background = styled.ScrollView`
  background-color: #1e3546;
  padding: 18px;
`
const Title = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 700;
`
const OrangeBar = styled.View`
  background-color: #fec864;
  height: 3px;
  width: 75px;
  margin-top: 7.5px;
  margin-bottom: 12px;
`
const Percentage = styled.Text`
  color: #ec9900;
  font-weight: 700;
  font-size: 30px;
  text-align: center;
`
const PercentageInfo = styled.Text`
  font-weight: 700;
  font-size: 14px;
  opacity: 0.5;
  text-align: center;
  padding-top: 3px;
`
const Next = styled.Text`
  background-color: #fec864;
  color: black;
  font-size: 16px;
  font-weight: 700;
  padding: 12px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 38px;
`

const UPDATE_QUIZSUBUNIT_SOLVED = gql`
  mutation updateQuizSubunitSolved(
    $subunitId: ID!
    $solved: Int!
    $average: Float!
    $userId: ID!
    $willStudy: Int!
  ) {
    updateQuizsubunit(
      input: {
        where: {id: $subunitId}
        data: {solved: $solved, average: $average}
      }
    ) {
      quizsubunit {
        solved
        average
      }
    }
    updateUser(input: {where: {id: $userId}, data: {nowStudying: $willStudy}}) {
      user {
        nowStudying
      }
    }
  }
`

export default ({
  result,
  onPressClose,
  average,
  solved,
  subunitId,
  query,
  userId,
  refetchQueries
}) => {
  const wrongQuentity = (wrongs => (wrongs === -1 ? result.length : wrongs))(
    result
      .map(e => Boolean(e.isRight))
      .sort()
      .indexOf(true),
  )
  const [updateQuizSubunitSolved] = useMutation(UPDATE_QUIZSUBUNIT_SOLVED)
  const myAverage = (1 - wrongQuentity / result.length) * 100

  useEffect(() => {
    updateQuizSubunitSolved({
      variables: {
        subunitId,
        solved: solved + 1,
        average: (average * solved + myAverage) / (solved + 1),
        userId,
        willStudy: subunitId + 1,
      },
      refetchQueries: [
        {
          query,
          variables: {
            subunitId,
            userId,
          },
        },
        ...refetchQueries
      ],
    })
  }, [])

  return (
    <Background>
      <Title>풀이 결과</Title>
      <OrangeBar />
      <Card>
        <CardTitle>정답률</CardTitle>
        <Percentage>{Math.floor(myAverage)}%</Percentage>
        <PercentageInfo>{`맞춘 문제수: ${result.length - wrongQuentity}/${
          result.length
        }
  전체 평균 ${Math.floor(average)}% 보다 ${Math.floor(Math.abs(average - myAverage))}%p ${
          average < myAverage ? '높' : '낮'
        }습니다`}</PercentageInfo>
      </Card>
      {wrongQuentity === 0 || (
        <Card
          style={{
            borderBottomWidth: 0,
          }}>
          <CardTitle>틀린 문제</CardTitle>
          {result
            .map((item, index) => item.isRight || {...item, index})
            .filter(item => item !== true)
            .map((item, i, wholeWrongs) => (
              <QuizListItem key={item.index} item={item} isLast={i === wholeWrongs.length - 1} />
            ))}
        </Card>
      )}
      <TouchableNativeFeedback onPress={onPressClose}>
        <Next>끝내기</Next>
      </TouchableNativeFeedback>
    </Background>
  )
}
