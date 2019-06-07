import React from 'react'
import { StyleSheet, ScrollView, View, Text, Animated, Easing, Dimensions } from 'react-native'
import { NavigationEvents } from "react-navigation"
import styled from 'styled-components/native'

export default (Title) => (subtitle) => (headerConfig) => (Content) => {
    return class extends React.Component {
        state = {
            scrolly: new Animated.Value(0),
        }
        headerStyleControl = ({ nativeEvent: {
            contentOffset: {
                y: scrolly
            }
        } }) => {
            Animated.timing(this.state.scrolly, {
                toValue: scrolly > 10 ? 50 : 0,
                duration: 200,
                easing: Easing.out(Easing.quad)
            }).start()
        }
        goToTop = () => {
            this.scrollView.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
        }
        onWillFocus = (event) => {
            if (Title !== '홈' && event.action.type === 'Navigation/BACK') return
            this.goToTop()
        }
        render() {
            const Container = styled.View`
            background-color: white;
            padding-bottom: 79px;
            min-height: ${Dimensions.get('window').height - 60};
            `
            const ContentContainer = styled.View`
            
            `
            const defaultedHeaderConfig = Object.assign({
                shadow: true,
                height: []
            }, headerConfig)
            return (
                <Container>
                    <NavigationEvents onWillFocus={this.onWillFocus} />
                    <Animated.View style={{
                        minHeight: 60,
                        borderBottomWidth: defaultedHeaderConfig.shadow ? this.state.scrolly.interpolate({
                            inputRange: [0, 50, Infinity],
                            outputRange: [0, 1.3, 1.3],
                        }) : 0,
                        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
                        width: '100%',
                    }}>
                        {typeof Title == 'string' ? <Animated.Text style={[style.header,
                        {
                            fontSize: this.state.scrolly.interpolate({
                                inputRange: [0, 50, Infinity],
                                outputRange: [23, 17, 17]
                            }),
                        }
                        ]}>{Title}</Animated.Text> : Title(this.state.scrolly)}
                    </Animated.View>
                    <Animated.ScrollView onScroll={Animated.event([{
                        nativeEvent: {
                            contentOffset: {
                                y: this.state.scrolly
                            }
                        }
                    }], {

                        })}
                        ref={ref => {
                            this.scrollView = ref?._component
                        }}
                        style={{
                            padding: 18,
                            paddingTop: 5,
                        }}>
                            <Content goToTop={this.goToTop} />
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