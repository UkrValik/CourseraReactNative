import React from 'react';
import Home from './HomeComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

const HomeStack = createStackNavigator();

class HomeNavigator extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            homeScreenOptions: {
                headerStyle: {
                    backgroundColor: '#512DA8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                },
            },
            homeNavigationOptions: {
                headerLeft: () => (
                    <Icon name='menu' size={24}
                        color='white'
                        onPress={() => this.props.navigation.toggleDrawer()}
                    />
                ),
            },
        };
    }

    render() {
        return(
            <HomeStack.Navigator screenOptions={this.state.homeScreenOptions}>
                <HomeStack.Screen
                    options={this.state.homeNavigationOptions}
                    name='Home'
                    component={Home} 
                />
            </HomeStack.Navigator>
        );
    }
}

export default HomeNavigator;
