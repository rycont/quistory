import React from 'react'
import { View } from 'react-native'
import withTitleAndContent from '../components/basicScreen'
import { QuestionCard } from '../components/questioncard'

function getPosts() {
    return [{
        author: {
            name: '클리앙',
            profileImage: 'http://image.musinsa.com/data/celeb/6570/6570_1_org.jpg'
        },
        content: '여기엔 트위터스러운 짧은 문구가 어울립니다.',
        comments: [{
                author: '댓글 저자',
                content: '해보려고 인터넷을 뒤져가며 ASUS GPU Tweak,'
            }, {
                author: '병림픽기자',
                content: '병림픽의 현장입니다!'
        }],
        date: new Date(),
        metoo: 0
    }]
}

export default ({ navigation: {
    navigate
} }) => {
    const QnaScreenWithData = withTitleAndContent('질문')(false)([{
        name: 'create',
        action: () => {
            navigate('NewQuestionEditor')
        }
    }])({})(({ style }) => {
        return (<View style={style}>
            {getPosts().map(x => <QuestionCard navigate={navigate} {...x} key={`${x.author.name}의 ${x.content}`} />)}
        </View>)
    })
    return (
        <QnaScreenWithData />
    )
}