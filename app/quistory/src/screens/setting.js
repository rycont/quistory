import React, { useState, useRef } from 'react'
import { Text, Image, Animated, View, ScrollView, YellowBox, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import withTitleAndContent from '../components/basicScreen'
import SectionTitle from '../components/sectionTitle'
import { QuestionCard } from '../components/questioncard'
import ViewPager from '@react-native-community/viewpager'
import { CommentsList } from '../components/commentsList'

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
    }]
}

function getMyComments() {
    return [{
        author: '댓글 저자',
        content: '해보려고 인터넷을 뒤져가며 ASUS GPU Tweak,'
    }, {
        author: '병림픽기자',
        content: '병림픽의 현장입니다!'
    }]
}


export default ({ navigation: {
    navigate
} }) => {
    const ChipButton = styled.Text`
            padding-vertical: 7px;
            padding-horizontal: 12px;
            background-color: #344955;
            color: #FEC864;
            border-radius: 500px;
            margin-right: 5px;
        `
    const ListIndexes = styled.View`
            flex-direction: row;
            padding-bottom: 10px;
            padding-top: 20px;
            padding-left: 15px;
        `
    const SettingPageWithData = withTitleAndContent(headerAnimated => {
        return <>
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
            <ListIndexes>
                <ChipButton>
                    스크랩
            </ChipButton>
                <ChipButton>
                    작성한 글
            </ChipButton>
            </ListIndexes>
        </>
    }
    )(false)({
        height: [90, 70],
    })(class extends React.Component {
        state = {
            viewpagerHeight: Number(1010100)
        }
        pagesHeight = []
        pageSelected = ({ nativeEvent: { position } }) => {
            this.setState(() => ({
                viewpagerHeight: this.pagesHeight[position] + 90
            }))
        }
        addPageHeight = ({ nativeEvent: { layout: { height } } }) => {
            if(this.pagesHeight.length === 0) this.setState(() => ({
                viewpagerHeight: height + 90
            }))
            this.pagesHeight = [...this.pagesHeight, height]
        }
        render() {
            return <ViewPager
                style={{ height: this.state.viewpagerHeight }}
                pageMargin={20}
                onPageSelected={this.pageSelected}
                ref="pager"
            >
                <View>
                    <View onLayout={this.addPageHeight}>
                        {
                            getMyPosts().map((x, i) =>
                                <QuestionCard
                                    navigate={navigate}
                                    briefly={true}
                                    key={escape(x.content + i)}
                                    {...x} />
                            )
                        }
                    </View>
                </View>
                <View>
                    <View onLayout={this.addPageHeight}>
                        <Text>테스트페이지</Text>
                    </View>
                </View>
                <View>
                    <View onLayout={this.addPageHeight}>
                        <Text>테스트페이지</Text>
                        <Text>테스트페이지</Text>
                        <Text>테스트페이지</Text>
                    </View>
                </View>
                <View>
                    <View onLayout={this.addPageHeight}>
                        <Text>테스트페이지</Text>
                        <Text>테스트페이지</Text>
                    </View>
                </View>
            </ViewPager>
        }
    })
    return <SettingPageWithData />
}