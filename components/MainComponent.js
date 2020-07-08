import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

class Main extends Component {

    constructor() {
        super();
        
        this.state = {
            homeNavigationOptions: {
                headerStyle: {
                    backgroundColor: '#512DA8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                },
            },
            menuNavigationOptions: {
                headerStyle: {
                    backgroundColor: '#512DA8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                },
            },
        }
    }

    menuNavigatorComponent = () => {
        return (
            <MenuNavigator.Navigator initialRouteName='Menu' screenOptions={this.state.menuNavigationOptions}>
                <MenuNavigator.Screen 
                    name='Menu'
                    component={Menu}
                />
                <MenuNavigator.Screen 
                    name='Dishdetail'
                    component={Dishdetail}
                />
            </MenuNavigator.Navigator>
        );
    }

    homeNavigatorComponent = () => {
        return(
        <HomeNavigator.Navigator screenOptions={this.state.homeNavigationOptions}>
                <HomeNavigator.Screen 
                    name='Home'
                    component={Home} 
                />
            </HomeNavigator.Navigator>
        );
    }

    render() {
        return (
            <NavigationContainer>
                <MainNavigator.Navigator>
                    <MenuNavigator.Screen name='Home' component={this.homeNavigatorComponent} />
                    <MenuNavigator.Screen name='Menu' component={this.menuNavigatorComponent} />                    
                </MainNavigator.Navigator>
            </NavigationContainer>
        );
    }
}
  
export default Main;
