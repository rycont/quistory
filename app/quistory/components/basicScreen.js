import React from 'react'
import { StyleSheet, ScrollView, View, Text, Animated, Easing } from 'react-native'
import { NavigationEvents } from "react-navigation"

export default (title) => (subtitle) => (Content) => {
    return class extends React.Component {
        state = {
            scrolly: new Animated.Value(0),
            hideTitle: Boolean(false),
            isHeaderMinimized: Boolean(false)
        }
        headerStyleControl = ({nativeEvent: {
            contentOffset: {
                y: scrolly
            }
        }}) => {
            Animated.timing(this.state.scrolly, {
                toValue: scrolly > 50 ? 50 : scrolly,
                duration: 20,
                easing: Easing.linear
            }).start()
        }
        onWillFocus = () => {
            this.refs.scrollView.scrollTo({
                x: 0,   
                y: 0,
                animated: true
            })
        }
        hideTitle = () => {
            this.setState(() => ({
                hideTitle: true
            }))
        }
        showTitle = () => {
            this.setState(() => ({
                hideTitle: false
            }))
        }
        render() {
            return (
                <View style={style.cutNavArea}>
                    <NavigationEvents onWillFocus={this.onWillFocus} />
                    <Animated.View style={{
                        minHeight: 60,
                        elevation: this.state.scrolly.interpolate({
                            inputRange: [20, 50],
                            outputRange: [0, 3]
                        }),
                        backgroundColor: this.state.scrolly.interpolate({
                            inputRange: [0, 50],
                            outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                        }),
                        width: '100%',
                        position: 'absolute',
                        top: 0
                    }}>
                        <Animated.Text style={[style.header,
                        {
                            fontSize: this.state.scrolly.interpolate({
                                inputRange: [0, 50],
                                outputRange: [27, 17]
                            }),
                            opacity: subtitle ? this.state.scrolly.interpolate({
                                inputRange: [0, 50],
                                outputRange: [1, 0]
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
                                    inputRange: [0, 50],
                                    outputRange: [0, 1]
                                }),
                            }]}>
                                {subtitle}
                            </Animated.Text> : undefined
                        }
                    </Animated.View>
                    <ScrollView onScroll={this.headerStyleControl} style={{
                        top: 60
                    }} ref="scrollView">
                        <View style={style.container}>
                            <Content hideTitlebar={this.hideTitle} showTitlebar={this.showTitle} scrollHeight={this.refs.scrollView?.scrollHeight} />
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}
const style = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        color: '#546D84',
        paddingLeft: 18,
        paddingTop: 18,
    },
    container: {
        padding: 18,
    },
    cutNavArea: {
        backgroundColor: '#F5FBFF',
        paddingBottom: 60
    }
})