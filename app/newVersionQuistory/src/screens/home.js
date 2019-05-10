// @flow
import React from 'react';
import { Text, View, StyleSheet, Dimensions, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native'
import styled from 'styled-components/native'
import { BoxShadow } from 'react-native-shadow'
import withTitleAndContent from '../components/basicScreen'
import { CardView } from '../components/cardView'

function NowProgressingCard({ profileImage, name, nowProgressing, percentage }: {
    profileImage: string,
    name: string,
    nowProgressing: string,
    percentage: number
}) {
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
    const ScreenWithTitleAndContent = withTitleAndContent(`test님,
안녕하세요!`)('홈')(() => {
        const CurrentUnit = styled.ImageBackground`
        height: ${Dimensions.get('window').width - 32};
        border-radius: 12px;
        padding: 18px;
        `
        return (<React.Fragment>
            <View style={{
                marginTop: 23
            }}>
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
                            borderRadius: 13
                        }}>
                            <Text style={style.mainCurrentProgressCardText}>삼국</Text>
                            <Text style={[style.mainCurrentProgressCardText, style.mainCurrentProgressCardTitleText]}>삼국의 성립</Text>
                            <View style={style.mainCurrentProgressCardStartButton}>
                                <Text style={style.mainCurrentProgressCardText}>시작하기</Text>
                            </View>
                        </CurrentUnit>
                    </View>
                </TouchableWithoutFeedback>
            )} />
            </View>
            <Text style={style.competeTitleText}>
                경쟁
        </Text>
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
    mainCurrentProgressCardText: {
        color: 'white'
    },
    mainCurrentProgressCardTitleText: {
        fontSize: 25,
        fontWeight: '500'
    },
    mainCurrentProgressCardStartButton: {
        borderColor: 'white',
        borderWidth: 1,
        width: 70,
        padding: 5,
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 5
    },
    competeTitleText: {
        fontSize: 25,
        marginTop: 10,
        color: '#546D84',
        zIndex: 1000,
        marginBottom: 3
    },
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