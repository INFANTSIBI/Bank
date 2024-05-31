import React, { Component } from 'react';
import { Table,Card,Button} from 'react-bootstrap';
import Navigation from '../Navigation/Navigation'

class Overview extends Component {
    render() {
        return (
            <>
                <Navigation
                onRouteChange = {this.props.onRouteChange}
                />
                <Card>
                    <Card.Body>
                        <AccountInformation state = {this.props.state} />
                        <Button className="mb-3" id='center' variant='primary'
                        onClick={() => {this.props.onRouteChange('transfer')}}
                        >
                        Transfer
                        </Button>
                        <TransactionTable />
                    </Card.Body>
                </Card>
            </>
        );
    }
}

class AccountInformation extends Component {
    render() {
        let acctInfo = this.props.state.acctDetails
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account Number</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{acctInfo.username}</td>
                        <td>{acctInfo.accountNumber}</td>
                        <td>{acctInfo.balance}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

class TransactionTable extends Component {
    render() {
        return (
            <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>From Account</th>
                        <th>To Account</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>001</td>
                        <td>0123</td>
                        <td>3210</td>
                        <td>10</td>
                        <td>EUR</td>
                        <td>DD-MM-YYYY</td>
                    </tr>
                </tbody>
            </Table>
            </>
        );
    }
}

export default Overview;
