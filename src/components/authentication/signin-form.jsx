import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    componentDidMount() {
        const timer = setInterval(() => {
            this.setState({height: this.state.height + 10})
            if (this.state.height >= 220) clearInterval(timer)
        }, 0)
    }

    componentWillUnmount() {
        /* const timer = setInterval(() => {
            this.setState({height: this.state.height - 10})
            if (this.state.height <= 0) clearInterval(timer)
        }, 0) */
    }

    render() {
        return (
            <form className='login-form' style={{height: this.state.height + 'px'}}>
                <input type='text' placeholder='Имя пользователя'/>
                <input type='password' placeholder='пароль'/>
                <button> Войти </button>
                <p className='little-message'>
                    <span> Не зарегистрированы? </span>
                    <Link to='/signup'>Создать аккаунт</Link>
                </p>
            </form>     
        )
    }
}

export default SignIn
