import React from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Editor} from '../components/markdownEditor'
import {makeTopToast} from '../utils/makeToast'

let postContent

const QuestionEditor = () => {
    const FullscreenEditor = styled(Editor)`
    flex: 1;
    `
    return <FullscreenEditor onChangeText={text => postContent = text} />
}
const addNewPost = () => {
    makeTopToast('질문이 등록되었습니다.')
}
QuestionEditor.navigationOptions = ({navigation }) => ({
    headerRight: <View style={{marginRight: 10}}>
        <TouchableNativeFeedback onPress={() => {
            addNewPost()
            navigation.goBack()
        }}>
        <Icon name="done" size={24} color="black" />
    </TouchableNativeFeedback>
    </View>
})
export default QuestionEditor