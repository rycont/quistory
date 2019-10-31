import React, {useState, useRef, useEffect} from 'react'
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Alert,
} from 'react-native'
import styled from 'styled-components/native'
import {Header} from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {CommentsList, NoComments} from '../components/commentsList'
import {PostBrief} from '../components/postBrief'
import Markdown from '@stream-io/react-native-simple-markdown'
import {Keyboard} from 'react-native'
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from 'react-apollo'
import {makeTopToast} from '../utils/makeToast'
import Share from 'react-native-share'

const Background = styled.KeyboardAvoidingView`
background-color: #f7f7f7;
/* min-height: ${Dimensions.get('window').height - Header.HEIGHT}px; */
padding-bottom: 60px;
`
const Photo = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  margin-right: 5px;
`
const Post = styled.View`
  background-color: white;
  padding: 12px;
`
const PostInfo = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`
const Author = styled.Text`
  color: black;
  font-weight: bold;
  margin-left: 3px;
`
const Content = styled.View`
  padding-left: 52px;
`
const PostText = styled(Markdown)`
  color: #202020;
  font-size: 15;
  line-height: 25;
`
const AddReplayContainer = styled.View`
  height: 60px;
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 100%;
  padding: 10px;
  border-top-color: rgba(0, 0, 0, 0.1);
  border-top-width: 1.3px;
  display: flex;
  flex-direction: row;
`
const ReplyInput = styled.TextInput`
  background-color: #f3f3f3;
  border-radius: 60px;
  padding-left: 20px;
  flex: 1;
`

const GET_QUESTION = gql`
  query getQuestion($id: ID!) {
    question(id: $id) {
      contents
      user {
        photo
        name
      }
      metoo {
        id
      }
      comments(sort: "created_at:asc") {
        contents
        user {
          name
          id
        }
        id
        created_at
      }
    }
  }
`

const ADD_COMMENT = gql`
  mutation addComment($contents: String!, $question: ID!, $user: ID!) {
    createComment(
      input: {data: {contents: $contents, question: $question, user: $user}}
    ) {
      comment {
        contents
        question {
          contents
        }
        id
      }
    }
  }
`

const UPDATE_METOO = gql`
  mutation updateMetoo($question: ID!, $metoo: [ID]!) {
    updateQuestion(input: {data: {metoo: $metoo}, where: {id: $question}}) {
      question {
        metoo {
          id
        }
      }
    }
  }
`

const GET_QUESTION_CURTLY = gql`
  query getQuestionCurtly($questionId: ID!) {
    question(id: $questionId) {
      reported
      contents
    }
  }
`

const UPDATE_QUESTION_REPORTED = gql`
  mutation updateQuestionReported($questionId: ID!, $reported: Int) {
    updateQuestion(
      input: {data: {reported: $reported}, where: {id: $questionId}}
    ) {
      question {
        reported
      }
    }
  }
`

const DELETE_QUESTION = gql`
  mutation deleteQuestion($questionId: ID!) {
    deleteQuestion(input: {
      where: {
        id: $questionId
      }
    }) {
      question {
        contents
      }
    }
  }
`

function FullscreenCard({
  navigation: {
    state: {
      params: {questionId, offline, userId, query, date},
    },
  },
}) {
  const SubmitReply = styled.Text`
    background-color: #344955;
    color: #fec864;
    text-align: center;
    text-align-vertical: center;
    border-radius: 40px;
    elevation: 1;
    width: 40px;
    margin-left: 7px;
    ${offline &&
      `
        opacity: 0.2;
      `}
  `
  const [replyText, setReplyText] = useState('')
  const {data, loading, refetch} = useQuery(GET_QUESTION, {
    variables: {id: questionId},
    pollInterval: 1000
  })
  const [addComment] = useMutation(ADD_COMMENT)
  const [updateMetoo] = useMutation(UPDATE_METOO)

  const replyInputBox = useRef()

  if (loading) return <Background />
  const {user, contents, comments, metoo} = data.question
  const numericMetoo = metoo.map(e => Number(e.id))

  return (
    <>
      <Background>
        <ScrollView>
          <Post>
            <PostInfo>
              <Photo
                source={{
                  uri: user?.photo,
                }}
              />
              <View>
                <Author>{user?.name || '탈퇴한 사용자'}</Author>
                <Text>{date}</Text>
              </View>
            </PostInfo>
            <Content>
              <PostText>{contents.trim()}</PostText>
              <PostBrief
                ifMe={numericMetoo.includes(userId)}
                commentsAmount={comments?.length}
                metoo={numericMetoo.length}
                onClickMetoo={async () => {
                  numericMetoo.includes(userId)
                    ? await updateMetoo({
                        variables: {
                          question: questionId,
                          metoo: numericMetoo.filter(e => e !== userId),
                        },
                        refetchQueries: [
                          {
                            query: GET_QUESTION,
                            variables: {
                              id: questionId,
                            },
                          },
                          {
                            query,
                          },
                        ],
                      })
                    : await updateMetoo({
                        variables: {
                          question: questionId,
                          metoo: [...numericMetoo, userId],
                        },
                        refetchQueries: [
                          {
                            query: GET_QUESTION,
                            variables: {
                              id: questionId,
                            },
                          },
                          {
                            query,
                          },
                        ],
                      })
                }}
              />
            </Content>
          </Post>
          {comments ? <CommentsList comments={comments} /> : <NoComments />}
        </ScrollView>
      </Background>
      {!offline && (
        <AddReplayContainer>
          <ReplyInput
            placeholder={!offline ? '댓글을 입력해보세요!' : '오프라인입니다'}
            ref={replyInputBox}
            onSubmitEditing={() => {
              addComment({
                variables: {
                  contents: replyText,
                  question: questionId,
                  user: userId,
                },
                refetchQueries: [
                  {
                    query: GET_QUESTION,
                    variables: {
                      id: questionId,
                    },
                  },
                  {
                    query,
                    variables: {
                      userId
                    }
                  },
                ],
              })
              replyInputBox.current.clear()
            }}
            blurOnSubmit={true}
            onChangeText={t => setReplyText(t)}
            editable={!offline}
          />
          <TouchableNativeFeedback
            onPress={() => {
              addComment({
                variables: {
                  contents: replyText,
                  question: questionId,
                  user: userId,
                },
                refetchQueries: [
                  {
                    query: GET_QUESTION,
                    variables: {
                      id: questionId,
                    },
                  },
                  {
                    query,
                    variables: {
                      userId
                    }
                  },
                ],
              })
              replyInputBox.current.clear()
              Keyboard.dismiss()
              setReplyText('')
            }}
            hitSlop={{
              top: 10,
              left: 10,
              bottom: 10,
              right: 10,
            }}>
            <SubmitReply>
              <Icon name="add" size={30} />
            </SubmitReply>
          </TouchableNativeFeedback>
        </AddReplayContainer>
      )}
    </>
  )
}

function ReportAndShare({questionId, query, userId, user, goBack}) {
  const {data} = useQuery(GET_QUESTION_CURTLY, {
    variables: {
      questionId,
    },
  })
  const [updateQuestionReported] = useMutation(UPDATE_QUESTION_REPORTED)
  const [deleteQuestion] = useMutation(DELETE_QUESTION)
  const isMine = userId === Number(user?.id)
  return (
    <View style={{flexDirection: 'row'}}>
      {!isMine && <TouchableNativeFeedback
        onPress={() => {
          updateQuestionReported({
            variables: {
              questionId,
              reported: data.question.reported + 1,
            },
            refetchQueries: [
              {
                query: GET_QUESTION_CURTLY,
                variables: {
                  questionId,
                },
              },
              {
                query,
              },
            ],
          })
          makeTopToast('신고가 접수되었습니다.')
        }}>
        <Icon name="report" size={24} color="white" style={{marginRight: 15}} />
      </TouchableNativeFeedback>}
      {
        isMine && <TouchableNativeFeedback
        onPress={() => {
          deleteQuestion({
            variables: {
              questionId
            },
            refetchQueries: [{
              query
            }]
          })
          goBack()
          makeTopToast('글이 삭제되었습니다.')
        }}>
        <Icon name="delete" size={24} color="white" style={{marginRight: 15}} />
      </TouchableNativeFeedback>
      }
      <TouchableNativeFeedback
        onPress={() => {
          Share.open({
            title: '질문 공유하기:',
            message: data.question.contents,
            subject: 'Quistory에서 공유됨',
          })
        }}>
        <Icon name="share" size={24} color="white" style={{marginRight: 15}} />
      </TouchableNativeFeedback>
    </View>
  )
}

FullscreenCard.navigationOptions = ({navigation}) => ({
  headerRight: (
    <ReportAndShare {...navigation.state.params} goBack={navigation.goBack} />
  ),
})

export default FullscreenCard
