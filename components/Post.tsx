import React from 'react';
import { View, StyleSheet } from 'react-native';
import {ListItem} from "native-base";

import {PostHeader} from './postComponents/PostHeader';
import {PostBody} from './postComponents/PostBody';
import {EventBody} from './postComponents/EventBody';

import ApiDictionary from '../constants/ApiDictionary';
import { bodyfull } from './HttpClient';


export interface Props {

    navigation: any
    data: any
    onDelete(postId: string): void
    onEdit(postId: string): void
    handlePress?: () => void
    
}

export class Post extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    state = {
        isLoading: false
    };

    handleEdit() {
        this.props.onEdit(this.props.data)
    }

    handleDelete() {
        this.deletePost() 
    }

    private deletePost() {
        if(!this.state.isLoading) {
            this.setState({isLoading:true});
            bodyfull(ApiDictionary.deletePost, {
                postId: this.props.data.postId
            }).then((data) => {
                alert("Verwijderen succesvol");
                this.setState({isLoading:false});
                this.props.onDelete(this.props.data.postId);
            }).catch(err => {
                console.log("fetch error" + err.message);
                alert(err.message);
                this.setState({isLoading:false})
            })
        }
    };

    render() {
        if (this.props.data.categoryId === 4) {
            return (
                <ListItem  key={this.props.data.postId} style={this.styles.listContainer} onPress={this.props.handlePress}>
                    <View style={this.styles.postContainer} >
                        <PostHeader
                            profileImage={this.props.data.profileImage}
                            startupImage={this.props.data.startupImage}
                            userId={this.props.data.userId}
                            category={this.props.data.categoryname}
                            categoryId={this.props.data.categoryId}
                            postDate={new Date(this.props.data.postDate)}
                            firstName={this.props.data.firstname}
                            LastName={this.props.data.lastname}
                            insertion={this.props.data.tussenvoegsel}
                            startupName={this.props.data.startupName}/>
                        <EventBody
                            text={this.props.data.text}
                            title={this.props.data.title}
                            userId={this.props.data.userId}
                            eventDate={new Date(this.props.data.date)}
                            adress={this.props.data.adress}
                            city={this.props.data.city}
                            price={this.props.data.price}
                            attendance={this.props.data.total_people}
                            evenementId={this.props.data.evenementId}
                            doesAttend={this.props.data.doesAttend}
                            postId={this.props.data.postId}
                            onEdit={this.handleEdit.bind(this)}
                            onDelete={this.deletePost.bind(this)}
                        />
                    </View>
                </ListItem>
            );
        }
        else {
            return (
                <ListItem key={this.props.data.postId} style={this.styles.listContainer}>
                    <View style={this.styles.postContainer}>
                        <PostHeader
                            profileImage={this.props.data.profileImage}
                            startupImage={this.props.data.startupImage}
                            userId={this.props.data.userId}
                            category={this.props.data.categoryname}
                            categoryId={this.props.data.categoryId}
                            postDate={new Date(this.props.data.postDate)}
                            firstName={this.props.data.firstname}
                            LastName={this.props.data.lastname}
                            insertion={this.props.data.tussenvoegsel}
                            startupName={this.props.data.startupName}/>
                        <PostBody
                            image={this.props.data.image}
                            text={this.props.data.text}
                            title={this.props.data.title}
                            userId={this.props.data.userId}
                            postId={this.props.data.postId}
                            onEdit={this.handleEdit.bind(this)}
                            onDelete={this.handleDelete.bind(this)}
                        />
                    </View>
                </ListItem>
            );
        }
    };

    styles = StyleSheet.create ({
        listContainer: {
            borderBottomWidth: 0, //important: removes auto-generated border
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
            minWidth: 200

        },
        postContainer: {
            flex: 1,
            margin: 10,
            width: '100%'
        }
    });
}




