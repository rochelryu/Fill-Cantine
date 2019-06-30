import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    Alert,
    Button,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Image, Modal
} from 'react-native'
import {Form, Item, Input, Label, Spinner, Left, Icon, Body, Header} from 'native-base';
import axios from 'axios';

let id = "";
export default class EditScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            firstname:'',
            numero:'',
            pass:'',
            isTrue: false
        }
    }
    async componentDidMount() {
        id = await AsyncStorage.getItem('id');
        return fetch(`http://137.74.116.91:2037/JillCantine/editInfo/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.statue){

                    this.setState({
                        name: responseJson.info.name,
                        firstname: responseJson.info.firstname,
                        numero: responseJson.info.numero,
                    });
                }

            })
            .catch((error) =>{
                console.error(error);
            });
    }
    save(){
        if(this.state.pass !== ''){
            this.setState({
                isTrue: true,
            });
            const ele = {
                id: id,
                name:this.state.name,
                firstname:this.state.firstname,
                numero:this.state.numero,
                password:this.state.pass,
            };
            axios.post(`http://137.74.116.91:2037/JillCantine/editor`, ele )
                .then((res) => {
                    if(res.data.info !== null){
                        const info = res.data.info;
                        const users = info.name + ' ' + info.firstname;
                        AsyncStorage.setItem("user", users).then((result) => {
                            this.setState({isTrue: false});
                            this.props.navigation.navigate('Home');
                        }).catch((err) => {
                            this.setState({isTrue: false});
                            Alert.alert("Probleme de Connexion. Veillez verifier votre connexion")
                        });
                    }
                    else{
                        this.setState({isTrue: false});
                        Alert.alert("Probleme de Connexion. Veillez verifier votre connexion")
                    }
                }).catch((err)=>{
                console.log("err \n" +err)
            })
        }else Alert.alert("Veillez entrer votre Mot de passe Pour confirmer les modficiation")
    }
    render() {
        return(
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isTrue}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,.7)", alignItems:"center", justifyContent:"center"}}></View>
                    <View style={{marginTop: 222, marginLeft: 50, marginRight:50, elevation: 4}}>
                        <View style={styles.blockHeader}>
                            <Spinner color='red' />
                        </View>
                    </View>
                </Modal>
                <View style={styles.containers}>
                    <KeyboardAvoidingView>

                        <Header style={{backgroundColor: "#d4351d"}}>
                            <Left>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Icon size={15} style={{color:"#fff"}} name='arrow-back' />
                            </TouchableOpacity>
                            </Left>
                            <Body>
                                <Text numberOfLines={1} style={{color:"#fff", fontWeight: "bold", fontSize: 18}}>Editer Mon Profil</Text>
                            </Body>
                        </Header>
                        <View style={{padding:20}}>
                            <Form>
                                <Item stackedLabel>
                                    <Label>Nom</Label>
                                    <Input value={this.state.name} onChangeText={(text)=> this.setState({name:text})}/>
                                </Item>
                                <Item stackedLabel>
                                    <Label>Prénom</Label>
                                    <Input value={this.state.firstname} onChangeText={(text)=> this.setState({firstname:text})} />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Numero</Label>
                                    <Input value={this.state.numero} onChangeText={(text)=> this.setState({numero:text})} />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Mot de passe</Label>
                                    <Input onChangeText={(text)=> this.setState({pass:text})} secureTextEntry />
                                </Item>
                            </Form>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.abs}>
                        <Button title="Enregistrer" color="#d4351d" onPress={()=>this.save()} />
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    containers:{
      flex: 1
    },
    abs:{
        position: "absolute",
        left:"10%",
        bottom:25,
        right:"10%",
    }
})
