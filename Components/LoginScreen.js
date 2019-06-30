import React from  'react'
import {View,ImageBackground, StyleSheet, AsyncStorage, Alert, TouchableOpacity, Text, KeyboardAvoidingView} from 'react-native'
import { Form, Item, Input, Icon } from 'native-base';
import FormData from 'FormData';
var data = new FormData();
import axios from 'axios';
import { Button } from 'react-native-elements';


let focuss = 0;

const styles = StyleSheet.create({
    containers:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    container:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    absss:{
        position: "absolute",
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.7)"
    },
    cover: {
        height: 270,
    },
    icon:{
        marginRight: 10,
        color:  '#f30706',
    },
    img:{
        marginTop: 10,
        borderRadius:100,
        width:100,
        height:100,
        shadowColor: '#d4351d',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        padding: 10,
    },
    block:{
        flex: 3,
        padding: 20,
    },
    intents:{
        flex:1,
        paddingTop: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    intentss:{
        flex:1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    intent:{
        flex:1,
        justifyContent: 'flex-end',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    foot:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input:{marginBottom: 20, marginTop: 10},
    ic:{
        width: 35,
        height: 35,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    hor:{
        marginTop: 10,
        flexDirection: 'row',
    }

})

export default class  LoginScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {user: '', pass:'', isValid: false, Unrempli: true, isLoad: false}
    }



    signup(){
        this.props.navigation.navigate('SignUp');
    }
   tcheck() {
        this.setState({isLoad: true})
       const ele = {
           user: this.state.user,
           pass: this.state.pass
       };
       axios.post(`http://137.74.116.91:2037/JillCantine/login`, ele )
           .then((res) => {
               if(res.data.info !== null){
                   const info = res.data.info;
                   const users = info.name + ' ' + info.firstname;
                   AsyncStorage.setItem("id", info._id);
                   AsyncStorage.setItem("ecole", info.schoolValue);
                   AsyncStorage.setItem("user", users).then((result) => {
                       this.setState({isLoad: false, Unrempli: false});
                       focuss = 1;
                       this.props.navigation.navigate('Home');
                   }).catch((err) => {
                       Alert.alert("Probleme de Connexion. Veillez verifier votre connexion")
                       this.setState({isLoad: false, Unrempli: false});
                       focuss = 1;
                   });
               }
               else{
                   Alert.alert("Mot de passe Ou Nom Incorrect")
                   this.setState({isLoad: false, Unrempli: false});
                   focuss = 1;
               }
           }).catch((err)=>{
               console.log("err \n" +err)
       })

    }
    _validate(text){
            this.setState({user:text})
    }
    _validateP(text){
        this.setState({pass:text});

    }
    render(){

        return(
            <View style={styles.containers}>
                <ImageBackground source={require('../assets/img/ig.jpg')} style={styles.container}>
                <View style={styles.absss}>
                    <View style={styles.block}>
                        <View style={styles.intents}>
                            <Text style={{color: "#fff", marginTop: 30, fontSize: 40, textAlign: 'center' }}>JIL CANTINE</Text>
                            <Text style={{color: "#bbb", marginTop: 10, fontSize: 15, textAlign: 'center' }}>Votre Quantine, Partout, Avec Vous</Text>
                        </View>
                        <KeyboardAvoidingView style={styles.intent} behavior="padding" enabled>
                            <Form>
                                <Item rounded>
                                    <Icon active name='ios-people' style={{color : "#fff", marginRight:25}} />
                                    <Input placeholder='votre nom' style={{color:"#fff"}} blurOnSubmit={false} keyboardType="email-address"  onChangeText={(test)=>{this._validate(test)}} />
                                </Item>
                                <View style={{marginTop:20}}>
                                    <Item rounded>
                                        <Icon active name='ios-lock' style={{color : "#fff", marginRight:27}} />
                                        <Input placeholder='votre mot de passe' style={{color:"#fff"}} blurOnSubmit={true} onChangeText={(test)=>{this._validateP(test)}} secureTextEntry />
                                    </Item>
                                </View>
                            </Form>
                        </KeyboardAvoidingView>
                    </View>
                    <View style={styles.intent}>
                        <Button loading={this.state.isLoad} title="Connexion" buttonStyle={{width: '90%', borderRadius: 5, backgroundColor:'#f30706', margin: 20}} onPress={()=>{this.tcheck()}}  />
                        <View style={{height:40, width: "100%", alignItems:"center"}}>
                            <TouchableOpacity onPress={()=>{console.log('Mot de passe Oublié')}}>
                                <Text style={{textDecorationStyle: "dashed", color: "#fff", marginLeft: 120}}>Mot de passe Oublié !!!</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.intentss}>
                        <Button title="Inscription" buttonStyle={{width: '100%', borderRadius: 5, backgroundColor:'#242422', marginTop: 15}} onPress={()=>{this.signup()}} />
                    </View>
                </View>

            </ImageBackground>
            </View>

        );
    }
}
