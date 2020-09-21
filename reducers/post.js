import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';
import shortid from 'shortid';

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'leehyunho',
        },
        content: 'my first content #hashtag #express',
        Images: [{
            id: shortId.generate(),
            src: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F997C9A4F5D6CA40F2E'
        }, {
            id: shortId.generate(),
            src: 'https://www.sisa-news.com/data/photos/20200730/art_1595497989_752752.jpg'
        }, {
            id: shortId.generate(),
            src: 'https://i.pinimg.com/originals/c8/14/99/c814995b86a60232c93492f5c90c0570.jpg'
        }],
        Comments: [{
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: 'zzaos',
            },
            content: 'hello world',
        }, {
            User: {
                id: shortId.generate(),
                nickname: 'minu',
            },
            content: 'nonononnononono',
        }]
    }],
    imagePaths: [],
    addPostDone: false,
    addPostLodding: false, //게시글 쓰는중
    addPostError: null,
    addCommentDone: false,
    addCommentLodding: false, //댓글 쓰는중
    addCommentError: null,
    deletePostDone: false,
    deletePostLodding: false, //게시글 지우는 중
    deletePostError: null,
}

initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map(() => ({
        id: shortid.generate(),
        User: {
            id: shortid.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.paragraph(),
        Images: [{
            id: shortid.generate(),
            src: faker.image.image(),
        }],
        Comments: [{
            User:{
                id:shortId.generate(),
                nickname:faker.name.findName(),
            },
            content: faker.lorem.sentence(),
        }],
    }))
)

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const POST_DELETE_REQUEST = 'POST_DELETE_REQUEST';
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
export const POST_DELETE_FAILURE = 'POST_DELETE_FAILURE';

export const addPostRequest = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addCommentRequest = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})

const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: 'hyunhoLee',
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'hyunhoLee',
    },
})

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST_REQUEST:
                draft.addPostLodding = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(dummyPost(action.data));
                draft.addPostDone = true;
                draft.addPostLodding = false;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLodding = false;
                draft.addPostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLodding = true;
                draft.addPostDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLodding = false;
                draft.addCommentDone = true;
                break;
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLodding = false;
                draft.addCommentError = action.error;
                break;
            case POST_DELETE_REQUEST:
                draft.deletePostLodding = true;
                draft.deletePostError = null;
                break;
            case POST_DELETE_SUCCESS:
                draft.deletePostDone = true;
                draft.deletePostLodding = false;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case POST_DELETE_FAILURE:
                draft.deletePostLodding = false;
                draft.deletePostError = action.error;
                break;
            default:
                break;
        }
    });

}

export default reducer;