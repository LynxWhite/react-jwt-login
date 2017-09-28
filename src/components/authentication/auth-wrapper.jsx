import React, {Component} from 'react'
import BubblesBG from './bubbles-bg'
import { Route, Switch } from 'react-router-dom'
import SignUp from './signup-form'
import SignIn from './signin-form'

class AuthWrapper extends Component {
    constructor(props) {
        super(props)
        /* this.state = {
            height: this.props.match.path === '/signup' ? '350px' : '280px'
        }*/
    }
    /*
    componentWillReceiveProps(nextProps) {
        if (nextProps === this.props) {return}
        if (nextProps.match.path === '/signup')
            this.setState({height: '350px'})
        if (nextProps.match.path === '/signin')
            this.setState({height: '280px'})
    }
    */

    render() {
        return (
            <div className='login-wrapper'>
                <div className='login-page' >
                    <div className='login-form-wrapper'>
                        <Switch>
                            <Route path='/signin' component={SignIn} />
                            <Route path='/signup' component={SignUp} />
                        </Switch>
                    </div>
                </div>
                <BubblesBG/>
            </div>
        )
    }
}

export default AuthWrapper
