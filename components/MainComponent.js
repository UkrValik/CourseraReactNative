import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ToastAndroid } from 'react-native';
// // import NetInfo from '@react-native-community/netinfo';
import MenuNavigator from './MenuNavigator';
import HomeNavigator from './HomeNavigator';
import ContactNavigator from './ContactNavigator';
import AboutNavigator from './AboutNavigator';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import ReservationNavigator from './ReservationNavigator';
import FavoriteNavigator from './FavoriteNavigator';
import LoginNavigator from './LoginNavigator';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
});

const MainNavigator = createDrawerNavigator();

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerItem
                style={{flex: 1}}
                label={() => (
                    <View style={styles.drawerHeader}>
                        <View >
                            <Image style={styles.drawerImage} source={require('./images/logo.png')} />
                        </View>
                        <View >
                            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                        </View>
                    </View>
                )}
            />
            <DrawerItemList {...props} />
        </SafeAreaView>
    </DrawerContentScrollView>
);

class Main extends Component {

    componentDidMount() {
        this.props.fetchComments();
        this.props.fetchDishes();
        this.props.fetchLeaders();
        this.props.fetchPromos();
        // NetInfo.getConnectionInfo()
            // .then((connectionInfo) => {
            //     ToastAndroid.show('Initial Network Connectivity Type: '
            //         + connectionInfo.type + ', effective Type: ' + connectionInfo.effectiveType,
            //         ToastAndroid.LONG);
            // });
        // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        // NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to WIFI!', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to cellular!', ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have an unknown connection!', ToastAndroid.LONG);
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <NavigationContainer>
                <MainNavigator.Navigator initialRouteName='Home' drawerStyle={{backgroundColor: '#D1C4E9'}} drawerContent={(props) => <CustomDrawerContentComponent {...props} />}>
                    <MainNavigator.Screen name='Login' component={LoginNavigator} options={{
                        title: 'Login',
                        drawerLabel: 'Login',
                        drawerIcon: ({ tintColor }) => (
                            <Icon 
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                color={tintColor}
                            />
                        )
                    }} />                    
                    <MainNavigator.Screen name='Home' component={HomeNavigator} options={{
                        title: 'Home',
                        drawerLabel: 'Home',
                        drawerIcon: ({ tintColor }) => (
                            <Icon 
                                name='home'
                                type='font-awesome'
                                size={24}
                                color={tintColor}
                            />
                        )
                    }} />
                    <MainNavigator.Screen name='About Us' component={AboutNavigator} options={{
                        title: 'About Us',
                        drawerLabel: 'About Us',
                        drawerIcon: ({ tintColor }) => (
                            <Icon 
                                name='info-circle'
                                type='font-awesome'
                                size={24}
                                color={tintColor}
                            />
                        )
                    }}/>
                    <MainNavigator.Screen name='Menu' component={MenuNavigator} options={{
                        title: 'Menu',
                        drawerLabel: 'Menu',
                        drawerIcon: ({ tintColor }) => (
                            <Icon 
                                name='list'
                                type='font-awesome'
                                size={24}
                                color={tintColor}
                            />
                        )
                    }}/> 
                    <MainNavigator.Screen name='Contact Us' component={ContactNavigator} options={{
                        title: 'Contact Us',
                        drawerLabel: 'Contact Us',
                        drawerIcon: ({ tintColor }) => (
                            <Icon 
                                name='address-card'
                                type='font-awesome'
                                size={22}
                                color={tintColor}
                            />
                        )
                    }}/>
                    <MainNavigator.Screen name='My Favorites' component={FavoriteNavigator} options={{
                        title: 'My Favorites',
                        drawerLabel: 'My Favorites',
                        drawerIcon: ({ tintColor }) => (
                            <Icon 
                                name='heart'
                                type='font-awesome'
                                size={24}
                                color={tintColor}
                                />
                        )
                    }}/>
                    <MainNavigator.Screen name='Reserve table' component={ReservationNavigator} options={{
                        title: 'Reserve table',
                        drawerLabel: 'Reserve table',
                        drawerIcon: ({ tintColor }) => (
                            <Icon 
                                name='cutlery'
                                type='font-awesome'
                                size={24}
                                color={tintColor}
                                />
                        )
                    }}/>
                </MainNavigator.Navigator>
            </NavigationContainer>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginLeft: -10,
    },
    drawerHeader: {
        // margin: -10,
        // marginTop: 10,
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
