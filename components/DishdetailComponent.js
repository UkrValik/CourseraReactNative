import React from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (id, dishId, rating, author, comment) => dispatch(postComment(id, dishId, rating, author, comment)),
});

function RenderDish(props) {
    
    const dish = props.dish;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -200)
            return true;
        else
            return false;
    }
    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites' + '?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already Favorite') : props.onPress(),
                        }
                    ],
                    { cancelable: false }
                ); 
            return true;
        }
    });

    if (dish != null) {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}
                {...panResponder.panHandlers}
                >
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                >
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.icons}>
                        <Icon 
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o' }
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already Favorite') : props.onPress()}
                            />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.setModalVisible(true)}
                            />
                    </View>
                </Card>
            </Animatable.View>
        )
    } else {
        return (
            <View></View>
        )
    }
}

function RenderComments(props) {
    const comments = props.comments;
    
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>
                    {item.comment}
                </Text>
                <Rating 
                    style={{alignSelf: 'flex-start'}}
                    ratingCount={5}
                    imageSize={12}
                    readonly={true}
                    startingValue={item.rating}
                    />
                <Text style={{fontSize: 12}}>
                    {'-- ' + item.author + ', ' + item.date}
                </Text>
            </View>
        );
    }

    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            author: '',
            comment: '',
            rating: 5,
        };
    }

    resetState = () => {
        this.setState({
            author: '',
            comment: '',
            rating: 5,
        });
    }

    setAuthor = (author) => {
        this.setState({ author: author });
    }

    setComment = (comment) => {
        this.setState({ comment: comment });
    }

    setRating = (rating) => {
        this.setState({ rating: rating });
    }

    setModalVisible = (modalVisible) => {
        this.setState({ modalVisible: modalVisible });
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleComment = () => {
        if (this.state.author && this.state.comment && this.state.rating) {
            const id = this.props.comments.comments.length;
            this.props.postComment(
                id,
                this.props.route.params.dishId,
                this.state.rating,
                this.state.author,
                this.state.comment
                );
            this.setModalVisible(false);
            this.resetState();
        }
    }

    static navigationOptions = {
        title: 'Dish Details',
    };

    render() {
        const dishId = this.props.route.params.dishId;
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    setModalVisible={this.setModalVisible}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    visible={this.state.modalVisible}
                    animationType='slide'
                    transparent={false}
                    >
                    <View style={styles.modal}>
                        <Rating 
                            ratingCount={5}
                            minValue={1}
                            imageSize={50}
                            startingValue={5}
                            showRating={true}
                            onFinishRating={(rating) => this.setRating(rating)}
                            />
                        <Input
                            leftIcon={() => (<Icon name='user-o' type='font-awesome'/>)}
                            placeholder='Author'
                            onChangeText={(text) => this.setAuthor(text)}
                            />
                        <Input
                            placeholder='Comment'
                            leftIcon={() => (<Icon name='comment-o' type='font-awesome'/>)}
                            onChangeText={(text) => this.setComment(text)}
                            />
                        <View style={styles.button}>
                            <Button
                                key={1}
                                title='Submit'
                                color='#512DA8'
                                onPress={() => this.handleComment()}
                                />
                        </View>
                        <View style={styles.button}>
                            <Button    
                                key={2}
                                title='Cancel'
                                color='grey'
                                onPress={() => {this.setModalVisible(false); this.resetState();}}
                                />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    icons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    button: {
        margin: 10,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
