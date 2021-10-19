import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Title from './Title'

export default function Counter({ time, NextComp }) {
    const [seconds, setSeconds] = useState(time)

    useEffect(() => {
        setSeconds(time)
    }, [time])

    return (
        <>
            {seconds > 0 ? <Counting seconds={seconds} setSeconds={setSeconds} /> :
            !NextComp ? <Counting seconds={seconds} setSeconds={setSeconds} /> :
            NextComp
            }
        </>
    )
}

function Counting({ seconds, setSeconds }) {

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => {
                if (seconds <= 0) {
                    clearInterval(interval);
                    return (0);
                }
                return (seconds - 1);
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Title size={3}>{seconds}</Title>
    )
}

const styles = StyleSheet.create({})
