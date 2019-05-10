import React, {useState} from 'react'
import {Modal, TouchableWithoutFeedback, Text, StyleSheet, View, Dimensions, TouchableNativeFeedback} from 'react-native'

export const MakeModal = ({items, closeModal}) => {
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
                paddingTop: Dimensions.get('window').width - (33 * 4 + 20),
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
                            v.action()
                            closeModal()
                        }}>
                            <Text style={styles.modalItem}>{v.label}</Text>
                        </TouchableNativeFeedback>)
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal> : null
}
const styles = StyleSheet.create({
    modalItem: {
        color: 'black',
        padding: 10,
        fontSize: 13
    }
})