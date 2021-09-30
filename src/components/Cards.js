import React, { Component } from 'react'
import { Button, Form, Container, Header } from 'semantic-ui-react'
import '../App.css';
import axios from 'axios';

export default class Cards extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       results: props.results,
    }
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  generateCard = () => {
    console.log('hello', this.state.results);
    alert(this.getRandomInt(this.state.results.length))
  }

  render() {
    return (
      <Container>
        <Button onClick={this.generateCard}>New Card</Button>
        <p>{this.state.results}</p>
      </Container>
    )
  }
}