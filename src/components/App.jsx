import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers'
import root from '../sagas/root'

import t1 from './t1'
import t2 from './t2'
import LoginForm from './login/login-form';
import AuthWrapper from './authentication/auth-wrapper';
import CanvasWrapper from './canvas/canvas-wrapper';

import '../resources/stylus/basic-config.styl'
import '../resources/stylus/basic-classes.styl';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

sagaMiddleware.run(root)

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={t1}/>
                        <Route exact path='/edit' component={t2}/>
                        <Route exact path='/signin' component={AuthWrapper}/>
                        <Route exact path='/signup' component={AuthWrapper}/>
                        <Route exact path='/canvas' component={CanvasWrapper}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App
