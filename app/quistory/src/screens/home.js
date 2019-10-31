import React, {useEffect} from 'react'
import {
  View,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native'
import styled from 'styled-components/native'
import withTitleAndContent from '../components/basicScreen'
import {CardView} from '../components/cardView'
import initUser from '../utils/userSet'
import AsyncStorage from '@react-native-community/async-storage'
import {useAsyncStorage} from '../utils/useAsyncstorage'
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from 'react-apollo'
import { NavigationEvents } from 'react-navigation'

const Container = styled(CardView)`
  width: ${Dimensions.get('window').width - 32}px;
  height: 85px;
  flex-direction: row;
`
const HorizontalAlign = styled.View`
  flex-direction: row;
`
const Photo = styled.Image`
  width: 45px;
  height: 45px;
  flex-basis: 45px;
  border-radius: 30px;
`
const TextsContainer = styled.View`
  padding-left: 10px;
`
const Name = styled.Text`
  color: black;
  font-size: 12;
  opacity: 0.7;
`
const NowStudying = styled.Text`
  color: black;
  font-size: 17;
`

const CurrentUnit = styled.ImageBackground`
  height: ${Dimensions.get('window').width - 32};
  padding: 18px;
`
const CurrentText = styled.Text`
  color: white;
`
const CurrentStep = styled(CurrentText)`
  font-size: 25px;
  font-weight: bold;
`
const StartButton = styled.View`
  border: 1px solid white;
  width: 62px;
  padding: 5px;
  border-radius: 10px;
  margin-top: 5px;
  margin-left: 5px;
`
const Compete = styled.Text`
  font-size: 21px;
  margin-top: 23px;
  color: black;
  margin-bottom: 3px;
`

const SubunitName = styled.Text`
  color: white;
  font-size: 16px;
`

const GET_USER_NOWSTUDYING = gql`
  query getNowstudying($userId: ID!) {
    user(id: $userId) {
      nowStudying
      id
    }
  }
`

const GET_SUBUNIT_INFO = gql`
  query getSubunitInfo($subunitId: ID!) {
    quizsubunit(id: $subunitId) {
      subunit
      quizlargeunit {
        largeunit
        id
      }
      image
      id
    }
  }
`

const GET_SUBUNITS_COLOR_NAME = gql`
  query {
    quizsubunits {
      bgcolor
      subunit
      id
    }
  }
`

const CurrentSubunit = ({nowStudying, navigate, userId}) => {
  const {data, loading, refetch, error} = useQuery(GET_SUBUNIT_INFO, {
    variables: {
      subunitId: nowStudying,
    },
    pollInterval: 500,
  })

  if (loading)
    return (
      <CardView
        style={{
          color: '#000',
          width: Dimensions.get('window').width - 32,
          height: Dimensions.get('window').width - 32,
        }}>
        <View
          style={{
            color: '#000',
            width: Dimensions.get('window').width - 32,
            height: Dimensions.get('window').width - 32,
          }}></View>
      </CardView>
    )
  if(error) console.log(error)
  console.log('현재 로컬 진도: ' ,nowStudying, data.quizsubunit.subunit)
  return (
    <CardView
      styleMix={{
        color: '#000',
        width: Dimensions.get('window').width - 32,
        height: Dimensions.get('window').width - 32,
      }}
      innerPadding={false}>
      <TouchableNativeFeedback
        onPress={() => {
          navigate({
            routeName: 'Quiz',
            params: {
              nowStudying,
              userId,
              refetchQueries: [{
                query: GET_USER_NOWSTUDYING,
                variables: {
                  userId
                }
              }, {
                query: GET_SUBUNIT_INFO,
                variables: {
                  subunitId: nowStudying + 1
                }
              }],
            },
          })
        }}>
        <View>
          <CurrentUnit
            source={{
              uri: data.quizsubunit.image,
            }}
            imageStyle={{
              borderRadius: 12,
            }}>
            <CurrentText>
              {data.quizsubunit.quizlargeunit.largeunit}
            </CurrentText>
            <CurrentStep>{data.quizsubunit.subunit}</CurrentStep>
            <StartButton>
              <CurrentText>시작하기</CurrentText>
            </StartButton>
          </CurrentUnit>
        </View>
      </TouchableNativeFeedback>
    </CardView>
  )
}

const withNowStudying = Component => ({userId, navigate}) => {
  const {data, loading} = useQuery(GET_USER_NOWSTUDYING, {
    variables: {
      userId,
    },
  })
  if (loading)
    return (
      <CardView
        style={{
          color: '#000',
          width: Dimensions.get('window').width - 32,
          height: Dimensions.get('window').width - 32,
        }}>
        <View
          style={{
            color: '#000',
            width: Dimensions.get('window').width - 32,
            height: Dimensions.get('window').width - 32,
          }}></View>
      </CardView>
    )
  return (
    <Component {...{userId, navigate}} nowStudying={data.user.nowStudying} />
  )
}

export default ({navigation: {navigate}}) => {
  useEffect(() => {
    ;(async () => {
      const user = await AsyncStorage.getItem('@user')
      if (user) initUser()
    })()
  }, [])
  const ScreenWithTitleAndContent = withTitleAndContent('홈')(false)()({})(
    ({style}) => {
      const [user, setUser] = useAsyncStorage('@user', null)
      const CurrentSubunitFromUserId = withNowStudying(CurrentSubunit)
      const {data, loading, error} = useQuery(GET_SUBUNITS_COLOR_NAME)

      if (loading) return <></>
      if (!user) return <></>
      if(error) alert(JSON.stringify(error))
      return (
        <View style={style}>
          <CurrentSubunitFromUserId
            userId={user.data.user.id}
            navigate={navigate}
          />
          <Compete>다른 소단원</Compete>
          {data.quizsubunits.map((e, i) => (
              <CardView
                styleMix={{
                  backgroundColor: e.bgcolor,
                }}
                key={e.bgcolor}>
                <TouchableNativeFeedback
                  onPress={() => {
                    navigate({
                      routeName: 'Quiz',
                      params: {
                        nowStudying: i + 1,
                        userId: user.data.user.id,
                      },
                    })
                  }}>
                <SubunitName>{e.subunit}</SubunitName>
            </TouchableNativeFeedback>
              </CardView>
          ))}
        </View>
      )
    },
  )
  return <ScreenWithTitleAndContent />
}
