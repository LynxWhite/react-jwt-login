import React, {Component} from 'react';
import BubblesBG from './bubbles-bg';

class AuthWrapper extends Component {
    render() {
        return(
            <div className='login-wrapper'>
                <div className='login-page' >
                    <div className='login-form-wrapper'>
                    </div>
                </div>
                <BubblesBG/>
            </div>
        );
    }
}

export default AuthWrapper;