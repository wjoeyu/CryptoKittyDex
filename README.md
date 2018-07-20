# CryptoKittyDex

![](https://i.imgur.com/A7D2gMb.png)

[CryptoKitties](http://cryptokitties.co) is one of the most popular distributed apps on the Ethereum Network. It's a game that allows players to purchase, collect, breed and sell various types of virtual cats.

CryptoKittyDex is a simple UI that will be able to interact with the Ethereum Blockchain, using web3.js and the [drizzle](https://truffleframework.com/docs/drizzle/getting-started) library. This UI allows the user to enter in a CryptoKitty's ID and display information about that CryptoKitty.

# Features

- Given the address for the CryptoKitties Smart Contract: `0x06012c8cf97bead5deae237070f9587f8e7a266d` and its *ABI*, and utilizing the smart contract methods we can query with a CryptoKitty ID and obtain and view a CryptoKitty's:
  - Genes
  - Birth time
  - Generation
  - Picture
- There is also "Get Random Kitty" button to fetch a random CryptoKitty from the CATalogue.
- If an invalid ID is entered, the user will be alerted to enter a valid ID.

## The interface looks like this:

![cryptokittydex](https://github.com/wjoeyu/CryptoKittyDex/blob/master/public/CryptoKittyDexScreenshot.png)

# Running and Viewing the CryptoKittyDex Locally in the Browser

- Install and setup Metamask extension in your Chrome browser
- Install the dependencies with npm and run the local server
- The CryptoKittyDex will be viewable at http://localhost:3000/

# Code Overview

This repo contains a few key components. These components are based on the [drizzle-react](https://github.com/trufflesuite/drizzle-react) examples

### components/Browser.jsx

The `Find Kitty` component utilizes the smart contract's `getKitty(_id)` method to retrieve all of a CryptoKitty's information in an array, which can be parsed for the relevant information we want to display in the UI:

```Javascript
getKitty(id) {
  this.context.drizzle.contracts.CryptoKitties.methods.getKitty(id).call().then(
    payload => this.setState({
      id: id,
      kitty_genes: payload[9],
      kitty_generation: payload[8],
      kitty_birth_time: new Date(payload[5]*1000).toUTCString().slice(5,16),
      kitty_url: `https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/${id}.svg`}));
}
```

The `Get Random Kitty` component was created by utilizing the smart contract's totalSupply method to obtain the current max CrytoKitty ID in the CATalogue. With the current max ID, we then simply generate a random and valid ID with the randomKittyId function:

#### components/randomKittyId.js
```Javascript
export const randomKittyId = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
```
and utilize the getKitty method to fetch the random CryptoKitty:

```Javascript
getRandomKitty() {
  this.context.drizzle.contracts.CryptoKitties.methods.totalSupply().call().then(
    payload => this.getKitty(randomKittyId(payload))
  );
}
```


### containers/Loading.js

Shows a Loading message while drizzle is being initialized or an error message if the browser is not *web3 enabled*

```Javascript
if (window.web3 === undefined || this.props.web3.status === 'failed') {
      return(
        // Display a web3 warning.
        <div className="warning">
          <p>This browser has no connection to the Ethereum network. </p>
          <p>Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
        </div>
      );
    }

    if (this.props.drizzleStatus.initialized) {
      // Load the dapp.
      return Children.only(this.props.children);
    }

    return(
      // Display a loading indicator.
      <div className="loading">
        <h1>Loading dapp...</h1>
        <img src="https://www.cryptokitties.co/images/loader.gif" width="120" alt="loading" />
      </div>
    );
```
