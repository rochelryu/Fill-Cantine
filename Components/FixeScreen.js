import React from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList, ImageBackground, Dimensions, AsyncStorage} from 'react-native';
const { width } = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import GridView from 'react-native-super-grid';
import {Header, Item, Input, Icon, Button} from 'native-base';
import ItemTwoScreen from "./ItemTwoScreen";

let datas =[];
let count = 0;
export default class FixeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fixe: [],
            semaine: [],
            acompagmentFixe: [],
            acompagmentSemaine: [],
            acompagmentSemaineTwo: [],
            boisson: [],
            datas:[]
        }
    }

    async componentDidMount(){
        const id = await AsyncStorage.getItem("id");
        return fetch(`http://137.74.116.91:2037/JillCantine/all/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.statue){
                    this.setState({
                        fixe:responseJson.info.fixe.reverse(),
                        semaine:responseJson.info.semaine.reverse(),
                        acompagmentFixe: responseJson.info.accompFixe,
                        acompagmentSemaine:responseJson.info.accompSemaineOne,
                        acompagmentSemaineTwo:responseJson.info.accompSemaineTwo,
                        boisson:responseJson.info.boisson
                    })
                    //console.log(responseJson.school);
                    /*this.setState({
                        option: responseJson.school, choice:responseJson.school[0].value
                    });*/
                }
                // console.log("datas "+ JSON.stringify(responseJson))

            })
            .catch((error) =>{
                console.error(error);
            });
    }


    _displayDetailForFilm = (idFilm) => {
        const mom = new Date().getHours();
        let inter= [{name:"Accomppagnement", id:1, children:this.state.acompagmentFixe},{name:"Boisson", id:2, children:this.state.boisson} ]
        if(mom >= 1 && mom <=19) this.props.navigation.navigate('Detail', {pro:idFilm.item, inter:inter})
    };
    _search(text){
        if(count === 0){
            datas = this.state.fixe;
            count = 1;
            if(text !== ""){
                let fake = text.toString().toLowerCase();
                let tack = [];
                datas.forEach((value, key)=> {
                    if (value.tit.toLowerCase().indexOf(fake) !== -1 || value.price.toLowerCase().indexOf(fake) !== -1) {
                        tack.push(value)

                    }
                });
                this.setState({
                    fixe: tack
                })
            }
            else{
                this.setState({
                    fixe: datas
                })
            }
        }
        else{
            if(text !== ""){
                let fake = text.toString().toLowerCase();
                let tack = [];
                datas.forEach((value, key)=> {
                    if (value.tit.toLowerCase().indexOf(fake) !== -1 || value.price.toLowerCase().indexOf(fake) !== -1) {
                        tack.push(value)

                    }
                });
                this.setState({
                    fixe: tack
                })
            }
            else{
                this.setState({
                    fixe: datas
                })
            }
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <Swiper style={styles.wrapper}
                            dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            horizontal={false} autoplay>
                        <ImageBackground source={require('../assets/img/baner.jpg')} style={styles.slide1}>
                        </ImageBackground>
                        <ImageBackground source={{uri:"https://image.freepik.com/photos-gratuite/biere-poulet-frites_23-2147765444.jpg"}} style={styles.slide2}>
                        </ImageBackground>
                        <ImageBackground source={{uri:"https://image.freepik.com/photos-gratuite/preparation-du-poulet-cru-au-barbecue-pour-cuisson_1220-2987.jpg"}} style={styles.slide3}>
                        </ImageBackground>
                    </Swiper>
                    <View style={{marginTop:20}}>
                        <GridView
                            itemWidth={150}
                            items={this.state.fixe}
                            renderItem={item => (<ItemTwoScreen ele={item} displayDetailForFilm={this._displayDetailForFilm} />)}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper:{
        height: 200
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
