import React from 'react'
import { Text, StyleSheet, View, BackHandler, Dimensions, TouchableNativeFeedback, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BoxShadow } from 'react-native-shadow'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import {CommentsList} from '../components/commentsList'

class QuestionCard extends React.Component {
    state = {
        fullscreen: false
    }
    setMenuRef = ref => {
        this._menu = ref
    }

    hideMenu = () => {
        this._menu.hide()
    }

    showMenu = () => {
        this._menu.show()
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if(this.state.fullscreen) {
                this.setState(() => ({
                    fullscreen: false
                }))
                this.props.showTitlebar()
                return true
            }
            return false
        })
    }
    closeFullscreen = () => {
        this.props.showTitlebar()
        this.setState(() => ({
            fullscreen: false
        }))
    }
    openFullscreen = () => {
        this.props.hideTitlebar()
        this.setState(() => ({
            fullscreen: true
        }))
    }
    render() {
        
        const {author, content, date, comments = [], metoo} = this.props
        return <View style={[styles.questionCardContainer, this.state.fullscreen ? {
            height: Dimensions.get('screen').height,
            zIndex: 10,
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            marginTop: 0
        }: undefined]}>
            <BoxShadow setting={{
                width: Dimensions.get('screen').width - (this.state.fullscreen ? 0 : 32),
                height: this.state.fullscreen ? Dimensions.get('screen').height : 190,
                color: "#000",
                border: 12,
                radius: 20,
                opacity: 0.05,
                backgroundColor: 'white'
            }}>
                <View style={[styles.questionCard, this.state.fullscreen ? {
                    height: Dimensions.get('screen').height
                } : undefined]}>
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
                        {
                            this.state.fullscreen ? <TouchableNativeFeedback onPress={this.closeFullscreen}><Icon name="close" size={20} /></TouchableNativeFeedback> : undefined
                        }
                    </View>
                    <TouchableNativeFeedback onLongPress={() => {
                        ToastAndroid.show('내용이 복사되었습니다', ToastAndroid.SHORT)
                    }} onPress={this.openFullscreen}>
                        <Text style={[styles.questionContent, this.state.fullscreen ? {
                            letterSpacing: 0.5,
                            lineHeight: 24,
                        } : {
                            flexBasis: 80
                        }]}>
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
                    {
                        this.state.fullscreen ?
                        <CommentsList />
                        : undefined
                    }
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