import React from 'react'
import { Text, Image, Animated, View } from 'react-native'
import styled from 'styled-components/native'
import withTitleAndContent from '../components/basicScreen'
import SectionTitle from '../components/sectionTitle'
import {QuestionCard} from '../components/questioncard'
import ViewPager from 'react-native-viewpager'


function getMyPosts() {
    return [{
        author: {
            name: '민규',
            profileImage: 'http://image.musinsa.com/data/celeb/6570/6570_1_org.jpg'
        },
        content: '다시 시작처럼 조금 토라지더라도 서로가 서로에게 위안이 된다는 느낌으로 다시 시작처럼 나아가야지 나에게 너는 정말 큰 희망이라는 존재이니ㄴ까 부디 사라지지 말아줘',
        date: new Date()
    }, {
        author: {
            name: '민규',
            profileImage: 'http://image.musinsa.com/data/celeb/6570/6570_1_org.jpg'
        },
        content: '다시 시작처럼 조금 토라지더라도 서로가 서로에게 위안이 된다는 느낌으로 다시 시작처럼',
        date: new Date()
    }, {
        author: {
            name: '민규',
            profileImage: 'http://image.musinsa.com/data/celeb/6570/6570_1_org.jpg'
        },
        content: '다시 시작처럼 조금 토라지더라도 서로가 서로에게 위안이 된다는 느낌으로 다시 시작처럼',
        date: new Date()
    }, {
        author: {
            name: '민규',
            profileImage: 'http://image.musinsa.com/data/celeb/6570/6570_1_org.jpg'
        },
        content: '다시 시작처럼 조금 토라지더라도 서로가 서로에게 위안이 된다는 느낌으로 다시 시작처럼',
        date: new Date()
    }, {
        author: {
            name: '민규',
            profileImage: 'http://image.musinsa.com/data/celeb/6570/6570_1_org.jpg'
        },
        content: '다시 시작처럼 조금 토라지더라도 서로가 서로에게 위안이 된다는 느낌으로 다시 시작처럼',
        date: new Date()
    }]
}

function getMyComment() {
    return [{
        author: '댓글 저자',
        content: '해보려고 인터넷을 뒤져가며 ASUS GPU Tweak,'
    }, {
        author: '병림픽기자',
        content: '병림픽의 현장입니다!'
    }]
}

export default ({navigation: {
    navigate
}}) => {
    const SettingPageWithData = withTitleAndContent(headerAnimated =>
        <Animated.View style={{
            height: headerAnimated.interpolate({
                inputRange: [0, 50, Infinity],
                outputRange: [90, 70, 70]
            }),
            backgroundColor: '#F7F7F7',
            display: 'flex',
            flexDirection: 'row',
            paddingTop: headerAnimated.interpolate({
                inputRange: [0, 50, Infinity],
                outputRange: [20, 15, 15]
            }),
            paddingLeft: 20
        }}>
            <Animated.Image source={{
                uri: 'https://pbs.twimg.com/profile_images/899119956054335488/7KKkdNRo_400x400.jpg'
            }} style={{
                width: headerAnimated.interpolate({
                    inputRange: [0, 50, Infinity],
                    outputRange: [50, 40, 40]
                }),
                height: headerAnimated.interpolate({
                    inputRange: [0, 50, Infinity],
                    outputRange: [50, 40, 40]
                }),
                borderRadius: 60
            }} />
            <Animated.Text style={{
                color: 'black',
                fontSize: headerAnimated.interpolate({
                    inputRange: [0, 50, Infinity],
                    outputRange: [18, 15, 15]
                }),
                paddingTop: headerAnimated.interpolate({
                    inputRange: [0, 50, Infinity],
                    outputRange: [10, 6, 6]
                }),
                marginLeft: 10,
                fontWeight: 'bold'
            }}>
                test님
            </Animated.Text>
        </Animated.View>
    )(false)({
        height: [90, 70],
        shadow: false
    })(() => {
        return <>
        <SectionTitle>작성한 글</SectionTitle>
        {getMyPosts().map((x, i) => <View key={encodeURI(x.content + i)}>
            <QuestionCard {...x}
            navigate={navigate}
            briefly={true}
            
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }} />
        </View>)}
        </>
    })
    return <SettingPageWithData />
}