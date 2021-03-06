import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    FOLLOW_REQUEST,
    FOLLOW_FAILURE,
    FOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    SIGN_UP_REQUEST,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS,
 } from '../reducers/user';

function logInAPI(data) {
    return axios.post('/user/login', data)
}
function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
    }
}

function logOutAPI() {
    return axios.post('/logout')
}
function* logOut() {
    try {
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }
}

function followAPI() {
    return axios.post('/follow')
}
function* follow(action) {
    try {
        // const result = yield call(followAPI);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}

function unfollowAPI() {
    return axios.post('/unfollow')
}
function* unfollow(action) {
    try {
        // const result = yield call(unfollowAPI);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}
//GET, DELETE 요청은 데이터를 넘길 수 없다.
function signUpAPI(data) {
    return axios.post('/user/signUp', data)
}
function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchSignUp),

    ])
}