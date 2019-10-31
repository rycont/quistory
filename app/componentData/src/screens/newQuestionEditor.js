import React from 'react'
import {TouchableNativeFeedback, View, Alert} from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {HeaderBackButton} from 'react-navigation-stack'
import {Editor} from '../components/markdownEditor'
import {gql} from 'apollo-boost'
import {useMutation} from 'react-apollo'

let text
let refetchQuestions

const QuestionEditor = ({navigation}) => {
  refetchQuestions = navigation.getParam('forcerefetch', () =>
    console.log('no functions!'),
  )
  const FullscreenEditor = styled(Editor)`
    flex: 1;
  `
  return <FullscreenEditor onChangeText={_ => (text = _)} />
}
const apiServer = __DEV__ ? 'http://192.168.35.66' : '아직몰라유 하하'

const CREATE_QUESTION = gql`
  mutation createQuestion($contents: String!, $user: ID!) {
    createQuestion(input: {data: {contents: $contents, user: $user}}) {
      question {
        contents
        user {
          id
        }
      }
    }
  }
`

const UploadButton = ({navigation}) => {
  const [createQuestion] = useMutation(CREATE_QUESTION)
  console.log(navigation.state.params.userData.data.user.id)
  return (
    <View style={{marginRight: 10}}>
      <TouchableNativeFeedback
        onPress={async () => {
          createQuestion({
            variables: {
              contents: text.trim(),
              user: navigation.state.params.userData.data.user.id
            },
            refetchQueries: [{
              query: navigation.state.params.query
            }]
          })
          navigation.goBack()
        }}>
        <Icon name="done" size={24} color="white" />
      </TouchableNativeFeedback>
    </View>
  )
}
QuestionEditor.navigationOptions = ({navigation}) => ({
  headerRight: <UploadButton navigation={navigation} />,
  headerLeft: (
    <HeaderBackButton
      onPress={() =>
        Alert.alert(undefined, '작성을 취소하시겠어요?', [
          {
            text: '아니요',
            style: 'cancel',
          },
          {
            text: '예',
            style: 'default',
            onPress: () => navigation.goBack(),
          },
        ])
      }
      tintColor="white"
    />
  ),
})
export default QuestionEditor
