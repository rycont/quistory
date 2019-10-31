import React, {useState, useEffect, useRef} from 'react'
import {
  Image,
  View,
  TouchableNativeFeedback,
  Text,
  SectionList,
} from 'react-native'
import styled from 'styled-components/native'
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from 'react-apollo'

const Profile = styled.View`
  height: 90px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: row;
  padding-top: 20;
  padding-left: 20;
  width: 100%;
`

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 60px;
`
const Name = styled.Text`
color: black;
font-size: 18px;
padding-top: 10px;
margin-left: 10px;
font-weight: bold;
`

const SectionHeader = styled.Text`
  font-weight: bold;
  font-size: 15px;
  opacity: 0.7;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 10px;
`

const ListItem = styled.View`
  background: #ffffff;
  padding: 12px 20px 12px 20px;
  flex-direction: row;
  margin-top: 2px;
`

const ListText = styled.Text`
  font-size: 15px;
`

const Counter = styled.Text`
  font-weight: bold;
  font-size: 15px;
  opacity: 0.5;
  flex: 1;
  text-align: right;
`

const GET_USER_INFO = gql`
query getUserInfo($userId: ID!) {
  user(id: $userId) {
    questions {
      id
    }
    comments(where: { question_null: false }) {
      id
      contents
    }
    metooed {
      id
    }
    savedQuizs {
      id
    }
    name
    photo
    id
  }
}

`

export default ({navigation: {navigate}, userData = {}}) => {
  const {data, loading, error} = useQuery(GET_USER_INFO, {
    variables: {
      userId: userData.data.user.id
    } 
  })
  if(loading) return <></>
  console.log('유저 데이터: ', data)
  const SECTION_DATA = [
    {
      title: '문제 풀이',
      data: [
        {
          text: '중요 표시 한 문제',
          count: data.user.savedQuizs?.length,
          action: 'UserSaved',
        },
      ],
    },
    {
      title: '질문',
      data: [
        {
          text: '작성한 질문',
          count: data.user.questions?.length,
          action: 'UserQuestions',
        },
        {
          text: '작성한 댓글',
          count: data.user.comments?.length,
          action: 'UserComments',
        },
        {
          text: '궁금해요 표시 한 질문',
          count: data.user.metooed?.length,
          action: 'UserMetooed',
        },
      ],
    },
  ]

  return (
    <>
      <Profile>
        <ProfileImage
          source={{
            uri: data.user.photo,
          }}
        />
        <Name>
          {data.user.name}님
        </Name>
      </Profile>
      <View style={{backgroundColor: '#F2F2F2'}}>
        <SectionList
          sections={SECTION_DATA}
          keyExtractor={e => e.text}
          renderItem={({item: {text, count, action}, index, section}) => (
            <TouchableNativeFeedback onPress={() => {
              const nav = ({
                UserSaved: 'QuizListView',
                UserQuestions: 'QuestionListView',
                UserComments: 'CommentListView',
                UserMetooed: 'QuestionListView',
              })[action]
              navigate({
                routeName: nav,
                params: {
                  title: text,
                  userId: Number(data.user.id),
                  userData
                }
              })
            }}>
              <ListItem
                style={{
                  ...(index === 0 && {
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }),
                  ...(section.data.length - 1 === index && {
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  }),
                }}>
                <ListText>{text}</ListText>
                <Counter>{count || 0}개 ></Counter>
              </ListItem>
            </TouchableNativeFeedback>
          )}
          renderSectionHeader={({section: {title}}) => (
            <SectionHeader>{title}</SectionHeader>
          )}
        />
      </View>
    </>
  )
}
