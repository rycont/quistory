import React from 'react'
import { StyleSheet, ScrollView, View, Text, Animated, Easing, Dimensions, TouchableNativeFeedback } from 'react-native'
import { NavigationEvents } from "react-navigation"
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default (Title) => (subtitle) => (icons = []) => (headerConfig) => (Content) => {
    return class extends React.Component {
        state = {
            scrolly: new Animated.Value(0),
            data: {
                currentPage: Number(0)
            }
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
        componentDidUpdate() {
            console.log(this.state.data)
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
            const IconsContainer = styled.View`
            margin: 18px;
            margin-right: 30px;
            flex-direction: row-reverse;
            flex: 1;
            `
            const TopIcon = styled(Icon)`
                margin-right: 10px;
                margin-top: 5px;
            `
            const defaultedHeaderConfig = Object.assign({
                shadow: true,
                height: []
            }, headerConfig)
            return (
                <Container>
                    {/* 제목영역 */}
                    <NavigationEvents onWillFocus={this.onWillFocus} />
                    <Animated.View style={{
                        minHeight: 60,
                        borderBottomWidth: defaultedHeaderConfig.shadow ? this.state.scrolly.interpolate({
                            inputRange: [0, 50, Infinity],
                            outputRange: [0, 1.3, 1.3],
                        }) : 0,
                        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
                        width: '100%',
                        flexDirection: 'row',
                    }}>
                        {typeof Title == 'string' ? <Animated.Text style={[style.header,
                        {
                            fontSize: this.state.scrolly.interpolate({
                                inputRange: [0, 50, Infinity],
                                outputRange: [23, 17, 17]
                            }),
                            paddingTop: 19,
                        }
                        ]}>{Title}</Animated.Text> : Title(this.state.scrolly, this.state.data, (key, value) => this.setState(() => ({
                            data: {
                                [key]: value
                            }
                        })))}
                        
                        <IconsContainer>
                        {icons.map(x => <TouchableNativeFeedback onPress={x.action} key={encodeURI()} hitSlop={{
                            top: 10,
                            left: 10,
                            right: 10,
                            bottom: 10
                        }}>
                            <TopIcon name={x.name} size={20} />
                        </TouchableNativeFeedback>)}    
                        </IconsContainer>
                    </Animated.View>
                    
                    {/* 본문영역 */}

                    <Animated.ScrollView onScroll={Animated.event([{
                        nativeEvent: {
                            contentOffset: {
                                y: this.state.scrolly
                            }
                        }
                    }], {

                        })}
                        ref={ref => {
                            this.scrollView = ref ?._component
                        }}
                        style={{
                            padding: typeof Title === 'string' ? 18 : 0,
                            paddingTop: 5,
                        }}>
                        <Content
                            style={{paddingBottom: 18}}
                            goToTop={this.goToTop}
                            commonState={this.state.data}
                            setCommonState={(key, value) => this.setState(() => ({
                                data: {
                                    [key]: value
                                }
                            }))}
                        />
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