// @flow
import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Modal, Dimensions,
    TouchableNativeFeedback, ToastAndroid,
    TouchableWithoutFeedback, Image
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BoxShadow } from 'react-native-shadow'
import { MakeModal } from '../components/makeModal'
import { CardView } from '../components/cardView'
import styled from 'styled-components/native'

type Props = {
    author: {
        name: string,
        profileImage: string,
    },
    content: string,
    date: Date,
    comments: Array<string>,
    metoo: number,
    navigate: any
}
type State = {
    modal: Array<{
        label: string,
        action: function
    }>
}

class QuestionCard extends Component<Props, State> {
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
    get12HouredTime(hour: number) {
        if (hour > 12) {
            return `오후 ${hour - 12}`
        }
        return `오전 ${hour}`
    }
    formatDate = (date: Date) => {
        return `${date.getFullYear() === new Date().getFullYear() ? '' : date.getFullYear() + '년'} ${date.getMonth() + 1}월 ${date.getDate()}일 ${this.get12HouredTime(date.getHours())}:${date.getMinutes()}`
    }
    render() {
        const { author, content, date, comments = [], metoo, navigate } = this.props
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
        `
        const BottomIcon = styled(Icon)`
        margin-left: 10;
        margin-right: 5;
        `
        return <View>
            <MakeModal items={this.state.modal} closeModal={() => this.setState(() => ({
                modal: []
            }))} />
            <CardView render={() => (
                <View>
                    <View style={styles.questionBasicInfo}>
                        <ProfileImage source={{
                            uri: author.profileImage
                        }} />
                        <View>
                            <Uploder>{author.name}</Uploder>
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
                    </View>
                    <TouchableNativeFeedback onPress={() => {
                        navigate({
                            routeName: 'FullscreenCard',
                            params: {
                                author, content, date, comments, metoo
                            }
                        })
                    }}>
                        <Content numberOfLines={2}>
                            {content.split('\n').join(' ')}
                        </Content>
                    </TouchableNativeFeedback>
                    <View style={styles.questionBottomInfo}>
                        <TouchableNativeFeedback onPress={() => {
                            alert('GOOD')
                        }}>
                            <View style={{
                                width: 50,
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <BottomIcon name="question-answer" size={20} style={{
                                    marginLeft: 0
                                }} />
                                <Text>{comments.length}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => {
                            alert('GOOD')
                        }}>
                            <View style={{
                                width: 50,
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <BottomIcon name="live-help" size={20} />
                                <Text>{metoo}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            )} />
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
    questionBasicInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
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
    questionBottomInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },
    verticalMiddle: {
        marginRight: 10
    }
})

export {
    QuestionCard
}