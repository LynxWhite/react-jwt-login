import React, { Component } from 'react'
import '../../resources/stylus/login-page.styl'

class LoginForm extends Component {
    render() {
        return (
            <div className='login-wrapper'>
                <div className='login-page' >
                    <div className='login-form-wrapper'>
                        <form className='login-form visually-hidden'>
                            <input type='text' placeholder='Имя пользователя'/>
                            <input type='password' placeholder='пароль'/>
                            <button> Войти </button>
                            <p className='little-message'>
                                <span> Не зарегистрированы? </span>
                                <a href='#'>Создать аккаунт</a>
                            </p>
                        </form>
                        <form className='register-form'>
                            <input type='text' placeholder='Имя пользователя'/>
                            <input type='password' placeholder='пароль'/>
                            <input type='text' placeholder='email'/>
                            <button> Создать </button>
                            <p className='little-message'>
                                <span> Уже зарегистрированы? </span>
                                <a href='#'>Войти</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm
