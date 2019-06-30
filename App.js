import React from 'react';
import { StatusBar } from 'react-native';
import Stacked from './Navigation/Navigation';

export default class App extends React.Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }
  render() {
    return (
        <Stacked />
    );
  }
}
