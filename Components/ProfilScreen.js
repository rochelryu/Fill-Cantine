import React from 'react';
import {View, StyleSheet, Text, Button, Image, ScrollView, FlatList, TouchableOpacity, AsyncStorage, ImageBackground} from 'react-native';
import {Card, CardItem, Header, Icon, Input, Item, Right, Left} from 'native-base';

let datas =[];
let count =0;
let Imap = (props) =>{
    if(props.etat === 2){
        return (
            <Image style={styles.img} source={require('../assets/img/vs.png')}/>
        )
    }
    else{
        return (
            <Image style={styles.img} source={require('../assets/img/wait.png')}/>
        )
    }
}
export default class ProfilScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info:'',
            name: '',
            commande:[],
        }
    }
    async componentDidMount() {
        const id = await AsyncStorage.getItem("id");
        await AsyncStorage.getItem("user").then((user)=>{
            if(user !== null){
                this.setState({name:user})
            }
        }).catch((err)=>{
            console.log("err \n" +err);
        })
        await AsyncStorage.getItem("ecole").then((user)=>{
            if(user !== null){
                this.setState({info:user})
            }
        }).catch((err)=>{
            console.log("err \n" +err);
        })
        return fetch(`http://137.74.116.91:2037/JillCantine/me?key=${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.statue){
                    this.setState({
                        commande: responseJson.info.commande.reverse(),
                    });
                }

            })
            .catch((error) =>{
                console.error(error);
            });
    }
    async _logout(){
        await AsyncStorage.removeItem("id");
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("ecole");
        this.props.navigation.navigate('Guard')
    }
    _search(text){
        if(count === 0) {
            datas = this.state.commande;
            count = 1;
            if (text !== "") {
                let fake = text.toString().toLowerCase();
                let tack = [];
                datas.forEach((value, key) => {
                    if (value.code.toLowerCase().indexOf(fake) !== -1) {
                        tack.push(value)
                    }
                });
                this.setState({
                    commande: tack
                })
            } else {
                this.setState({
                    commande: datas
                })
            }
        }
        else{
            if (text !== "") {
                let fake = text.toString().toLowerCase();
                let tack = [];
                datas.forEach((value, key) => {
                    if (value.code.toLowerCase().indexOf(fake) !== -1) {
                        tack.push(value)
                    }
                });
                this.setState({
                    commande: tack
                })
            } else {
                this.setState({
                    commande: datas
                })
            }
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../assets/img/baner.jpg')} style={styles.banner}>
                    <Image source={require('../assets/icon.png')} style={styles.pp} />
                </ImageBackground>
                <View style={styles.content}>
                    <Text style={styles.name}>{this.state.name}</Text>
                    <Text style={styles.school}><Icon name="md-school" color="#444" />  {this.state.info}</Text>
                    <View style={{marginTop: 10, marginBottom: 30, marginRight: 50, marginLeft: 50}}>
                        <Button title="Modifier Information" color="#d4351d" onPress={()=> this.props.navigation.navigate('Edit')}/>
                        <View style={{height: 60, width:"100%", alignItems: "center", justifyItems:"center"}}>
                            <TouchableOpacity onPress={()=> {this._logout()}}>
                                <Image source={require('../assets/img/log.png')} style={{width:45, height:45, marginLeft: 60, marginTop: 12}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.foot}>
                    <Header searchBar style={{ backgroundColor:'none' }}>
                        <Item style={{ borderRadius:30 }}>
                            <Icon name="ios-search" />
                            <Input onChangeText={(text)=>{this._search(text)}} placeholder="Code" />
                        </Item>
                    </Header>
                    <Card>
                        <ScrollView>
                            <FlatList
                                data={this.state.commande}
                                keyExtractor={(item) => item._id}
                                renderItem={({item}) => <CardItem>
                                    <Left>
                                        <Icon  name="pizza" color="#d4351d" />
                                        <Text style={{marginLeft:20}}>{item.code} | {item.register_date}</Text>
                                    </Left>
                                    <Right>
                                        <Imap etat={item.etat} />
                                    </Right>
                                </CardItem>}
                            />

                        </ScrollView>
                    </Card>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner:{
        flex: 1,
    },
    pp:{
        width:70,
        height:70,
        position: "absolute",
        bottom: -35,
        left: "12%",
        borderRadius: 100,
        borderWidth: 3,
        borderColor: "#fff"
    },
    content:{
        flex:2,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
    },
    name:{
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 5
    },
    school:{
        color: "#555",
        fontSize: 17,
    },
    foot:{
        flex:4,
        paddingLeft: 10,
        paddingRight: 10,
    },
    img:{
        width: 15,
        height: 15
    }
});
