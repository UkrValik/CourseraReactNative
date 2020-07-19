import React from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as Animatable from 'react-native-animatable';

class Reservation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            datePickerVisible: false,
            showModal: false,
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    resetForm = () => {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
        });
    }

    handleReservation = () => {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your reservation OK?',
            'Number of guests: ' + this.state.guests + '\nSmoking? ' + this.state.smoking + '\nData and Time: ' + this.state.date.toString(),
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => this.resetForm(),
                },
                {
                    text: 'OK',
                    onPress: () => this.resetForm(),
                },
            ],
            { cancelable: false }
        );
    }

    handleDatePicked = (date) => {
        this.setState({ date: date.toString() });
        this.hideDatePicker();
    }

    hideDatePicker = () => {
        this.setState({ datePickerVisible: false });
    }

    showDatePicker = () => {
        this.setState({ datePickerVisible: true });
    }

    render() {

        const DateAndTime = () => {
            if (this.state.date) {
                return(
                    <Text 
                        style={{
                            flex: 2, 
                            paddingHorizontal: 10, 
                            color: 'white', 
                            backgroundColor: '#512DA8', 
                            textAlign: 'center',
                            paddingVertical: 5,
                        }}
                        onPress={() => this.showDatePicker()}
                        >
                        {this.state.date}
                    </Text>
                );
            } else {
                return(
                    <Text 
                        style={{
                            flex: 2, 
                            paddingHorizontal: 10, 
                            color: 'white', 
                            backgroundColor: '#512DA8', 
                            textAlign: 'center',
                            paddingVertical: 5,
                        }}
                        onPress={() => this.showDatePicker()}
                        >
                        select date and time
                    </Text>
                );
            }
        }

        return(
            <ScrollView>
                <Animatable.View animation='zoomIn' duration={2000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                            >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor='#512DA8'
                            onValueChange={(value) => this.setState({ smoking: value })}
                            >

                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DateAndTime />
                        <DateTimePicker
                            mode='datetime'
                            minimumDate={new Date('2020-01-01')}
                            isVisible={this.state.datePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDatePicker}
                            onPress={() => this.showDatePicker()}
                            />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            title='Reserve'
                            color='#512DA8'
                            onPress={() => this.handleReservation()}
                            accessibilityLabel='Learn more about this purple button'
                            />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    },
});

export default Reservation;
