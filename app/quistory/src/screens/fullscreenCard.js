import React from 'react'
import { Text, View, Image, ScrollView, Dimensions, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'
import { Header } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { MakeModal } from '../components/makeModal'
import { CommentsList, NoComments } from '../components/commentsList'
import {
    PostBrief
} from '../components/postBrief'
import {
    makeTopToast
} from '../utils/makeToast'

class FullscreenCard extends React.Component {
    state = {
        modalItem: []
    }
    submitTextReply = () => {
        this.refs.replyInputBox.clear()
    }
    render() {
        const { props: { navigation: { state: { params: {
            author, content, date, comments, metoo
        } } } } } = this

        const Background = styled.View`
        background-color: #F7F7F7;
        min-height: ${Dimensions.get('window').height - Header.HEIGHT}px;
        padding-bottom: 80px;
        `
        const ProfileImage = styled.Image`
        width: 42px;
        height: 42px;
        border-radius: 42px;
        margin-right: 5px;
        `
        const Post = styled.View`
        background-color: white;
        padding: 12px;
        `
        const PostInfo = styled.View`
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
        `
        const Author = styled.Text`
        color: black;
        font-weight: 600;
        margin-left: 3px;
        `
        const Content = styled.View`
        padding-left: 52px;
        `
        const PostText = styled.Text`
        color: #202020;
        font-size: 15;
        line-height: 25;
        `
        const RightAlignedIcon = styled(Icon)`
        flex: 1;
        text-align: right;
        `
        const AddReplayContainer = styled.View`
        height: 60px;
        position: absolute;
        bottom: 0;
        background-color: white;
        width: 100%;
        padding: 10px;
        border-top-color: rgba(0, 0, 0, 0.1);
        border-top-width: 1.3px;
        display: flex;
        flex-direction: row;
        `
        const ReplyInput = styled.TextInput`
        background-color: #F3F3F3;
        border-radius: 60px;
        padding-left: 20px;
        flex: 1;
        `
        const SubmitReply = styled.Text`
        background-color: #344955;
        color: #FEC864;
        text-align: center;
        text-align-vertical: center;
        border-radius: 40px;
        elevation: 1;
        width: 40px;
        margin-left: 7px;
        `
        return (
            <>  
                <Background>
                    <MakeModal items={this.state.modalItem} closeModal={() => this.setState(() => ({modalItem: []}))} />
                    <ScrollView>
                        <Post>
                            <PostInfo>
                                <ProfileImage source={{
                                    uri: author.profileImage
                                }} />
                                <View>
                                    <Author>{author.name}</Author>
                                    <Text>{date}</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={() => this.setState(() => ({modalItem: [{
                                    label: '신고'
                                }, {
                                    label: '공유'
                                }, {
                                    label: '저장'
                                }]}))}>
                                    <RightAlignedIcon name="more-vert" size={23} />
                                </TouchableWithoutFeedback>
                            </PostInfo>
                            <Content>
                                <PostText>
                                    {content}
                                </PostText>
                                <PostBrief commentsAmount={comments ?.length} metoo={metoo} />
                            </Content>
                        </Post>
                        {
                            comments ? <CommentsList comments={comments} /> : <NoComments />
                        }
                    </ScrollView>
                </Background>
                <AddReplayContainer>
                    <ReplyInput
                        placeholder="댓글을 입력해보세요!"
                        ref="replyInputBox"
                        onSubmitEditing={this.submitTextReply}
                        blurOnSubmit={true} />
                    <TouchableNativeFeedback onPress={this.submitTextReply}>
                        <SubmitReply>
                            <Icon name="add" size={30} />
                        </SubmitReply>
                    </TouchableNativeFeedback>
                </AddReplayContainer>
            </>
        )
    }
}

export default FullscreenCard