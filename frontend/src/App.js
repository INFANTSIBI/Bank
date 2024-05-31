import React, { Component } from 'react';
import Overview from './subcomponents/main/overview';
import Authentication from './subcomponents/authentication/Authentication';
import TransferPage from './subcomponents/main/Transfer';
import './App.css';

const initialTxDetails = { 
  txToAccount: '',
  txAmount: 0,
  txCurrency: ''
};

const initialLoginDetails = {
  email: '',
  username: '',
  password: ''
}

const initialAcctDetails = {
  username: '',
  accountNumber: '',
  balance: 0
}

const initialState = {
  route: 'login',
  loginDetails: initialLoginDetails,
  acctDetails: initialAcctDetails,
  txDetails: initialTxDetails
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onRouteChange = (dest) => {
    this.setState({
      route: dest
    });
  };

  
  onFormTextChange = (object, key, value) => {
    this.setState({
      [object]: {
        ...this.state[object],
        [key]: value
      }
    })
  } 

  sendTransaction = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        username: this.state.loginDetails.username,
        txDetails: this.state.txDetails 
      })
    }
    let response = await (await fetch('http://127.0.0.1:5001/send_transaction', requestOptions)).json() 
    let message = response['message'] 
    alert(message)                                      
  }
  onAuthentication = async (route) =>{
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        loginDetails: this.state.loginDetails
      })
    }
    let response = await (await fetch('http://127.0.0.1:5001/'+route, requestOptions)).json() 
    let {success, message, result} = response
    alert(message)
    if (success) {
      this.setState({
        ...this.state,
        route: 'overview',
        acctDetails: result['account_details']
      })
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.route === 'overview' 
        ? 
          <Overview  
          state = {this.state}
          onRouteChange = {this.onRouteChange}
          />
        : this.state.route === 'transfer'
        ?
          <TransferPage 
          onRouteChange = {this.onRouteChange}
          sendTransaction = {this.sendTransaction}
          onFormTextChange = {this.onFormTextChange}
          />
        : this.state.route === 'login' || this.state.route === 'register'
        ? 
          <Authentication
          state = {this.state}
          onRouteChange = {this.onRouteChange}
          onFormTextChange = {this.onFormTextChange}
          onAuthentication = {this.onAuthentication}
          />
        :
          <></>
        }
      </div>
    );
  }
}


export default App;