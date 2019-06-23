import React, { memo, useState } from 'react'
import styled from 'styled-components/native'
import { TextInput, Dimensions, Button } from 'react-native'
export const FlashCard = memo(({ item, index, length }) => {
    const [questionState, setState] = useState(null)
    const Container = styled.KeyboardAvoidingView`
        align-items: center;
        justify-content: center;
        flex: 1;
    `
    const QuestionCard = styled.View`
        background-color: white;
        border-radius: 18px;
        padding: 25px;
        padding-top: 15px;
        padding-bottom: 35px;
        width: ${Dimensions.get('window').width - 36};
    `
    const IndexIndicator = styled.Text`
        font-size: 36px;
        color: #6E6E6E;
        text-align-vertical: bottom;
    `
    const QuestionsQuentity = styled.Text`
        font-size: 24px;
        color: #B2B2B2;
        text-align-vertical: bottom;
        margin-left: 13px;
        margin-bottom: 3px;
    `
    const IndexContainer = styled.View`
        flex-direction: row;
    `
    const DividerLine = styled.View`
        width: 40px;
        height: 5px;
        background-color: #76A8C7;
        margin-left: 3px;
    `
    const Examiner = styled.Text`
        font-size: 18px;
        color: #848484;
        margin-top: 5px;
        margin-bottom: 5px;
    `
    const QuestionType = styled.Text`
        font-size: 15px;
        margin-bottom: 10px;
        color: #A1ACB8;
    `
    const Content = styled.Text`
        font-size: 20px;
        color: #2E506F;
        text-align: center;
        line-height: 30px;
    `
    return <>
        <Container enabled behavior="height">
            <QuestionCard>
                <IndexContainer>
                    <IndexIndicator>{index + 1}</IndexIndicator>
                    <QuestionsQuentity>{length}</QuestionsQuentity>
                </IndexContainer>
                <DividerLine />
                <Examiner>출제자: {item.examiner}</Examiner>
                {questionState === null ? <QuestionType>({item.type})</QuestionType> : undefined}
                <Content>{item.content}</Content>
                {questionState === null ? <TextInput placeholder="눌러서 입력" style={{
                        backgroundColor: '#96AABA',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        padding: 15,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: 80,
                        position: 'absolute',
                        bottom: -20,
                        textAlign: 'center',
                        color: 'white'
                    }} onSubmitEditing={(e) => setState(e.nativeEvent.text === item.answer)} /> : undefined}
            </QuestionCard>
        </Container>
    </>
})