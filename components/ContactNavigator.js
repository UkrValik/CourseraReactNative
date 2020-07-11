import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactInformation from './ContactComponent';
import { Icon } from 'react-native-elements';

const ContactStack = createStackNavigator();

class ContactNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contactScreenOptions: {
                headerStyle: {
                    backgroundColor: '#512DA8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                },
            },
            contactNavigationOptions: {
                headerLeft: () => (
                    <Icon name='menu' size={24}
                        color='white'
                        onPress={() => this.props.navigation.toggleDrawer()}
                    />
                ),
            },
        }
    }

    render() {
        return(
            <ContactStack.Navigator screenOptions={this.state.contactScreenOptions}>
                <ContactStack.Screen 
                    name='Contact Us' 
                    component={ContactInformation} 
                    options={this.state.contactNavigationOptions}    
                />
            </ContactStack.Navigator>
        );
    }
}

export default ContactNavigator;
