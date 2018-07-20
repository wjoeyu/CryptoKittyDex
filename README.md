# CryptoKittyDex

![](https://i.imgur.com/A7D2gMb.png)

[CryptoKitties](http://cryptokitties.co) is one of the most popular distributed apps on the Ethereum Network. It's a game that allows players to purchase, collect, breed and sell various types of virtual cats.

CryptoKittyDex is a simple UI that will be able to interact with the Ethereum Blockchain, using web3.js and the [drizzle](https://truffleframework.com/docs/drizzle/getting-started) library. This UI will allow the user to type in a CryptoKitty's ID, and will display information about that Kitty.

# Requirements to complete this challenge

- Use the code provided in this repo as a starting point to build your solution
- Given the address for the CryptoKitties Smart Contract: `0x06012c8cf97bead5deae237070f9587f8e7a266d` and its *ABI*, utilizing the smart contract methods we can query with a CryptoKitty ID and obtain and view a CryptoKitty's:
  - Genes
  - Birth time
  - Generation
  - Picture
- There is also "Fetch random Kitty" button to fetch a random CryptoKitty from the CATalogue.

## The interface looks like this:

![cryptokittydex](https://github.com/wjoeyu/CryptoKittyDex/blob/master/public/CryptoKittyDexScreenshot.png)

# Running and viewing the CryptoKittyDex Locally on the Browser

- Install and setup Metamask extension in your Chrome browser
- Install the dependencies with and run the local server
- The CryptoKittyDex will be viewable at http://localhost:3000/

# Code Overview

This repo contains a few key components. These components are based on the [drizzle-react](https://github.com/trufflesuite/drizzle-react) examples

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

## App.js

Initializes the `DrizzleProvider` and wraps your app with the `Loading` component.

```Javascript
class App extends Component {
  render() {
    const drizzleOptions = {
      contracts: []
    };

    return (
      <DrizzleProvider options={drizzleOptions}>
        <Loading>
          <Browser />
        </Loading>
      </DrizzleProvider>
    );
  }
}
```
