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
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_SUCCESS,
    generateDummypost,
} from '../reducers/post';

import { 
    ADD_TO_POST_ME,
    DELETE_TO_POST_ME,
} from '../reducers/user';

function addPostAPI(data) {
    return axios.post('/api/addPost', data)
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

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.id}/comment`, data)
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

function deletePostAPI(data) {
    return axios.post(`/api/post/${data.id}/comment`, data)
}
function* deletePost(action) {
    try {
        // const result = yield call(deletePostAPI, action.data);
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

function loadPostsAPI(data) {
    return axios.get('/api/posts', data)
}
function* loadPosts(action) {
    try {
        // const result = yield call(loadPostsAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummypost(10),
        })
    } catch (err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
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
function* watchLoadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST,loadPosts);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchDeletePost),
        fork(watchLoadPosts),
    ])
}