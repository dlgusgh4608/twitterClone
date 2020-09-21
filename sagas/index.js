import { fork, all } from 'redux-saga/effects';

import postSaga from './post';
import userSaga from './user';

//action은 take로 LOG_IN_REQUEST에 보내고 매개변수로 받아진다.
//call에서는 호출할때 call(호출하는 함수, 파라미터) 이런식으로 넘긴다.
//yield를 붙히는 이유는 ?.next()로 하나하나 검사하기 편해서.


//all은 배열을 받아 배열안에 전부를 다 실행시킨다.
//fork는 함수를 실행시키지만 데이터가 올때까지 기다리지 않는다.
//call은 함수를 실행시키고 데이터가 올때까지 기다린후 다음동작을 실헹한다.
//put은 dispatch와 비슷하다.
//take는 (?)action이 실행될때까지 기다린다. 하지만 일회용이다.
//takeEvery는 while(true)에 감싼 take 이벤트리스너와 비슷한 역활을한다.
//takeLatest는 만약 사용자가 로딩중에 다른 이벤트를 실행 했을경우 제일 마지막에 누른 이벤트만 실행.
//★★★요청을 취소하는게 아니라 응답을 취소하는 것임 그러니 백엔드에서는 중복된 데이터를 처리할수있게 해놓을것!★★★
//throttle은 throttle('abc',abcd, 2000)처럼 사용하고 2초동안은 같은 이벤트를 2번 실행 못하게 한다. (2000 => 2초)
export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga),
    ])
}