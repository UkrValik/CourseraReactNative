import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from './FavoriteComponent';
import { Icon } from 'react-native-elements';

const FavoriteStack = createStackNavigator();

class FavoriteNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favoriteScreenOptions: {
                headerStyle: {
                    backgroundColor: '#512DA8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                },
            },
            favoriteNavigationOptions: {
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
            <FavoriteStack.Navigator screenOptions={this.state.favoriteScreenOptions}>
                <FavoriteStack.Screen 
                    name='My Favorites'
                    component={Favorites}
                    options={this.state.favoriteNavigationOptions}
                    />
            </FavoriteStack.Navigator>
        );
    }
}

export default FavoriteNavigator;
