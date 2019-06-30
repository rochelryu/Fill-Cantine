import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    TouchableNativeFeedback,
    Modal,
    ToastAndroid,
    AsyncStorage, Alert
} from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Card, CardItem, Fab } from 'native-base';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import axios from 'axios';



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    abss:{
        position: "absolute",
        top:0,
        left:0,
        right:0,
        height:60,
        backgroundColor: "rgba(0,0,0,.45)"
    },
    blockHeader:{
        height:150,
        backgroundColor: "#53bb7c",
        alignItems: "center",
        justifyContent: "center"

    },
    blockHeaders:{
        backgroundColor: "#fff",
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 10,
        paddingBottom: 5,
    },
    banner:{
        height: 250,
        elevation: 4
    },
    price:{fontSize:20, color: "#d4351d", marginTop: 10}
});
let choice = [];
let fake=0;
let faile= [];
let platId = "";

const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravity(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
        return null;
    }
    return null;
};
const Validate = (props) =>{
    if (props.visible[0] !== undefined) {
        return (
            <Fab
                active={true}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#d4351d' }}
                position="topRight"
            >
                <TouchableNativeFeedback onPress={()=> {props.send()}}>
                    <Icon style={{color:"#fff"}} name="md-checkbox-outline" />
                </TouchableNativeFeedback>
            </Fab>
        );
    }
    return null;
}
export default class DetailsSceen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            withIn: [],
            prix:0,
            selectedItems: [],
            isReady: true,
            toast:false,
            modal:false,
            rend: Math.floor(Math.random()*9999)
        }
    }
    setModalVisible(visible) {
        this.setState({modal: visible});
    }
    handleButtonPress = () => {
        this.setState(
            {
                toast: true,
            });
    };

    send = async ()=>{
        if(this.state.withIn[0] === undefined){
            console.log("focus");
            this.handleButtonPress();
        }
        else{
            const ele = {
                contain: this.state.withIn,
                price: this.state.prix,
                platId: platId,
                rend: this.state.rend,
            };
            const id = await AsyncStorage.getItem("id");
            axios.post(`http://137.74.116.91:2037/JillCantine/commande/${id}`, ele )
                .then(async (res) => {
                    this.setModalVisible(true);
                }).catch((err)=>{
                console.log("err \n" +err)
            })
        }
    }

    _affichage = ()=>{
        let previous = [];
        let actu = 0;
        let sum = fake;
        let item = [];
        for(let i in choice){
            for(let j in choice[i].children){
                for(let z in this.state.selectedItems){
                    if(choice[i].children[j].id === this.state.selectedItems[z]){
                        let ele = this.state.selectedItems[z];
                        item.push(choice[i].children[j].etat);
                        faile.push(ele);
                        //sum += choice[i].children[j].price;
                        this.setState({withIn:faile})
                    }
                    continue;
                }
                continue;
            }
            continue
        }
        for(let a in item ){
            if(item[a] === 3 || item[a] === actu ){
                sum += 500;
            }
        else {
            actu = item[a];
                for(let bb in previous){
                    if(item[a] === previous[bb]){
                        sum += 500;
                    }
                    continue;
                }
                previous.push(actu);
            }
        }
        this.setState({prix:sum});
        faile = [];
    };
    back(){
        this.setModalVisible(!this.state.modal);
        setTimeout(()=>{
            this.props.navigation.navigate("Home");
        },1000)
    }
    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems:selectedItems });
        };
    render() {
        let sub = "";
        let product = this.props.navigation.state.params.pro;
        platId = product._id;
        let inter = this.props.navigation.state.params.inter;
        for (let i in inter){
            for(let j in inter[i].children){
                inter[i].children[j].id = inter[i].children[j]._id;
             continue;
            }
            continue;
        }
        fake = parseInt(product.price, 10);
        choice = inter;
        if(product.etat == 1){
            sub = "Dans le menu Fixe vous pouvez choisir un Accompagnement mais les surplus sont à 500 chacun. chaque boisson coûte 500";
        }
        else{
            sub = "Dans le menu Semaine vous pouvez choisir un Accompagnement dans chaque Rubrique (Ex: Rubrique Accompagnement 1, Rubrique Accompagnement 2)  mais les surplus sont à 500 chacun. chaque boisson coûte 500";
        }
        return(
            <View style={{flex:1}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,.7)", alignItems:"center", justifyContent:"center"}}></View>
                    <View style={{marginTop: 222, marginLeft: 50, marginRight:50, elevation: 4}}>
                        <View style={styles.blockHeader}>
                            <Image source={require('../assets/img/checked.png')} />
                            <Text style={{fontSize: 20, color:"#fff", fontWeight:"700",marginTop:20}}>Commande Passée</Text>
                        </View>
                        <View style={styles.blockHeaders}>
                            <Text>Super votre Commande à été envoyé avec succès</Text>
                            <Text>Votre Ticket est {this.state.rend}</Text>
                            <View style={{margin:20}}>
                                <Button style={styles.button} block success>
                                    <Text style={{color:"#fff", letterSpacing: 2}} onPress={()=>this.back()}>OK</Text>
                                </Button>
                            </View>

                        </View>
                    </View>
                </Modal>
                <Toast visible={this.state.toast} message="Veillez Choisir Au moins Un Accompagnement en cliquant sur la flêche" />
                <ScrollView>
                <ImageBackground style={styles.banner} source={{uri: "http://137.74.116.91:2037/images/Fixe/"+product.url}}>
                            <Header style={{backgroundColor: "#d4351d"}}>
                                <Left>
                                    <Button transparent>
                                        <Icon onPress={() => this.props.navigation.goBack()} size={15} color="#fff" name='arrow-back' />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text numberOfLines={1} style={{color:"#fff", fontWeight: "bold", fontSize: 18}}>{product.tit}</Text>
                                </Body>
                            </Header>

                    </ImageBackground>
                <View style={{justifyContent: "flex-end", margin: 5}}>
                    <Card>
                        <CardItem>
                            <Body>
                                <View style={{alignItems: "center"}}>
                                    <Text style={{marginRight: 50}}>
                                        {sub}
                                    </Text>
                                    <Text style={styles.price}>{(this.state.prix !== 0) ? this.state.prix + " Fcfa" : "" }</Text>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <View style={{alignItems: "center", textAlign: "center"}}>
                                    <Text>
                                        Cliquer Sur la flêche pour choisir les accompagnements avant de pouvoir Passer une commande
                                    </Text>
                                    <SectionedMultiSelect
                                        items={choice}
                                        uniqueKey='id'
                                        confirmText="Valider"
                                        subKey='children'
                                        selectText='Vous avez Choisie'
                                        showDropDowns={true}
                                        readOnlyHeadings={true}
                                        onSelectedItemsChange={this.onSelectedItemsChange}
                                        selectedItems={this.state.selectedItems}
                                        affichage={this._affichage}
                                    />
                                </View>
                            </Body>
                        </CardItem>
                    </Card>

                    <Validate visible={this.state.withIn} send={this.send}/>

                </View>
                </ScrollView>
            </View>
        )
    }
}
