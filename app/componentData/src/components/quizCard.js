import React, {memo, useState} from 'react'
import styled from 'styled-components/native'
import {
  View,
  Dimensions,
  Animated,
  TouchableNativeFeedback,
  Text,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import {AnswerButton} from './answerButton'
export const FlashCard = memo(
  ({item, index, length, onPressNext, onSubmitAnswer}) => {
    const isLast = index + 1 === length
    const [questionState, setState] = useState(null)
    // const [userEntered, setUserEntered] = useState(String())
    const onClickAnswer = (result, userEntered) => {
      setState(result)
      onSubmitAnswer(result, index, userEntered)
    }
    const Container = styled.View`
      align-items: center;
      justify-content: center;
      flex: 1;
    `
    const QuestionCard = styled(Animated.View)`
      background-color: ${questionState !== false ? 'white' : '#FFE6E6'};
      border-radius: 18px;
      ${questionState === null
        ? ''
        : `
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;`}
      padding: 25px;
      padding-top: 15px;
      width: ${Dimensions.get('window').width - 36};
    `
    const IndexIndicator = styled.Text`
      font-size: 36px;
      color: #6e6e6e;
      text-align-vertical: bottom;
    `
    const QuestionsQuentity = styled.Text`
      font-size: 21px;
      color: #b2b2b2;
      text-align-vertical: bottom;
      margin-left: 10px;
      margin-bottom: 4px;
    `
    const IndexContainer = styled.View`
      flex-direction: row;
    `
    const DividerLine = styled.View`
      width: 40px;
      height: 5px;
      background-color: #76a8c7;
      margin-left: 3px;
    `
    const Examiner = styled(Animated.Text)`
        color: ${questionState === null ? '#848484' : 'black'};
        ${questionState === null ? '' : 'font-size: 27px;'}
        margin-top: ${questionState === null ? 5 : 10}px;
        margin-bottom: 5px;
    `
    const QuestionType = styled.Text`
      font-size: 15px;
      margin-bottom: 10px;
      color: #a1acb8;
    `
    const Content = styled.Text`
        font-size: ${questionState === null ? '20px' : '17px'};
        ${questionState === null ? 'color: #2E506F;' : ''}
        text-align: ${questionState === null ? 'center' : 'left'};
        line-height: 30px;
    `
    const Comment = styled(Content)`
      font-size: 15px;
    `
    const AnswerInput = styled.TextInput`
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      margin-top: 15px;
      padding-left: 15px;
      padding-right: 15px;
    `
    const SelectionsBox = styled.View`
      border: 1px solid rgba(0, 0, 0, 0.1);
      /* padding: 15px; */
      border-radius: 12px;
      margin-top: 15px;
    `
    const SelectionsRow = styled.View`
      flex-direction: row;
    `

    const NextButton = styled.Text`
      background-color: ${isLast ? '#30264F' : '#334854'};
      width: ${Dimensions.get('window').width - 36};
      padding: 20px;
      border-bottom-left-radius: 18px;
      border-bottom-right-radius: 18px;
      color: white;
      text-align: center;
    `
    const checkAnswer = label => {
      onClickAnswer(
        (item.type === 'OX'
          ? label === 'O'
            ? true
            : false
          : item.selection.indexOf(label)) == item.answer,
        label,
      )
    }
    const [AnimatePercentage, setAnimatePercentage] = useState(
      new Animated.Value(0),
    )
    return (
      <>
        <Container enabled behavior="height">
          <QuestionCard
            style={{
              opacity: AnimatePercentage.interpolate({
                inputRange: [0, 0.01, 100],
                outputRange: [1, 0, 1],
              }),
            }}>
            <IndexContainer>
              <IndexIndicator>{index + 1}</IndexIndicator>
              <QuestionsQuentity>{length}</QuestionsQuentity>
              <View style={{flexDirection: 'row-reverse', flex: 1, marginTop: 10}}>
                <TouchableNativeFeedback>
                  <Icon
                    name="bookmark-border"
                    size={30}
                    style={{opacity: 0.7}}
                  />
                </TouchableNativeFeedback>
              </View>
            </IndexContainer>
            <DividerLine />
            <Examiner>
              {questionState === null
                ? `출제자: ${item.examiner}`
                : questionState
                ? '맞았습니다!'
                : '틀렸습니다.'}
            </Examiner>
            {questionState === null ? (
              <QuestionType>({{
                shortAnswer: '주관식',
                multipleChoice: '객관식',
                OX: 'OX'
              }[item.type]})</QuestionType>
            ) : (
              undefined
            )}
            <Content>
              {questionState === null
                ? item.content
                : `답: ${
                    item.type === 'multipleChoice'
                      ? item.selection[item.answer]
                      : item.type === 'OX'
                      ? item.answer
                        ? 'O'
                        : 'X'
                      : item.answer
                  }\n`}
            </Content>
            {questionState !== null ? (
              <Content>{item.comment}</Content>
            ) : (
              undefined
            )}
            {questionState === null ? (
              item.type === 'shortAnswer' ? (
                <AnswerInput
                  placeholder="눌러서 입력"
                  onSubmitEditing={e => {
                    const {text} = e.nativeEvent
                    onClickAnswer(text === item.answer, text)
                    Animated.timing(AnimatePercentage, {
                      toValue: 100,
                      duration: 200,
                      useNativeDriver: true,
                    }).start()
                  }}
                />
              ) : item.type === 'multipleChoice' ? (
                <SelectionsBox>
                  <SelectionsRow>
                    <AnswerButton
                      action={checkAnswer}
                      label={item?.selections[0]}
                      rightBorder
                    />
                    <AnswerButton
                      action={checkAnswer}
                      label={item?.selections[1]}
                    />
                  </SelectionsRow>
                  <SelectionsRow
                    style={{
                      borderTopColor: 'rgba(0, 0, 0, 0.1)',
                      borderTopWidth: 1,
                    }}>
                    <AnswerButton
                      action={checkAnswer}
                      label={item?.selections[2]}
                      rightBorder
                    />
                    <AnswerButton
                      action={checkAnswer}
                      label={item?.selections[3]}
                    />
                  </SelectionsRow>
                </SelectionsBox>
              ) : item.type === 'OX' ? (
                <SelectionsBox>
                  <SelectionsRow
                    style={{
                      height: 100,
                    }}>
                    <AnswerButton
                      action={checkAnswer}
                      textSize={30}
                      label="O"
                      rightBorder
                    />
                    <AnswerButton
                      action={checkAnswer}
                      textSize={30}
                      label="X"
                    />
                  </SelectionsRow>
                </SelectionsBox>
              ) : (
                undefined
              )
            ) : (
              undefined
            )}
          </QuestionCard>
          {questionState === null ? (
            undefined
          ) : (
            <TouchableNativeFeedback
              onPress={() => {
                onPressNext(isLast)
              }}>
              <NextButton>{isLast ? '끝내기' : '다음 문제'}</NextButton>
            </TouchableNativeFeedback>
          )}
        </Container>
      </>
    )
  },
)
