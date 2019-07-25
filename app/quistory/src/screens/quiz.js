import { Dimensions, StatusBar } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import styled from 'styled-components/native'
import {FlashCard} from '../components/quizCard'

// this.carousel.snapToNext()

export default class extends React.Component {
    deviceWidth = Dimensions.get('window').width
    deviceHeight = Dimensions.get('window').height
    questionsQuentity = this.props.questions.length
    onPressNext = () => this.carousel.snapToNext()
    render() {
        const Background = styled.View`
            background-color: #566E80;
            flex: 1;
        `
        return <>
            <StatusBar translucent />
            <Background>
                <Carousel
                    data={this.props.questions}
                    renderItem={({item, index}) =>
                        <FlashCard
                            item={item}
                            index={index}
                            length={this.props.questions.length}
                            onPressNext={this.onPressNext}/>}
                    itemWidth={this.deviceWidth - 36}
                    itemHeight={this.deviceHeight}
                    inactiveSlideScale={0.95}
                    inactiveSlideOpacity={0.3}
                    sliderWidth={this.deviceWidth}
                    sliderHeight={this.deviceHeight}
                    ref={c => this.carousel = c}
                />
            </Background></>
    }
}