import React from 'react';
import { View, StyleSheet, ScrollView, PanResponder, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import colors from '../constants/colors';
import Image from 'react-native-scalable-image';

const windowWidth = Dimensions.get('window').width;

export default function LoginScreen() {
    
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

                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Email..."
                                    placeholderTextColor="#003f5c"
                                    //onChangeText={text => this.setState({email:text})}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    secureTextEntry
                                    style={styles.inputText}
                                    placeholder="Password..."
                                    placeholderTextColor="#003f5c"
                                    //onChangeText={text => this.setState({password:text})}
                                    />
                            </View>

                            <TouchableOpacity
                                style={styles.loginBtn}
                                //onPress={this._attemptLogin}
                                >
                                <Text style={styles.loginText}>Log in</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.RegisterText}>Account aanmaken</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.forgot}>Wachtwoord vergeten</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>     
            </ScrollView>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary,
        },
        contentContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: 'center',
        },

        inputView:{
            width:"80%",
            backgroundColor:colors.inputfieldLight,
            borderRadius:3,
            height:50,
            marginBottom:25,
            justifyContent:"center",
            padding: 24,
        },
        inputText:{
            height:50,
            color:"white"
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
    