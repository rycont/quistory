import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Modal, Dimensions,
    TouchableNativeFeedback, ToastAndroid,
    TouchableWithoutFeedback, Image
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { MakeModal } from '../components/makeModal'
import { CardView } from '../components/cardView'
import {PostBrief} from '../components/postBrief'
import styled from 'styled-components/native'

class QuestionCard extends Component {
    report() {
        alert('신고되었습니다(더미)')
    }
    copy() {
        ToastAndroid.showWithGravity('내용이 복사되었습니다', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 100)
    }
    share() {
        alert('신고되었습니다(더미)')
    }
    state = {
        modal: []
    }
    get12HouredTime(hour) {
        if (hour > 12) {
            return `오후 ${hour - 12}`
        }
        return `오전 ${hour}`
    }
    formatDate = (date) => {
        return `${date.getFullYear() === new Date().getFullYear() ? '' : date.getFullYear() + '년'} ${date.getMonth() + 1}월 ${date.getDate()}일 ${this.get12HouredTime(date.getHours())}:${date.getMinutes()}`
    }
    render() {
        const { author, content, date, comments, metoo, navigate, briefly } = this.props
        function hideIfBriefly(component) {
            if(briefly) return undefined
            return component
        }
        const ProfileImage = styled.Image`
        width: 30px;
        height: 30px;
        border-radius: 30px;
        margin-top: 5px;
        margin-right: 5px; 
        `
        const Uploder = styled.Text`
        color: #707070;
        font-weight: 600;
        margin-left: 3px;
        `
        const Content = styled.Text`
        color: #202020;
        font-size: 15;
        line-height: 25;
        `
        const BasicInfo = styled.View`
            display: flex;
            flex-direction: row;
            margin-bottom: ${briefly ? 7 : 15}px;
        `
        return <View>
            <MakeModal items={this.state.modal} closeModal={() => this.setState(() => ({
                modal: []
            }))} />
            <CardView styleMix={{
                paddingTop: 12
            }}>
                
                <View>
                    <BasicInfo>
                        {hideIfBriefly(<ProfileImage source={{
                            uri: author.profileImage
                        }} />)}
                        <View>
                            {!briefly ? <Uploder>{author.name}</Uploder> : undefined}
                            <Text>{this.formatDate(date)}</Text>
                        </View>
                        <TouchableNativeFeedback onPress={() => this.setState(() => ({
                            modal: [{
                                label: '신고',
                                action: this.report
                            }, {
                                label: '공유',
                                action: this.share
                            }, {
                                label: '복사',
                                action: this.copy
                            }]
                        }))} hitSlop={{
                            top: 10,
                            left: 10,
                            bottom: 10,
                            right: 10
                        }}>
                            <Icon name="more-vert" size={20} style={styles.verticalDots} />
                        </TouchableNativeFeedback>
                    </BasicInfo>
                    <TouchableNativeFeedback onPress={() => {
                        navigate({
                            routeName: 'FullscreenCard',
                            params: {
                                author, content, date: this.formatDate(date), comments, metoo
                            }
                        })
                    }}>
                        <Content numberOfLines={briefly ? 1 : 2}>
                            {content.split('\n').join(' ')}
                        </Content>
                    </TouchableNativeFeedback>
                    <PostBrief commentsAmount={comments?.length} metoo={metoo} briefly={briefly} />
                </View>
            
            </CardView>
        </View>

    }
}

const styles = StyleSheet.create({
    questionCardContainer: {
        marginTop: 15,
    },
    questionProfile: {
        width: 35,
        height: 35,
        marginRight: 10
    },
    verticalDots: {
        flex: 1,
        textAlign: 'right'
    },
    questionUploader: {
        color: '#707070',
        fontWeight: '600',
        marginLeft: 10
    },
    verticalMiddle: {
        marginRight: 10
    }
})

export {
    QuestionCard
}