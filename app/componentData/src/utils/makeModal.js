import React, {useState} from 'react'
import {Modal, TouchableWithoutFeedback, Text, StyleSheet, View, Dimensions, TouchableNativeFeedback} from 'react-native'
import styled from 'styled-components/native'

export const MakeModal = ({items, closeModal}) => {
    const ModalItem = styled.Text`
    color: black;
    padding: 10px;
    font-size: 13px;
    `
    console.log('모달 만들어짐')
    return items.length !== 0 ? <Modal
        visible={true}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
    >
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                height: Dimensions.get('window').height,
                paddingTop: Dimensions.get('window').width - (33 * (items.length + 1) + 20),
            }}>
                <View style={{
                    backgroundColor: 'white',
                    maxWidth: 300,
                    marginLeft: (Dimensions.get('window').width - 300) / 2,
                    borderRadius: 10,
                    padding: 10
                }}>
                    {
                        items.map((v, i) => <TouchableNativeFeedback key={escape(v.label)} onPress={() => {
                            v.action?.()
                            console.log('클릭됨')
                            closeModal()
                        }}>
                            <ModalItem>{v.label}</ModalItem>
                        </TouchableNativeFeedback>)
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal> : null
}