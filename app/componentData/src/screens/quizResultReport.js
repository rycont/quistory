import React from 'react'
import {TouchableNativeFeedback} from 'react-native'
import styled from 'styled-components/native'
import {QuizListItem, Card, CardTitle} from '../components/quizListItem'

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
  height: 2px;
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



export default ({result, onPressClose}) => {
  // const correctRate = (1 - result.map(quiz => Boolean(quiz?.isRight)).sort().indexOf(true)/result.length) * 100
  const wrongQuentity = result
    .map(e => Boolean(e.isRight))
    .sort()
    .indexOf(true)
  return (
    <Background>
      <Title>세션 결과</Title>
      <OrangeBar />
      <Card>
        <CardTitle>정답률</CardTitle>
        <Percentage>
          {Math.floor((1 - wrongQuentity / result.length) * 100)}%
        </Percentage>
        <PercentageInfo>{`맞춘 문제수: ${result.length - wrongQuentity}/${
          result.length
        }
  전체 평균보다 20%p 높습니다`}</PercentageInfo>
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
              <QuizListItem item={item} isLast={i === wholeWrongs.length - 1} />
            ))}
        </Card>
      )}
      <TouchableNativeFeedback onPress={onPressClose}>
        <Next>끝내기</Next>
      </TouchableNativeFeedback>
    </Background>
  )
}
