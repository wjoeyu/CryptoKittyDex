import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import randomKittyId from './randomKittyId';
import KittyCoreABI from '../contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';

class Browser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      kitty_genes: '',
      kitty_generation: '',
      kitty_birth_time: '',
      kitty_url: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    const web3 = new Web3(window.web3.currentProvider);

    // Initialize the contract instance

    const kittyContract = new web3.eth.Contract(
      KittyCoreABI, // import the contracts's ABI and use it here
      CONTRACT_ADDRESS,
    );

    // Add the contract to the drizzle store

    this.context.drizzle.addContract({
      contractName: CONTRACT_NAME,
      web3Contract: kittyContract,
    });
  }


  update() {
    return e => this.setState({
      id: e.currentTarget.value
    });
  }

  getKitty(id) {
    this.context.drizzle.contracts.CryptoKitties.methods.getKitty(id).call().then(
      payload => this.setState({
        id: id,
        kitty_genes: payload[9],
        kitty_generation: payload[8],
        kitty_birth_time: new Date(payload[5]*1000).toUTCString().slice(5,16),
        kitty_url: `https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/${id}.svg`}));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.context.drizzle.contracts.CryptoKitties.methods.totalSupply().call().then(
      payload => {
      if (this.state.id && parseInt(this.state.id, 10) < payload) {
        this.getKitty(parseInt(this.state.id, 10));
      } else {
        window.alert("Please enter a valid kitty id!");
      }
    });
  }

  getRandomKitty() {
    this.context.drizzle.contracts.CryptoKitties.methods.totalSupply().call().then(payload => this.getKitty(randomKittyId(payload)));
  }


  render() {
    return (
      <div className="browser">

        <h1>
          Kitty Browser
        </h1>
        <form onSubmit={this.handleSubmit}>
          <h2>Kitty ID:</h2>
            <input
              className="kitty-id"
              type="text"
              value={this.state.id}
              placeholder="Enter Kitty ID"
              onChange={this.update()} />
            <input className="submit" type="submit" value={"FIND KITTY"}/>
        </form>
        <button className="rando-kitty"
          onClick={()=>this.getRandomKitty()}>
          Get Random Kitty!
          <span className="Header-logo-icon"></span>
        </button>

        <br/>
        <div className="info-card">
          {this.state.kitty_url ?
            <img
              src={`${this.state.kitty_url}`}
              alt="cryptokitty"
              className="cryptokitty"/> : ""}

          {this.state.kitty_genes &&
            this.state.kitty_generation &&
             this.state.kitty_birth_time ?
            <div className="kitty-info">
              <h2>Genes</h2>
                <span>{this.state.kitty_genes}</span>
              <h2>Generation</h2>
                <span>{this.state.kitty_generation}</span>
              <h2>Birth Time</h2>
                <span>{this.state.kitty_birth_time}</span>
            </div> : ""}
          </div>
          
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;
