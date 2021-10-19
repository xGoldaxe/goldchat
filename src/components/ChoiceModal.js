import React, { useRef } from 'react'
import { Modal, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Animated, FlatList } from 'react-native'
import { DARK_GREY, MODALBG } from '../environement'
import GenderMale from '../../assets/genderMale.svg';
import GenderFemale from '../../assets/genderFemale.svg';
import GenderOther from '../../assets/genderOther.svg';

const FadeInView = ({ children, style, duration }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(
        fadeAnim,
        {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
        }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View                 // Special animatable View
        style={{
            ...style,
            opacity: fadeAnim,         // Bind opacity to animated value
        }}
        >
        {children}
        </Animated.View>
    );
}

function choice(onChoose, closeModal) {
    return (function Choice({ item }) {
        const { value, image } = item;
    
        function onPress() {
            onChoose(value);
            closeModal();
        }
        
        return (
            <TouchableOpacity 
                style={styles.modal__choice}
                onPress={onPress}
            >
                {image && <View style={styles.modal__choice__image}>
                    {image}
                </View> }
                <Text style={styles.modal__choice__text}>
                    {value}
                </Text>
            </TouchableOpacity>
        )
    })
}


export default function ChoiceModal({ setFocus, title, choices, onChoose }) {
    function closeModal() {
        setFocus(false);
    }

    const setupChoice = choice(onChoose, closeModal)

    return (
        <View style={styles.modal}>
            <Modal
                transparent={true}
                onRequestClose={closeModal}
            >
                <FadeInView 
                    style={styles.modal__background}
                    duration={2}
                ></FadeInView>
                <View style={styles.modal__box}>
                    <Text style={styles.modal__title}>{title}</Text>
                    <View style={styles.modal__box__choices}>
                            <FlatList 
                                data={choices}
                                renderItem={setupChoice}
                                keyExtractor={item => item.value}
                            />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: 200
    },
    modal__background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: MODALBG,
    },
    modal__box: {
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15
    },
    modal__choice: {
        flexDirection: 'row',
        paddingVertical: 7,
        alignItems: 'center',
    },
    modal__box__choices: {
        marginVertical: 15
    },
    modal__choice__image: {
        width: 32,
        height: 32
    },
    modal__title: {
        fontSize: 20,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderColor: DARK_GREY,
        paddingVertical: 5
    },
    modal__choice__text: {
        fontSize: 23,
    },
    modal__choice__image: {
        paddingHorizontal: 15,
    }
})
