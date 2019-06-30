import React from 'react';
import { View, StyleSheet, AsyncStorage} from 'react-native';
import { Spinner } from 'native-base';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

export default class Authentif extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged: 0
        }
    }

    async componentWillMount()
     {
        await AsyncStorage.getItem("user").then((user)=>{
            if(user !== null){
                this.setState({isLogged:2})
            }else{
                this.setState({isLogged:1})

            }
        }).catch((err)=>{
            console.log("err \n" +err);
        })
    }

    render() {
        if(this.state.isLogged === 2){
            return(
                <HomeScreen navigation={this.props.navigation}/>
            )
        }
        else if(this.state.isLogged === 1){
            return(
                <LoginScreen navigation={this.props.navigation}/>
            )
        }
        else{
            return(
                <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
                    <Spinner color='red' />
                </View>
            )
        }
    }
}
