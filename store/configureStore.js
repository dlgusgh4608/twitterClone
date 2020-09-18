import { createWrapper } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from '../rootSaga';

const configureStore = () => {
    const sagaMiddleWare = createSagaMiddleWare();
    const middlewares = [sagaMiddleWare];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))

    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleWare.run(rootSaga);
    return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development', });

export default wrapper;