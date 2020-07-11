import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutComponent from './AboutComponent';
import { Icon } from 'react-native-elements';

const AboutStack = createStackNavigator();

class AboutNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            aboutScreenOptions: {
                headerStyle: {
                    backgroundColor: '#512DA8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                },
            },
            aboutNavigationOptions: {
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
            <AboutStack.Navigator screenOptions={this.state.aboutScreenOptions}>
                <AboutStack.Screen 
                    name='About Us' 
                    component={AboutComponent} 
                    options={this.state.aboutNavigationOptions}
                />
            </AboutStack.Navigator>
        );
    }
}

export default AboutNavigator;
