import React from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import info from '../shared/assignment1';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class ContactInformation extends React.Component {

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['krasniukevich@gmail.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern:',
        });
    }
    
    render() {    

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
                    <Button
                        title='Send Email'
                        color='#512DA8'
                        icon={<Icon name='envelope-o' type='font-awesome' color='#fff' />}
                        onPress={() => this.sendMail()}
                        />
                </Card>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        margin: 10,
    }
});

export default ContactInformation;
