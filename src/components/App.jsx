import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers'
import root from '../sagas/root'

import t1 from './t1'
import t2 from './t2'

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
                    <div className='page-wrapper'>
                        <Route exact path='/' component={t1}/>
                        <Route exact path='/edit' component={t2}/>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App
