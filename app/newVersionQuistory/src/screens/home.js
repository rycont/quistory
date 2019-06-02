import React from 'react';
import { Text, View, StyleSheet, Dimensions, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import withTitleAndContent from '../components/basicScreen'

function NowProgressingCard({ profileImage, name, nowProgressing, percentage }) {
    return (
        <BoxShadow setting={{
            width: Dimensions.get('window').width - 32,
            height: 85,
            color: "#000",
            border: 12,
            radius: 20,
            opacity: 0.05
        }}>
            <View style={style.mainCompeteOpponentCard}>
                <Image source={{
                    uri: profileImage || "http://res.heraldm.com/phpwas/restmb_jhidxmake.php?idx=5&simg=201812282006542884869_20181228200719_01.jpg"
                }} style={style.mainCompeteOpponentCardProfileImage}></Image>
                <View style={style.mainCompeteOpponentCardText}>
                    <Text style={style.mainCompeteOpponentCardName}>{name}</Text>
                    <Text style={style.mainCompeteOpponentCardNowStudying}>{nowProgressing}</Text>
                </View>
                <Text style={style.mainCompeteOpponentCardProgress}>{percentage * 100}%</Text>
            </View>
        </BoxShadow>
    )
}

export default () => {
    const ScreenWithTitleAndContent = withTitleAndContent(`#{this.props.name}님,
안녕하세요!`)('홈')(() => <React.Fragment>
        <BoxShadow setting={{
            color: "#000",
            border: 20,
            radius: 0,
            opacity: 0.09,
            width: Dimensions.get('window').width - 32,
            height: Dimensions.get('window').width - 32,
            style: {
                marginTop: 23,
            }
        }}>
            <TouchableWithoutFeedback onPress={() => {
                alert('GOOD!!!')
            }}>
                <View>

                    <ImageBackground source={require('../assets/threeKingdomsAge.png')} style={style.mainCurrentProgressCard}>
                        <Text style={style.mainCurrentProgressCardText}>삼국</Text>
                        <Text style={[style.mainCurrentProgressCardText, style.mainCurrentProgressCardTitleText]}>삼국의 성립</Text>
                        <View style={style.mainCurrentProgressCardStartButton}>
                            <Text style={style.mainCurrentProgressCardText}>시작하기</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        </BoxShadow>
        <Text style={style.competeTitleText}>
            경쟁
        </Text>
        <NowProgressingCard profileImage="https://lh3.googleusercontent.com/-KB04qOmj5ok/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdGk7TbeDVQTVmqlRSAak2j9vhi8A/" name="김민규" nowProgressing="사림과 성리학" percentage={0.7} />
        <NowProgressingCard profileImage="" name="김민규" nowProgressing="사림과 성리학" percentage={0.7} />
        <NowProgressingCard profileImage="" name="김민규" nowProgressing="사림과 성리학" percentage={0.7} />
    </React.Fragment>)
    return (
        <ScreenWithTitleAndContent />
    )
}

const style = StyleSheet.create({
    mainCurrentProgressCard: {
        borderRadius: 20,
        height: Dimensions.get('window').width - 36,
        overflow: 'hidden',
        padding: 22.5,
        zIndex: -1000
    },
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
        backgroundColor: 'white',
        height: 75,
        marginTop: 5,
        borderRadius: 10,
        padding: 15,
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