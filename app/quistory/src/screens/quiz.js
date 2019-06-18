import { View, Text, Dimensions, StatusBar, TouchableNativeFeedback } from 'react-native'
import React, {useState} from 'react'
import Carousel from 'react-native-snap-carousel'
import styled from 'styled-components/native'

export default class extends React.Component {
    deviceWidth = Dimensions.get('window').width
    deviceHeight = Dimensions.get('window').height
    FlashCard = ({item, index}) => {
        const Continer = styled.View`
            height: 360px;
            background-color: white;
            border-radius: 18px;
            padding: 18px;
            width: ${this.deviceWidth - 36};
        `
        return <Continer>
            <Text>{item.content}</Text>
            <TouchableNativeFeedback onPress={() => {
                console.log(index)
                this.carousel.snapToNext()
            }}>
                <Text>클릭해서 넘어가기</Text>
            </TouchableNativeFeedback>
        </Continer>
    }
    render() {
        const Background = styled.View`
            background-color: #566E80;
            flex: 1;
            align-items: center;
        `
        console.log(this.deviceWidth)
        return <>
          <StatusBar translucent />
        <Background style={{
                    paddingTop: (this.deviceHeight - 360) / 2
                }}>
            <Carousel
                data={this.props.questions}
                renderItem={this.FlashCard}
                itemWidth={this.deviceWidth - 36}
                inactiveSlideScale={0.95}
                inactiveSlideOpacity={0.3}
                sliderWidth={this.deviceWidth}
                sliderHeight={360}
                ref={c => this.carousel = c}
            />
        </Background></>
    }
}