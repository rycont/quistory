import React, { useState, useRef } from 'react'
import { Text, Image, Animated, View, ScrollView, YellowBox, Dimensions, TouchableNativeFeedback } from 'react-native'
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

function getScrapedPosts() {
    return getMyPosts()
}

function ButtonsWithIndexes({ indexes, activedNum, onPress }) {
    const ChipButton = styled.Text`
            padding-vertical: 7px;
            padding-horizontal: 12px;
            border: 1px solid rgba(0, 0,  0, 0.7);
            color: #344955;
            border-radius: 500px;
            margin-right: 5px;
        `
    const ActiveChipButton = styled(ChipButton)`
            background-color: #344955;
            color: #FEC864;
        `
    const ListIndexes = styled.View`
            flex-direction: row;
            padding-bottom: 10px;
            padding-top: 20px;
        `
    return <ListIndexes>
        {indexes.map((label, index) => <TouchableNativeFeedback key={encodeURI(label, index)} onPress={() => onPress(index, label)}>
            {index === activedNum
                ? <ActiveChipButton>{label}</ActiveChipButton>
                : <ChipButton>{label}</ChipButton>}
        </TouchableNativeFeedback>)}
    </ListIndexes>
}

export default ({ navigation: {
    navigate
} }) => {
    const SettingPageWithData = withTitleAndContent((headerAnimated, commonState, setCommonState) => {
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
        </>
    }
    )(false)()({
        height: [90, 70],
        shadow: false
    })(class extends React.Component {
        width = Dimensions.get('window').width - 36
        pagerScreenHeight = Dimensions.get('window').height - 256
        viewHeights = []
        state = {
            currentPage: Number(0),
            scrollviewHeight: Number(1010100)
        }
        setViewpagerHeight = (height) => {
            const standard = height < this.pagerScreenHeight ? this.pagerScreenHeight : height
            this.setState(() => ({
                scrollviewHeight: standard + 30
            }))
        }
        dragControl = (e) => {
            const currentPage = Math.round(e.nativeEvent.contentOffset.x / this.width)
            const height = this.viewHeights[currentPage]
            this.setViewpagerHeight(height)
            this.setState(() => ({ currentPage }))
        }
        clickedButton = (index) => {
            this.refs.scrollViewPager.scrollTo({
                x: index * this.width
            })
        }
        autoHeight = ({ nativeEvent: { layout: { height } } }, i) => {
            if(this.viewHeights.length === 0) this.setViewpagerHeight(height)
            this.viewHeights[i] = height
        }
        render() {
            const PageItem = styled.View`
                width: ${Dimensions.get('window').width - 36};
            `

            return <>
                <ButtonsWithIndexes
                    indexes={['스크랩한 문제', '스크랩한 글', '작성한 글']}
                    activedNum={this.state.currentPage}
                    onPress={this.clickedButton}
                />
                <ScrollView
                    pagingEnabled={true}
                    horizontal={true}
                    ref="scrollViewPager"
                    onScroll={this.dragControl}
                    style={{
                        height: this.state.scrollviewHeight
                    }}>
                    <PageItem>
                        <View onLayout={(e) => this.autoHeight(e, 0)}>
                            <Text>테스트이이이</Text>
                        </View>
                    </PageItem>
                    <PageItem>
                        <View onLayout={(e) => this.autoHeight(e, 1)}>
                        {getScrapedPosts().map((x, i) => <QuestionCard {...x} navigate={navigate} key={encodeURI(x + i)} />)}
                        </View>
                    </PageItem>
                    <PageItem>
                        <View onLayout={(e) => this.autoHeight(e, 2)}>
                            {getMyPosts().map((x, i) => <QuestionCard briefly {...x} navigate={navigate} key={encodeURI(x + i)} />)}
                        </View>
                    </PageItem>
                </ScrollView></>
        }
    })
    return <SettingPageWithData />
}