import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Reservation from './ReservationComponent';
import { Icon } from 'react-native-elements';

const ReservationStack = createStackNavigator();

class ReservationNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reservationScreenOptions: {
                headerStyle: {
                    backgroundColor: '#512DA8',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff',
                },
            },
            reservationNavigationOptions: {
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
            <ReservationStack.Navigator screenOptions={this.state.reservationScreenOptions}>
                <ReservationStack.Screen 
                    name='Reservation'
                    component={Reservation}
                    options={this.state.reservationNavigationOptions}
                    />
            </ReservationStack.Navigator>
        );
    }
}

export default ReservationNavigator;
