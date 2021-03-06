
import React from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';

import colors from '../constants/colors';
import Image from 'react-native-scalable-image';
import ApiDictionary from '../constants/ApiDictionary';
import { bodyfull } from '../components/HttpClient';
import {User} from "../models/User";

const windowWidth = Dimensions.get('window').width;

export default class LoginScreen extends React.Component<{navigation:any}> {
    static navigationOptions = {
        title: ''
    };

    _isMounted: boolean;

    constructor(navigation: Readonly<{ navigation: any; }>) {
        super(navigation);
        this._isMounted = false;
    }

    state={
        email:"",
        password:"",
        isLoading: false,
        show: false,
        wrongInputs: false
    };

    resetLogin() {
        this.state.email = "";
        this.state.password = "";
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    ShowHideComponent = () => {
        if (this.state.show) {
          this.setState({ show: false });
        } else {
          this.setState({ show: true });
        }
      };

    login = () => {
        this.setState({isLoading:true});
            bodyfull(ApiDictionary.login, {'password': this.state.password, 'email': this.state.email}).then((data) => {
                User.setLoggedInUser(data.user);
                if(data.success === 1) {
                    this.setState({isLoading:false});
                    this.state.wrongInputs = false;
                    this.props.navigation.navigate('Home');
                } else {
                    this.state.wrongInputs = true;
                    this.setState({isLoading:false})
                }
            }).catch(err => {
                this.setState({isLoading:false})
            });

        this._isMounted && this.setState({
            ready: true
        })
    };

    openRegisterScreen = () => {
        this.props.navigation.navigate('Register');
    };

    openChangePasswordScreen = () => {
        this.props.navigation.navigate('ChangePassword');
    };

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.contentContainer}>
                            <View style={{marginBottom: 80}}>
                                {/* not a normal Image object, documentation found in: https://www.npmjs.com/package/react-native-scalable-image */}
                                <Image
                                width={windowWidth * 0.8}
                                source={require('../assets/LGS_LOGO_WIT.png')}/>
                            </View>

                            <View>
                            {this.state.wrongInputs ? (
                               <Text style={styles.warningTest}>Verkeerde email of password</Text>
                                ) : null}
                            </View>
                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Email..."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({email:text})}
                                    />
                            </View>

                            <View>
                            {this.state.wrongInputs ? (
                               <Text style={styles.warningTest}>Verkeerde email of password</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    secureTextEntry
                                    style={styles.inputText}
                                    placeholder="Wachtwoord..."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({password:text})}
                                    />
                            </View>

                            {!this.state.isLoading ? (
                                <TouchableOpacity
                                    style={styles.loginBtn}
                                    onPress={this.login}
                                    >
                                    <Text style={styles.loginText}>Log in</Text>
                                </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                    style={styles.loginBtn}
                                    >
                                    <ActivityIndicator size="large" color={colors.textLight}/>
                                    </TouchableOpacity>
                                )}

                            <TouchableOpacity
                                onPress={this.openRegisterScreen}
                                >
                                <Text style={styles.RegisterText}>Account aanmaken</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.openChangePasswordScreen}
                                >
                                <Text style={styles.forgot}>Wachtwoord veranderen</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    warningTest: {
        marginBottom: 6,
        color: "red",
        fontSize: 12
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    inputView:{
        width:"80%",
        backgroundColor:colors.postBody,
        borderRadius:3,
        height:50,
        marginBottom:25,
        justifyContent:"center",
        padding: 24
    },
    inputText:{
        height:50,
        color:"black"
    },
        textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    forgot:{
        color:"white",
        fontSize:11,
        textDecorationLine: "underline"
    },
    loginBtn:{
        width:"50%",
        backgroundColor: colors.primaryLight,
        borderRadius:8,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:60
    },
    loginText:{
        color:"white"
    },
    RegisterText:{
        color:"white",
        marginBottom: 20,
        textDecorationLine: "underline"
    },
});
