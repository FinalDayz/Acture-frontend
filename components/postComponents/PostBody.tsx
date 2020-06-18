import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';

import colors from '../../constants/colors';

import {User} from '../../models/User';
import {UserRole} from "../../models/UserRole";
import ApiDictionary from '../../constants/ApiDictionary';
import { bodyfull } from '../HttpClient';

import {Ionicons} from '@expo/vector-icons';
import {shouldThrowAnErrorOutsideOfExpo} from "expo/build/environment/validatorState";


export interface Props {
    title: string
    text: string
    userId: string
    postId: string
    onClickEdit: () => void
    onDelete(): void
}

export class PostBody extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    state = {
        isLoading: false
    };

    deletePost() {
        console.log("id here 1: " + this.props.postId);
        this.props.onDelete();
    }

    render() {
        return(
            <View style={this.styles.body}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={this.styles.title} >{this.props.title}</Text>
                    { (User.getRole() === UserRole.admin || User.getUserId().toString() == this.props.userId) &&
                        <Ionicons
                            name='md-more'
                            size={27}
                            color="black"
                            style={this.styles.icon}
                            onPress={() => {this.options()}}/>
                    }
                </View>
                <Text style={this.styles.bodyText} >{this.props.text}</Text>
            </View>
        );
    }

    
    
    options(){
        Alert.alert(
            'Wat wilt U doen',
            '',
            [
                {
                    text: 'Wijzigen',
                    onPress:()=> this.props.onClickEdit()
                },
                {
                    text: 'Verwijderen',
                    onPress: () => this.deletePost()
                }
            ],
            { cancelable: true }
        );
    }

    createConfirmAlert() {
        Alert.alert(
            'Klik op verwijderen om te bevestigen.',
            '',
            [
                {
                    text: 'Annuleren',
                    style: "cancel"
                },
                {
                    text: 'Verwijderen',
                    onPress: () => this.deletePost(),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    }
    

    styles = StyleSheet.create ({
        body: {
            flex: 1,
            backgroundColor: colors.postBody,
            width: '100%',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 30
        },
        title: {
            marginHorizontal: 15,
            marginVertical: 10,
            flex: 16,
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.textPostTitle
        },
        icon: {
            flex: 1,
            marginVertical: 8,
            marginHorizontal: 15
        },
        bodyText: {
            marginHorizontal: 15,
            fontSize: 15,
            color: colors.textPostContent
        }
    });
}
