import React from  'react'
import {View, ImageBackground, StyleSheet, Image, TouchableOpacity, Text,} from 'react-native'

const styles = StyleSheet.create({
    container:{
        borderRadius:10,
        height:110,
        elevation: 4,
    },
    block:{
        backgroundColor: "#fff",
        elevation: 2,
        alignItems: "center",
    },
    abss:{
        position: "absolute",
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.47)"
    },
    title:{
        fontSize: 15,
        textAlign: "center",
        letterSpacing: 2,
        fontWeight: "bold",
        color: "#000",
        textTransform: "capitalize",
        marginBottom: 5,
    },
    price:{
        fontSize: 14,
        borderRadius: 20,
        borderWidth:1,
        borderColor: "#ff1744",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: "500",
        color: "#ff1744",
        marginBottom: 2,
    },
    pric:{
        fontSize: 14,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: "500",
        color: "#ff1744",
        marginBottom: 2,
    },
    blockAlign:{
        display: "flex",
        flexDirection: "row",
    },
    sub:{
        color: "#555",
        fontSize: 13,
        letterSpacing: 0.9,
        marginRight: 2
    },
    abs:{
        position: "absolute",
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(68,68,68,.3)"
    },


});

export default class ItemTwoScreen extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        let {ele, displayDetailForFilm} = this.props;
        const mom = new Date().getHours();
        if(mom >= 14 && mom <=18) {
            return (
                <TouchableOpacity onPress={() => {
                    displayDetailForFilm(ele)
                }}>
                    <ImageBackground source={{uri: "http://137.74.116.91:2037/images/Fixe/"+ele.item.url}} style={styles.container}>
                        <View style={styles.abss}>
                        </View>
                    </ImageBackground>
                    <View style={styles.block}>
                        <Text style={styles.title} numberOfLines={1}>{ele.item.tit}</Text>
                        <Text style={styles.price}>{ele.item.price}</Text>
                    </View>

                </TouchableOpacity>
            )
        }
        else{
            let delai = (14 - mom > 0) ? 14 - mom: 24 - mom + 14;
            return (
                <TouchableOpacity onPress={() => {
                    displayDetailForFilm(ele)
                }}>
                    <ImageBackground source={{uri: "http://137.74.116.91:2037/images/Fixe/"+ele.item.url}} style={styles.container}>
                        <View style={styles.abs}>
                        </View>
                    </ImageBackground>
                    <View style={styles.block}>
                        <Text style={styles.title} numberOfLines={1}>Fermé</Text>
                        <Text style={styles.pric}>Ouvert Dans {delai}H</Text>
                    </View>

                </TouchableOpacity>
            )
        }
    }

}
