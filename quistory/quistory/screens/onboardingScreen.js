import React from 'react';
import { Image, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper'

export default ({ onDone }) => (
  <Onboarding
    pages={[
      {
        backgroundColor: '#F5FBFF',
        image: <Image source={require('../assets/downloaded.png')} style={{
          width: Dimensions.get('screen').width,
          height: 200,
          resizeMode: 'contain',
        }} />,
        subtitle: '간단한 설명을 보려면 오른쪽으로 넘겨보세요!',
        title: 'Quistory'
      }, {
        backgroundColor: '#BF73FE',
        image: <Image source={require('../assets/downloaded.png')} style={{
          width: Dimensions.get('screen').width,
          height: 200,
          resizeMode: 'contain',
        }} />,
        title: '문제 풀기',
        subtitle: '퀴즈를 풀면서 역사 상식을 알아보세요',
      }, {
        backgroundColor: '#FEC973',
        image: <Image source={require('../assets/downloaded.png')} style={{
          width: Dimensions.get('screen').width,
          height: 200,
          resizeMode: 'contain',
        }} />,
        title: '질문하기',
        subtitle: '의문점이 있나요? 질문을 하면 사람들이 도와줍니다.',
      }
    ]}
    onDone={() => {
      //Actions.jump('home')
    }}
  />
)