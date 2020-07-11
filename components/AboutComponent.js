import React from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import info from '../shared/assignment1';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        leaders: state.leaders,
    }
}

const History = () => {

    const history = info.split('\n');

    return(
        <Card title='Our History'>
            <Text style={{margin: 10}}>
                {history[3] + '\n\n'}
                {history[5]}
            </Text>
        </Card>
    );
}

class AboutComponent extends React.Component {

    render() {
        
        const renderLeaderItem = ({item, index}) => {
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: { uri: baseUrl + item.image }}}
                />
            );
        }

        return(
            <ScrollView style={{flex: 1}}>
                <History />
                <Card title='Corporate Leadership'>
                    <FlatList
                        data={this.props.leaders.leaders}
                        renderItem={renderLeaderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(AboutComponent);
