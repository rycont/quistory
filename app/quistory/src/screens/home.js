import React from 'react';
import { Text, View, StyleSheet, Dimensions, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native'
import styled from 'styled-components/native'
import withTitleAndContent from '../components/basicScreen'
import { CardView } from '../components/cardView'

function NowProgressingCard({ profileImage, name, nowProgressing, percentage }) {
    const Container = styled(CardView)`
    width: ${Dimensions.get('window').width - 32}px;
    height: 85px;
    `
    return (
        <Container render={() => <View style={style.mainCompeteOpponentCard}>
            <Image source={{
                uri: profileImage || "http://res.heraldm.com/phpwas/restmb_jhidxmake.php?idx=5&simg=201812282006542884869_20181228200719_01.jpg"
            }} style={style.mainCompeteOpponentCardProfileImage}></Image>
            <View style={style.mainCompeteOpponentCardText}>
                <Text style={style.mainCompeteOpponentCardName}>{name}</Text>
                <Text style={style.mainCompeteOpponentCardNowStudying}>{nowProgressing}</Text>
            </View>
            <Text style={style.mainCompeteOpponentCardProgress}>{percentage * 100}%</Text>
        </View>} />
    )
}

export default () => {
    const ScreenWithTitleAndContent = withTitleAndContent('홈')(false)({})(() => {
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

        return (<React.Fragment>
            <CardView style={{
                color: "#000",
                width: Dimensions.get('window').width - 32,
                height: Dimensions.get('window').width - 32,
            }} innerPadding={false} render={() => (
                <TouchableWithoutFeedback onPress={() => {
                    alert('GOOD!!!')
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
            )} />
            <Compete>
                경쟁
            </Compete>
            <NowProgressingCard
                profileImage="https://lh3.googleusercontent.com/-KB04qOmj5ok/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdGk7TbeDVQTVmqlRSAak2j9vhi8A/"
                name="김민규"
                nowProgressing="사림과 성리학"
                percentage={0.7} />
            <NowProgressingCard profileImage="" name="이석민" nowProgressing="사림과 성리학" percentage={0.7} />
            <NowProgressingCard profileImage="" name="김민규" nowProgressing="사림과 성리학" percentage={0.7} />
        </React.Fragment>)
    })
    return (
        <ScreenWithTitleAndContent />
    )
}

const style = StyleSheet.create({
    mainCompeteOpponentCard: {
        display: 'flex',
        flexDirection: 'row'
    },
    mainCompeteOpponentCardProfileImage: {
        width: 45,
        height: 45,
        flexBasis: 45,
        borderRadius: 30
    },
    mainCompeteOpponentCardProgress: {
        flex: 1,
        textAlign: 'right'
    },
    mainCompeteOpponentCardText: {
        marginLeft: 10
    },
    mainCompeteOpponentCardNowStudying: {
        fontSize: 17,
        fontWeight: '300',
        color: 'black'
    },
    mainCompeteOpponentCardName: {
        fontSize: 12,
        color: 'black'
    }
})