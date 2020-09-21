import { all, fork, takeLatest, put, call, delay } from 'redux-saga/effects';
import axios from 'axios';
import shortId from 'shortid';
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAILURE,
} from '../reducers/post';
import { 
    ADD_TO_POST_ME,
    DELETE_TO_POST_ME,
} from '../reducers/user';

function addPostAPI(data) {
    return axios.post('/api/addPost', data)
}
function addCommentAPI(data) {
    return axios.post(`/api/post/${data.id}/comment`, data)
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        const id = shortId.generate();
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data,
            }
        })
        yield put({
            type: ADD_TO_POST_ME,
            data: id
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        })
    }
}
function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        })
    }
}
function* deletePost(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        yield delay(1000);
        yield put({
            type: POST_DELETE_SUCCESS,
            data: action.data,
        })
        yield put ({
            type:DELETE_TO_POST_ME,
            data:action.data,
        })
    } catch (err) {
        yield put({
            type: POST_DELETE_FAILURE,
            data: err.response.data,
        })
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchDeletePost() {
    yield takeLatest(POST_DELETE_REQUEST,deletePost);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchDeletePost),
    ])
}