import produce from 'immer';

export const initialState = {
    logInDone: false,
    logInLodding: false, //로그인 시도중
    logInError: null,
    logOutDone: false,
    logOutLodding: false, //로그아웃 시도중
    logOutError: null,
    signUpDone: false,
    signUpLodding: false, //회원가입 시도중
    signUpError: null,
    changeNicknameDone: false,
    changeNicknameLodding: false, //닉네임 변경 시도중
    changeNicknameError: null,
    followDone: false,
    followLodding: false, //닉네임 변경 시도중
    followError: null,
    unfollowDone: false,
    unfollowLodding: false, //닉네임 변경 시도중
    unfollowError: null,
    me: null,
    signupData: {},
    loginData: {},
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const ADD_TO_POST_ME = 'ADD_TO_POST_ME';
export const DELETE_TO_POST_ME = 'DELETE_TO_POST_ME';

export const logInRequestAction = ({ data }) => {
    return {
        type: LOG_IN_REQUEST,
        data
    }
}

export const logOutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    }
};

const dummyUser = (data) => ({
    ...data,
    nickname: 'leehyunho',
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [{ id: '1' }, { id: '2' }, { id: '3' }],
    Followers: [{ id: '1' }, { id: '2' }, { id: '3' }],
})

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case FOLLOW_REQUEST:
                draft.followLodding = true;
                draft.followError = null;
                draft.followDone = false;
                break;
            case FOLLOW_SUCCESS:
                draft.followDone = true;
                draft.followLodding = false;
                draft.me.Followings.push({ id: action.data });
                break;
            case FOLLOW_FAILURE:
                draft.followLodding = false;
                draft.followError = action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowLodding = true;
                draft.unfollowError = null;
                draft.unfollowDone = false;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowDone = true;
                draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
                draft.unfollowLodding = false;
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowLodding = false;
                draft.unfollowError = action.error;
                break;
            case LOG_IN_REQUEST:
                draft.logInLodding = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.logInDone = true;
                draft.logInLodding = false;
                draft.me = dummyUser(action.data);
                break;
            case LOG_IN_FAILURE:
                draft.logInLodding = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLodding = true;
                draft.logOutError = null;
                draft.logOutDone = false;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutDone = true;
                draft.logOutLodding = false;
                draft.me = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLodding = false;
                draft.logOutError = action.error;
                break;
            case SIGN_UP_REQUEST:
                draft.signUpLodding = true;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLodding = false;
                draft.signUpDone = true;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLodding = false;
                draft.signUpError = action.error;
                break;
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLodding = true;
                draft.changeNicknameError = null;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameLodding = false;
                draft.changeNicknameDone = true;
                break;
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLodding = false;
                draft.changeNicknameError = action.error;
                break;
            case ADD_TO_POST_ME:
                draft.me.Posts.unshift({ id: action.data });
                break;
            case DELETE_TO_POST_ME:
                draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
                break;
            default:
                break;
        }
    });
}

export default reducer;