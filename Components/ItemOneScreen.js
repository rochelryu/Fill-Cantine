import React from  'react'
import {View,ImageBackground, StyleSheet, TouchableOpacity, Text, } from 'react-native'

const styles = StyleSheet.create({
    container:{
        borderRadius:10,
        height:150,
        width: "100%",
        marginTop:5,
        marginBottom: 5,
        elevation: 4,
    },
    abss:{
        position: "absolute",
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.35)"
    },
    abs:{
        position: "absolute",
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.6)"
    },
    inte:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'flex-end',
    },
    tit:{
        fontSize: 20,
        textAlign: "center",
        letterSpacing: 2,
        fontWeight: "bold",
        color: "#fff",
        textTransform: "uppercase",
        marginBottom: 5,
    },
    pric:{
        fontSize: 16,
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: "500",
        color: "#ff1744",
        marginBottom: 5,
    },
    title:{
        fontSize: 18,
        textAlign: "center",
        letterSpacing: 2,
        fontWeight: "bold",
        color: "#fff",
        textTransform: "uppercase",
        marginBottom: 5,
    },
    price:{
        fontSize: 16,
        borderRadius: 20,
        borderWidth:1,
        borderColor: "#ff1744",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: "500",
        color: "#ff1744",
        marginBottom: 5,
    }
});

export default class ItemOneScreen extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        let {ele, displayDetailForFilm} = this.props;
        const mom = new Date().getHours();
        if(mom >= 1 && mom <=18){
            return(
                <TouchableOpacity onPress={()=>{displayDetailForFilm(ele)}}>
                    <ImageBackground source={{uri: "http://137.74.116.91:2037/images/Fixe/"+ele.url}} style={styles.container}>
                        <View style={styles.abss}>
                            <View style={styles.inte}>
                                <Text style={styles.title}>{ele.tit}</Text>
                                <Text style={styles.price}>{ele.price}</Text>
                            </View>
                        </View>
                    </ImageBackground>

                </TouchableOpacity>
            )
        }else{
            let delai = (1 - mom > 0) ? 1 - mom: 24 - mom + 1;
            return(
                <TouchableOpacity onPress={()=>{displayDetailForFilm(ele)}}>
                    <ImageBackground source={{uri: "http://137.74.116.91:2037/images/Fixe/"+ele.url}} style={styles.container}>
                        <View style={styles.abs}>
                            <View style={styles.inte}>
                                <Text style={styles.tit}>Pas de commande Disponible</Text>
                                <Text style={styles.pric}>Ouvert Dans {delai}H</Text>
                            </View>
                        </View>
                    </ImageBackground>

                </TouchableOpacity>
            )
        }
    }

}
