import React, {useState} from 'react'
import {Modal, TouchableWithoutFeedback, Text, StyleSheet} from 'react-native'


export const MakeModal = () => {
    const [isVisible, setVisibleState] = useState(true)
    return isVisible ? <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
            setVisibleState(false)
        }}
    >
        <TouchableWithoutFeedback onPress={() => {
            setVisibleState(false)
        }}>
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
                    <Text style={styles.modalItem}>신고</Text>
                    <Text style={styles.modalItem}>신고</Text>
                    <Text style={styles.modalItem}>신고</Text>
                    <Text style={styles.modalItem}>신고</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal> : undefined
}
StyleSheet.create({
    modalItem: {
        color: 'black',
        padding: 10,
        fontSize: 13
    }
})