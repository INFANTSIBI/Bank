import React, {Component} from 'react'
import {Navbar,Button} from 'react-bootstrap'
import './Navigation.css'

class Navigation extends Component {
    render() {
        return(
            <>
                <Navbar fixed="top" className="justify-content-end">
                    <Button
                    onClick = {() => this.props.onRouteChange('overview')}
                    >
                        Overview
                    </Button>
                    <Button
                    className='button-spacing'
                    onClick = {() => this.props.onRouteChange('login')}
                    >
                        Sign Out
                    </Button>
                </Navbar>
            </>
        )
    }
}
export default Navigation