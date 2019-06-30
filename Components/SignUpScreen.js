import React from  'react'
import {View, ImageBackground, StyleSheet, Text, AsyncStorage, Alert} from 'react-native'
import { Form, Item, Input, Label } from 'native-base';
import axios from 'axios';

import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    abss:{
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
        flex: 4,
        padding: 10,
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
    intentsss:{
        flex:3,
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
    },
    selectInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'black',
        overflow: 'hidden'
    },
    selectInputInner: {
        height: 36,
        borderRadius: 4
    }

})

export default class  SignUpScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {choice:'', name:'', firstname:'', numero:'',pass:'',  isValid: false,}
    }
    onSubmitEditingSmall0(value) {
        this.setState({
            choice: value
        });
    }

    onSubmitEditingSmall1(value) {
        this.setState({
            valueSmall1: value
        })
    }

    onSubmitEditingLarge(value) {
        this.setState({
            valueLarge: value
        })
    }

    connect(){
        this.props.navigation.navigate('Login');
    }
    tcheck(){
        this.setState({isLoad:true});
        if(this.state.choice !== ""){
            const ele = {
                name: this.state.name,
                firstname: this.state.firstname,
                numero: this.state.numero,
                schoolValue : this.state.choice,
                pass: this.state.pass
            };
            axios.post(`http://137.74.116.91:2037/JillCantine/signin`, ele )
                .then((res) => {
                    if(res.data.info !== null){
                        const users = res.data.info.name + ' ' + res.data.info.firstname;
                        AsyncStorage.setItem("id", res.data.info._id);
                        AsyncStorage.setItem("ecole", this.state.choice);
                        AsyncStorage.setItem("user", users).then((result) => {
                            this.setState({isLoad: false});
                            this.props.navigation.navigate('Home');
                        }).catch((err) => {
                            Alert.alert("Probleme de Connexion. Veillez verifier votre connexion")
                            this.setState({isLoad: false});
                        });
                    }
                    else{
                        Alert.alert("Probleme de Connexion. Veillez verifier votre connexion")
                        this.setState({isLoad: false});
                    }
                }).catch((err)=>{
                console.log("err \n" +err)
            })
        }
        else{
            Alert.alert('Votre Etablissement est aubligatoire');
        }
    }
    render(){
            return(
                <ImageBackground source={require('../assets/img/cover.jpg')} style={styles.container}>
                    <View style={styles.abss}>
                        <View style={styles.block}>
                            <View style={styles.intents}>
                                <Text style={{color: "#fff", marginTop: 30, fontSize: 40, textAlign: 'center' }}>JIL CANTINE</Text>
                                <Text style={{color: "#bbb", marginTop: 10, fontSize: 15, textAlign: 'center' }}>N'attendez plus et Inscrivez-vous !!!</Text>
                            </View>
                            <View style={styles.intentsss}>
                                <Form>
                                    <Item inlineLabel>
                                        <Label style={{color:"#fff"}}>Nom
                                        </Label>
                                        <Input style={{color:"#fff"}}  onChangeText={(text)=>{this.setState({name:text})}} />
                                    </Item>
                                    <Item inlineLabel>
                                        <Label style={{color:"#fff"}}>Prenom</Label>
                                        <Input style={{color:"#fff"}}  onChangeText={(text)=>{this.setState({firstname:text})}} />
                                    </Item>
                                    <Item inlineLabel>
                                        <Label style={{color:"#fff"}}>Numero</Label>
                                        <Input style={{color:"#fff"}} keyboardType="phone-pad"  onChangeText={(text)=>{this.setState({numero:text})}} />
                                    </Item>
                                    <Item inlineLabel>
                                        <Label style={{color:"#fff"}}>Ecole</Label>
                                        <Input style={{color:"#fff"}}  onChangeText={(text)=>{this.setState({choice:text})}} />
                                    </Item>
                                    <Item inlineLabel>
                                        <Label style={{color:"#fff"}}>Mot de passe</Label>
                                        <Input style={{color:"#fff"}} onChangeText={(text)=>{this.setState({pass:text})}} secureTextEntry />
                                    </Item>
                                </Form>
                            </View>
                        </View>
                        <View style={styles.intent}>
                            <Button loading={this.state.isLoad}  title="Inscription" buttonStyle={{width: '100%', borderRadius: 5, backgroundColor:'#242422', marginTop: 15}} onPress={()=>{this.tcheck()}} />
                        </View>
                        <View style={styles.intentss}>
                            <Button title="Connexion" buttonStyle={{width: '90%', borderRadius: 5, backgroundColor:'#f30706', margin: 20}} onPress={()=>{this.connect()}} />
                        </View>
                    </View>

                </ImageBackground>
            )
    }
}
