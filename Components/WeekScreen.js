import React from 'react';
import {View, StyleSheet, Text, ScrollView, ImageBackground, Dimensions, FlatList, AsyncStorage} from 'react-native';
import ItemTwoScreen from './ItemTwoScreen';
const { width } = Dimensions.get('window');
import GridView from 'react-native-super-grid';
import Swiper from 'react-native-swiper';
import {Header, Item, Input, Icon, Button} from 'native-base';

let datas =[];
let count = 0;
export default class WeekScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fixe: [],
            semaine: [],
            acompagmentFixe: [],
            acompagmentSemaine: [],
            acompagmentSemaineTwo: [],
            boisson: [],
            datas:[],
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
                }

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    _displayDetailForFilm = (idFilm) => {
        const mom = new Date().getHours();
        let inter=[{name:"Accomppagnement 1", id:1, children:this.state.acompagmentSemaine}, {name:"Accomppagnement 2", id:2, children:this.state.acompagmentSemaineTwo},{name:"Boisson", id:3, children:this.state.boisson} ]
        if(mom >= 14 && mom <=18) this.props.navigation.navigate('Detail', {pro:idFilm.item, inter:inter})
    };
    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <Swiper style={styles.wrapper}
                            dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            paginationStyle={{
                                bottom: -23, left: null, right: 10
                            }} loop autoplay>
                        <ImageBackground source={require('../assets/img/baner.jpg')} style={styles.slide1} title={<Text numberOfLines={1}>Notre Menu Semaine</Text>}>
                        </ImageBackground>
                        <ImageBackground source={{uri:"https://image.freepik.com/photos-gratuite/feuille-delicieux-basilic-vert-thailande_1203-5876.jpg"}} style={styles.slide2} title={<Text numberOfLines={1}>Nos plat Au goût de vos attentes</Text>}>
                        </ImageBackground>
                        <ImageBackground source={{uri:"https://image.freepik.com/photos-gratuite/cote-porc-steak-poulet_74190-592.jpg"}} style={styles.slide3} title={<Text numberOfLines={1}>Votre Cantine, Jil Cantine</Text>}>
                        </ImageBackground>
                    </Swiper>
                    <View style={{marginTop:40}}>
                        <GridView
                            itemWidth={150}
                            items={this.state.semaine}
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
}
});
