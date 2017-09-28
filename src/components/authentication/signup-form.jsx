import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    componentDidMount() {
        const timer = setInterval(() => {
            this.setState({height: this.state.height + 10})
            if (this.state.height >= 280) clearInterval(timer)
        }, 0)
    }

    render() {
        return (
            <form className='register-form' style={{height: this.state.height + 'px'}}>
                <input type='text' placeholder='Имя пользователя'/> 
                <input type='password' placeholder='пароль'/>
                <input type='text' placeholder='email'/>
                <button > Создать </button>
                <p className='little-message'>
                    <span> Уже зарегистрированы? </span>
                    <Link to='/signin'>Войти</Link>
                </p>
            </form>     
        )
    }
}

export default SignUp
