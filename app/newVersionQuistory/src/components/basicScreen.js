import React from 'react'
import { StyleSheet, ScrollView, View, Text, Animated, Easing } from 'react-native'
import { NavigationEvents } from "react-navigation"
import styled from 'styled-components/native'

export default (title) => (subtitle) => (Content) => {
    return class extends React.Component {
        state = {
            scrolly: new Animated.Value(0),
        }
        headerStyleControl = ({nativeEvent: {
            contentOffset: {
                y: scrolly
            }
        }}) => {
            Animated.timing(this.state.scrolly, {
                toValue: scrolly > 10 ? 50 : 0,
                duration: 200,
                easing: Easing.out(Easing.quad)
            }).start()
        }
        onWillFocus = (event) => {
            if(title !== '홈' && event.action.type === 'Navigation/BACK') return
            console.log('맨 위로!\n')
            this.scrollView.scrollTo({
                x: 0,   
                y: 0,
                animated: true
            })
        }
        render() {
            const Container = styled.View`
            background-color: white;
            padding-bottom: 60px;
            `
            const ContentContainer = styled.View`
            padding: 5px 18px 18px 18px;
            `
            return (
                <Container>
                    <NavigationEvents onWillFocus={this.onWillFocus} />
                    <Animated.View style={{
                        minHeight: 60,
                        borderBottomWidth: this.state.scrolly.interpolate({
                            inputRange: [0, 50, Infinity],
                            outputRange: [0, 1.3, 1.3],
                        }),
                        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
                        width: '100%',
                        position: 'absolute',
                        top: 0
                    }}>
                        <Animated.Text style={[style.header,
                        {
                            fontSize: this.state.scrolly.interpolate({
                                inputRange: [0, 50, Infinity],
                                outputRange: [subtitle ? 23 : 23 , 17, 17]
                            }),
                            opacity: subtitle ? this.state.scrolly.interpolate({
                                inputRange: [0, 50, Infinity],
                                outputRange: [1, 0, 0]
                            }) : 1,
                        }
                        ]}>
                            {title}
                        </Animated.Text>
                        {
                            subtitle ? <Animated.Text style={[style.header, {
                                fontSize: 20,
                                position: 'absolute',
                                top: 0,
                                height: 60,
                                opacity: this.state.scrolly.interpolate({
                                    inputRange: [0, 50, Infinity],
                                    outputRange: [0, 1, 1]
                                }),
                            }]}>
                                {subtitle}
                            </Animated.Text> : undefined
                        }
                    </Animated.View>
                    <Animated.ScrollView onScroll={Animated.event([{
                        nativeEvent: {
                            contentOffset: {
                                y: this.state.scrolly
                            }
                        }
                    }], {
                        
                    })} style={{
                        top: 62
                    }} ref={ref => this.scrollView = ref._component}>
                        <ContentContainer>
                            <Content />
                        </ContentContainer>
                    </Animated.ScrollView>
                </Container>
            )
        }
    }
}
const style = StyleSheet.create({
    header: {
        fontWeight: '900',
        paddingLeft: 18,
        paddingTop: 18,
        color: 'rgba(0, 0, 0, 0.9)'
    }
})