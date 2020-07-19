import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './LoginComponent';
import { Icon } from 'react-native-elements';

const LoginStack = createStackNavigator();

class LoginNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginScreenOptions: {
                headerStyle: {
                    backgroundColor: '#512DA8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                },
            },
            loginNavigationOptions: {
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
            <LoginStack.Navigator screenOptions={this.state.loginScreenOptions}>
                <LoginStack.Screen 
                    name='Login'
                    component={Login}
                    options={this.state.loginNavigationOptions}
                    />
            </LoginStack.Navigator>
        );
    }
}

export default LoginNavigator;
