import React from 'react'
import { View, TextInput, Text, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export class Editor extends React.Component {
    state = {
        text: String('')
    }
    TouchableIcon({ name, action, style }) {
        return <TouchableNativeFeedback onPress={action}><Icon style={style} name={name} /></TouchableNativeFeedback>
    }
    appendSymbolToInput = (symbol) => {
        const text = this.state.text + symbol
        this.refs.editorInput.setNativeProps({
            text
        })
        this.setState(() => ({ text }))
    }
    shouldComponentUpdate(nextProps, nextState) {
        this.props?.onChangeText(nextState.text)
        return false
    }
    render() {
        const Container = styled.View`
        `
        const MainEditorInput = styled.TextInput`
        flex: 1;
        width: 100%;
        text-align-vertical: top;
        padding: 20px;
        padding-top: 0px;
        `
        const Toolsbox = styled.View`
        height: 50px;
        flex-direction: row;
        background-color: #344955;
        `
        const Tool = styled(this.TouchableIcon)`
        height: 50px;
        width: 50px;
        font-size: 22px;
        text-align-vertical: center;
        text-align: center;
        color: #FEC864;
        `
        return <Container style={this.props.style}>
            <MainEditorInput
                placeholder="질문을 입력해주세요. 마크다운을 지원합니다."
                ref="editorInput"
                onChangeText={text => {
                    this.setState(() => ({ text }))
                }}
                defaultValue={`\n`}
                multiline={true} />
            <Toolsbox>
                <Tool name="format-bold" action={() => this.appendSymbolToInput('**굵게**')} />
                <Tool name="format-italic" action={() => this.appendSymbolToInput('_기울임_')} />
                <Tool name="link" action={() => this.appendSymbolToInput('[링크](http://)')} />
                <Tool name="format-list-bulleted" action={() => this.appendSymbolToInput(`
* 목록
* 목록`)} />
                <Tool name="format-list-numbered" action={() => this.appendSymbolToInput(`
1. 목록
1. 목록`)} />
                <Tool name="format-quote" action={() => this.appendSymbolToInput('> 인용문')} />
            </Toolsbox>
        </Container>
    }
}