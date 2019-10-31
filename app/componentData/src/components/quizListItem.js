import styled from 'styled-components/native'
import React from 'react'

export const Card = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  padding-bottom: 18px;
`
export const CardTitle = styled.Text`
  color: black;
  opacity: 0.7;
  font-weight: 700;
  margin-bottom: 12px;
`

const WrongProblem = styled.View`
  flex-direction: row;
`
const WrongProblemTitle = styled.Text`
  font-size: 16px;
  opacity: 0.8;
`
const WrongSelectionsContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`
const Comment = styled.Text`
  font-size: 14px;
  color: black;
  margin-top: 12px;
`
const Selection = styled.Text`
  opacity: 0.6;
  font-size: 14px;
  border-right-color: rgba(0, 0, 0, 0.2);
  border-right-width: 1px;
  flex: 1;
  text-align: center;
`
const ProblemNumber = styled.Text`
  padding-right: 6px;
  font-size: 16px;
  opacity: 0.8;
`
const Contents = styled.View`
  flex: 1;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 2px;
  margin-bottom: 12px;
  padding-bottom: 12px;
`
const ImInput = styled.Text`
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  color: #00c850;
  font-size: 14px;
  padding: 3px 10px 3px 10px;
`
const UserInput = styled.Text`
  color: #ff0202;
  font-size: 14px;
  margin-left: 12px;
  margin-top: 3px;
`
const CorrectToo = styled.View`
  flex-direction: row;
  padding-left: 12px;
  padding-top: 6px;
`
const CorrectReconnition = styled.Text`
  font-size: 12px;
  opacity: 0.5;
`
const CorrectTooAnswers = styled.Text`
  opacity: 0.7;
  font-size: 12px;
  line-height: 16px;
  padding-left: 12px;
`
const OXSelection = styled(Selection)`
  font-size: 30px;
`
export const QuizListItem = ({item, isLast}) => (
  <WrongProblem key={item.index}>
    {typeof item.index === 'number' ? <ProblemNumber>{item.index + 1}.</ProblemNumber> : undefined}
    <Contents
      style={{
        ...(isLast
          ? {
              borderBottomWidth: 0,
              marginBottom: 0,
              paddingBottom: 0,
            }
          : null),
      }}>
      <WrongProblemTitle>{item.contents}</WrongProblemTitle>

      {{
        shortAnswer: quiz => (
          <>
            <WrongSelectionsContainer>
              <ImInput>{quiz.answer}</ImInput>
              <UserInput>{quiz.userEntered}</UserInput>
            </WrongSelectionsContainer>
            <CorrectToo>
              <CorrectReconnition>정답 인정</CorrectReconnition>
              <CorrectTooAnswers>
                {quiz.otherAnswer.join('\n')}
              </CorrectTooAnswers>
            </CorrectToo>
          </>
        ),
        'multipleChoice': quiz => (
          <>
            <WrongSelectionsContainer>
              {quiz.selection.map((e, i) => (
                <Selection
                  style={{
                    ...(e === quiz.userEntered
                      ? {
                          color: '#FF0202',
                        }
                      : null),
                    ...(i === quiz.answer
                      ? {
                          color: '#00C850',
                        }
                      : null),
                    ...(i === 3
                      ? {
                          borderRightWidth: 0,
                        }
                      : null),
                  }}>
                  {e}
                </Selection>
              ))}
            </WrongSelectionsContainer>
          </>
        ),
        OX: quiz => (
          <WrongSelectionsContainer>
            <OXSelection
              style={{
                ...(quiz.answer
                  ? {
                      color: '#00C850',
                    }
                  : null),
              }}>
              O
            </OXSelection>
            <OXSelection
              style={{
                ...(!quiz.answer
                  ? {
                      color: '#00C850',
                    }
                  : null),
                borderRightWidth: 0,
              }}>
              X
            </OXSelection>
          </WrongSelectionsContainer>
        ),
      }[item.type](item)}
      <Comment>{item.comment}</Comment>
    </Contents>
  </WrongProblem>
)