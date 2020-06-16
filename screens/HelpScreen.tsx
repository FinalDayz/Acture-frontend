import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import {bodyfull} from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import {PostModel} from '../models/PostModel';
import { Post } from '../components/Post';
import { NewPostButton } from '../components/NewPostButton';

export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    data: PostModel[],
    offset: number
}

export default class HelpScreen extends React.Component<Props, State> {

    state: State;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            data: [],
            isLoading: false,
            offset: 0
        }
    }

    componentDidMount() {
        this.getGuides()
    }

    getGuides() {
        if(!this.state.isLoading) {
            
            this.setState({isLoading:true}, () => {
                bodyfull(ApiDictionary.getGuides, {
                    offs: this.state.offset //offset for loading more posts
                })
                .then(
                    (result: {data:Array<PostModel>}) => {
                        this.setState({
                            isLoading: false,
                            data: result.data
                        })
                    })
                .catch ((error) => {
                    console.log(error);
                })
            })
        }
    }

    handleDelete(postId: string) {
        console.log("helemaal hier: ");
        const newData = this.state.data.filter(
            (post) => post.postId.toString() !== postId
        );

        this.setState({
            data: newData
        })
    };

    render() {
        return(
            <View style={this.styles.screen}>
                <NewPostButton onPress={() => this.props.navigation.navigate('PostAddScreen')} />
                {this.state.isLoading ? (
                    <View style={this.styles.loading}>
                        <ActivityIndicator size="large" color={colors.primary}/>
                    </View>
                    ) : null}
                <View style={this.styles.scrollable}>
                <FlatList
                        refreshing={false}
                        onRefresh={() => this.getGuides()}
                        contentContainerStyle={this.styles.list}
                        data={this.state.data}
                        keyExtractor={(item, index) => item.postId.toString()}
                        renderItem={itemData =>
                            <Post
                                data={itemData.item}
                                onDelete={this.handleDelete}
                            />
                        }
                    />
                </View>
            </View>
        );
    }


    //options for header bar. Default options are in the navigator.
    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Guides',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                    title='profile'
                    iconName='md-person' //TODO: change to profile picture
                    onPress={() => {
                        navData.navigation.navigate('Profile');
                    }}/>
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title='menu'
                        iconName='md-menu'
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }} 
                    />
                </HeaderButtons>
            )
        }
    };

    styles = StyleSheet.create ({
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            backgroundColor: colors.backgroundPrimary
        },
        scrollable: {
            flex: 1,
            width: '100%',
            height: '100%'
        },
        loading: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        list: {
            width: '100%',
        }
    });
}    