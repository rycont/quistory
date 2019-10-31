import { Dimensions, StatusBar, Modal, Text, Alert } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import styled from 'styled-components/native'
import { FlashCard } from '../components/quizCard'
import QuizResultReport from './quizResultReport'

// this.carousel.snapToNext()

export default class extends React.Component {
  deviceWidth = Dimensions.get('window').width
  deviceHeight = Dimensions.get('window').height
  questionsQuentity = this.props.questions.length
  answers = [
    ...this.props.questions
  ]
  state = {
    isFinished: false,
    result: null
  }
  submitAnswer = (isRight, index, userEntered) => {
    this.answers[index].isRight = isRight
    this.answers[index].userEntered = userEntered
  }
  onPressNext = isLast => {
    setTimeout(() => this.carousel.snapToNext(), 250)
    if (!isLast) return
    const unsolved = this.answers
      .map((e, i) => typeof e.isRight !== 'boolean' && i + 1)
      .filter(e => e !== false)
    if (unsolved.length != 0) {
      Alert.alert(
        undefined,
        `${unsolved.join(', ')}번 문제를 풀지 않았습니다. 끝내시겠습니까? 풀지 않은 문제는 오답처리됩니다.`,
        [
          {
            text: '더 생각해보기',
            onPress: () => {
              this.carousel.snapToItem(unsolved[0] - 1)
            }
          },
          {
            text: '끝내기',
            onPress: () => {
              this.setState({
                isFinished: true,
                result: this.answers
              })
            }
          }
        ]
      )
    } else {
      Alert.alert(undefined, `문제 풀이를 끝내시겠습니까?`, [
        {
          text: '끝내기',
          onPress: () => {
            this.setState({
              isFinished: true,
              result: this.answers
            })
          }
        }
      ])
    }
  }
  reportClose = () => {
    this.props.navigation.goBack()
  }
  render() {
    const Background = styled.View`
      background-color: #566e80;
      flex: 1;
    `
    return (
      <>
        <StatusBar translucent />
        <Modal
          visible={this.state.isFinished}
          onRequestClose={this.reportClose}
        >
          <QuizResultReport result={this.state.result} onPressClose={this.reportClose} />
        </Modal>
        <Background>
          <Carousel
            data={this.props.questions}
            renderItem={({ item, index }) => (
              <FlashCard
                item={item}
                index={index}
                length={this.questionsQuentity}
                onPressNext={this.onPressNext}
                onSubmitAnswer={this.submitAnswer}
              />
            )}
            itemWidth={this.deviceWidth - 36}
            itemHeight={this.deviceHeight}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={0.3}
            sliderWidth={this.deviceWidth}
            sliderHeight={this.deviceHeight}
            ref={c => (this.carousel = c)}
          />
        </Background>
      </>
    )
  }
}
