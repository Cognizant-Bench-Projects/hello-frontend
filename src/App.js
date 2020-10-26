import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Grid, Button, TextField } from '@material-ui/core'

const api = 'http://localhost:8080/api/greeting';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      greeting: '',
      name: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.hello();
  }

  async hello() {
    const response = await axios.get(api);
    this.setState({greeting: response.data});
  }

  handleChange(e) {
    this.setState({name: e.target.value});
  }

  async handleSubmit() {
    const response = await axios.post(`${api}?name=${this.state.name}`);
    this.setState({greeting: response.data});
  }

  render() {
    return (
      <Grid container direction="column" alignItems="center" justify="center">
        <h1>{this.state.greeting}</h1>
        <TextField value={this.state.name} onChange={this.handleChange} placeholder="Name" />
        <br/>
        <Button variant="contained" color="primary" size="small" onClick={this.handleSubmit} disabled={!this.state.name}>Click Me</Button>
      </Grid>
    )
  }
}

export default App;
