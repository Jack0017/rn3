import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';

import RandomNumber from './RandomNumber';

class App extends React.Component {
  static PropTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
  };
  state = {
    selectedNumbers: [],
    remainingSeconds: this.props.initialSeconds,
  };
  target = 10 + Math.floor(40*Math.random());
  randomNumbers = Array
    .from({length: this.props.randomNumberCount})
    .map(() => 1 + Math.floor(10*Math.random()));
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  componentDidMount() {
    this.intervalId = setInterval(() => {
        this.setState((prevState) => {
          return { remainingSeconds: prevState.remainingSeconds - 1};  
        }); () => {
            if(this.state.remainingSeconds===0){
              clearInterval(this.intervalId);
            }
        };
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  isNumberSelected = (numberIndex) => {
    return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
  }

  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedNumbers: [...prevState.selectedNumbers, numberIndex],
    }));
  };

  gameStatus = () =>{
    const sumSelected = this.state.selectedNumbers.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    console.log(sumSelected);
    if(this.state.remainingSeconds <= 0){
      return 'LOST';
    }
    if(sumSelected < this.target){
      return 'PLAYING';
    }
    if(sumSelected == this.target){
      return 'WON';
    }
    if(sumSelected > this.target){
      return 'LOST';
    }
  }

  render(){
    const gameStatus = this.gameStatus();
    return(
      <View style={styles.container}>
        <Text style = {[styles.target, styles['STATUS_'+(gameStatus)]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) =>
          <RandomNumber key={index} 
          id={index} 
          number={randomNumber}
          isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
          onPress={this.selectNumber}
          />
          )}
        </View>
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop:30,
  },

  target: {
    fontSize: 50,
    backgroundColor: '#aaa',
    marginHorizontal: 50,
    textAlign: 'center',
  },

  randomContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },

  STATUS_PLAYING:{
    backgroundColor: '#bbb'
  },

  STATUS_WON:{
    backgroundColor: 'green'
  },

  STATUS_LOST:{
    backgroundColor: 'red'
  }
});

export default App;