import React from 'react';
import { Text, View, StyleSheet, Dimensions, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native'
import styled from 'styled-components/native'
import withTitleAndContent from '../components/basicScreen'
import { CardView } from '../components/cardView'

function NowStudyingCard({ profileImage, name, nowStudying, percentage }) {
    const Container = styled(CardView)`
    width: ${Dimensions.get('window').width - 32}px;
    height: 85px;
    flex-direction: row;
    `
    const HorizontalAlign = styled.View`
    flex-direction: row;
    `
    const ProfileImage = styled.Image`
    width: 45px;
    height: 45px;
    flex-basis: 45px;
    border-radius: 30px;
    `
    const TextsContainer = styled.View`
    padding-left: 10px;
    `
    const Name = styled.Text`
    color: black;
    font-size: 12;
    opacity: 0.7;
    `
    const NowStudying = styled.Text`
    color: black;
    font-size: 17;
    `
    return (
        <Container><HorizontalAlign>
            <ProfileImage source={{
                uri: profileImage || "http://res.heraldm.com/phpwas/restmb_jhidxmake.php?idx=5&simg=201812282006542884869_20181228200719_01.jpg"
            }} />
            <TextsContainer>
                <Name>{name}</Name>
                <NowStudying>{nowStudying}</NowStudying>
            </TextsContainer>
        </HorizontalAlign></Container>
    )
}

export default ({navigation: {navigate}}) => {
    const ScreenWithTitleAndContent = withTitleAndContent('홈')(false)()({})(({style}) => {
        const CurrentUnit = styled.ImageBackground`
        height: ${Dimensions.get('window').width - 32};
        padding: 18px;
        `
        const CurrentText = styled.Text`
        color: white;
        `
        const CurrentStep = styled(CurrentText)`
        font-size: 25px;
        font-weight: 500;
        `
        const StartButton = styled.View`
        border: 1px solid white;
        width: 70px;
        padding: 5px;
        border-radius: 10px;
        margin-top: 5px;
        margin-left: 5px;
        `
        const Compete = styled.Text`
        font-size: 25px;
        margin-top: 23px;
        color: black;
        margin-bottom: 3px;
        `

        return (<View style={style}>
            <CardView style={{
                color: "#000",
                width: Dimensions.get('window').width - 32,
                height: Dimensions.get('window').width - 32,
            }} innerPadding={false}>
                <TouchableWithoutFeedback onPress={() => {
                    navigate('Quiz')
                }}>
                    <View>
                        <CurrentUnit source={require('../assets/threeKingdomsAge.png')} imageStyle={{
                            borderRadius: 12
                        }}>
                            <CurrentText>삼국</CurrentText>
                            <CurrentStep>삼국의 성립</CurrentStep>
                                <StartButton>
                                    <CurrentText>
                                        시작하기
                                    </CurrentText>
                                </StartButton>
                        </CurrentUnit>
                    </View>
                </TouchableWithoutFeedback>
            </CardView>
            <Compete>
                경쟁
            </Compete>
            <NowStudyingCard
                profileImage="https://lh3.googleusercontent.com/-KB04qOmj5ok/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdGk7TbeDVQTVmqlRSAak2j9vhi8A/"
                name="김민규"
                nowStudying="사림과 성리학"
                percentage={0.7} />
            <NowStudyingCard profileImage="" name="이석민" nowStudying="사림과 성리학" percentage={0.7} />
            <NowStudyingCard profileImage="" name="김민규" nowStudying="사림과 성리학" percentage={0.7} />
        </View>)
    })
    return (
        <ScreenWithTitleAndContent />
    )
}