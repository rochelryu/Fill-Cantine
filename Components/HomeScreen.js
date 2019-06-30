import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import FixeScreen from './FixeScreen';
import WeekScreen from './WeekScreen';
import ProfilScreen from './ProfilScreen';
import {Tab, Tabs, TabHeading, Icon, Text } from 'native-base';

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Tabs tabBarUnderlineStyle={{borderWidth: 0}} noShadow>
                    <Tab heading={ <TabHeading style={{backgroundColor: "#d4351d"}}><Text>FIXE</Text></TabHeading>}>
                        <FixeScreen navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading={ <TabHeading style={{backgroundColor: "#d4351d"}}><Text>SEMAINE</Text></TabHeading>}>
                        <WeekScreen  navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading={ <TabHeading style={{backgroundColor: "#d4351d"}}><Icon name="person" /></TabHeading>}>
                        <ProfilScreen navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
