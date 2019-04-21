import React from 'react'
import { Text, StyleSheet, View, BackHandler, Dimensions, TouchableNativeFeedback, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BoxShadow } from 'react-native-shadow'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import {CommentsList} from '../components/commentsList'

class QuestionCard extends React.Component {
    setMenuRef = ref => {
        this._menu = ref
    }

    hideMenu = () => {
        this._menu.hide()
    }

    showMenu = () => {
        this._menu.show()
    }
    render() {
        
        const {author, content, date, comments = [], metoo} = this.props
        return <View style={styles.questionCardContainer}>
            <BoxShadow setting={{
                width: Dimensions.get('screen').width - 32,
                height: 190,
                color: "#000",
                border: 12,
                radius: 20,
                opacity: 0.05,
                backgroundColor: 'white'
            }}>
                <View style={styles.questionCard}>
                    <View style={styles.questionBasicInfo}>
                        <Text style={styles.questionUploader}>{author}</Text>
                        <Text>{date}</Text>
                        <TouchableNativeFeedback onPress={this.showMenu}>
                            <Icon name="more-vert" size={20} style={styles.verticalDots} />
                        </TouchableNativeFeedback>
                        <Menu
                            ref={this.setMenuRef}
                            button={<></>}
                        >
                            <MenuItem onPress={this.hideMenu}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginHorizontal: 10
                                }}>
                                    <Icon name="report" size={20} style={styles.verticalMiddle} /><Text>부적절한 게시물</Text>
                                </View>
                            </MenuItem>
                        </Menu>
                    </View>
                    <TouchableNativeFeedback onLongPress={() => {
                        ToastAndroid.show('내용이 복사되었습니다', ToastAndroid.SHORT)
                    }}>
                        <Text style={styles.questionContent}>
                            {content}
                        </Text>
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
                                <Icon name="question-answer" size={20} style={[styles.questionBottomIcons, {
                                    marginLeft: 0
                                }]} />
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

                                <Icon name="live-help" size={20} style={styles.questionBottomIcons} />
                                <Text>{metoo}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </BoxShadow>
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
    questionCard: {
        backgroundColor: 'white',
        height: 190,
        padding: 18,
        borderRadius: 12,
        display: 'flex'
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
    questionContent: {
        color: '#202020',
        fontSize: 15,
        flexBasis: 80
    },
    questionUploader: {
        color: '#707070',
        fontWeight: '600',
        marginRight: 10
    },
    questionBottomInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },
    questionBottomIcons: {
        marginLeft: 10,
        marginRight: 5
    },
    verticalMiddle: {
        marginRight: 10
    }
})

export {
    QuestionCard
}