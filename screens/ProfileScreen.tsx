import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';
import {bodyfull} from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";
import {PostModel} from "../models/PostModel";
import {List} from "native-base";
import {Post} from "../components/Post";

export interface Props {
    userId: number
}

export default class ProfileScreen extends React.Component<any, any> {

    state = {
        isLoading: false,
        blogs: []
    };

    constructor (props: Props) {
        super(props);
    }

    componentDidMount() {
        this.getBlogs()
    }

    render() {
        return(
            <View>
                {/* TODO: Tab-specific content on top*/}

                {/*separator:*/}
                <View style={this.styles.separator} />

                <List
                    dataArray={this.state.blogs}
                    renderRow={(item) => {
                        return <Post data={item}/>
                    }}
                />
            </View>
        );
    }

    //options for header bar. Default options are in the navigator.
    navigationOptions = {
        headerTitle: 'Profiel'
    };

    getBlogs = () => {
        console.log("hier 1");
        if (!this.state.isLoading) {
            this.setState({isLoading:true});

            bodyfull(ApiDictionary.getUserBlogs, {
                userId: 1
            })
                .then(
                    (result: {data: Array<PostModel>}) => {
                        console.log("hier 3: " + result);
                        console.log("result.data: " + result.data.toString());
                    this.setState({blogs: result.data})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            return null;
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
        separator: {
            borderBottomColor: '#747474',
            borderBottomWidth: 1,
            marginHorizontal: 15,
            marginVertical: 15
        }
    });
}
