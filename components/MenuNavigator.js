import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { Icon } from 'react-native-elements';

const MenuStack = createStackNavigator();

class MenuNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuScreenOptions: {
                headerStyle: {
                    backgroundColor: '#512DA8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                },
            },
            menuNavigationOptions: {
                headerLeft: () => (
                    <Icon name='menu' size={24}
                        color='white'
                        onPress={() => this.props.navigation.toggleDrawer()} 
                    />
                )
            },
        };
    }

    render() {
        return(
            <MenuStack.Navigator initialRouteName='Menu' screenOptions={this.state.menuScreenOptions}>
                <MenuStack.Screen
                    options={this.state.menuNavigationOptions}
                    name='Menu'
                    component={Menu}
                />
                <MenuStack.Screen 
                    name='Dishdetail'
                    component={Dishdetail}
                />
            </MenuStack.Navigator>
        );
    }
}

export default MenuNavigator;
