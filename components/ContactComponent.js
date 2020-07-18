import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import info from '../shared/assignment1';
import * as Animatable from 'react-native-animatable';

const ContactInformation = (props) => {

    const contacts = info.split('\n');

    return(
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
            <Card title='Contact Information' >
                <Text style={styles.text}>
                    {contacts[9]}
                </Text>
                <Text style={styles.text}>
                    {contacts[10]}
                </Text>
                <Text style={styles.text}>
                    {contacts[11]}
                </Text>
                <Text style={styles.text}>
                    {contacts[12]}
                </Text>
                <Text style={styles.text}>
                    {contacts[13]}
                </Text>
                <Text style={styles.text}>
                    {contacts[14]}
                </Text>
            </Card>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    text: {
        margin: 10,
    }
});

export default ContactInformation;
