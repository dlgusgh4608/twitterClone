import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';
import shortid from 'shortid';

export const initialState = {
    mainPosts: [],
    imagePaths: [],
    hasMorePost : true,
    loadPostsDone: false,
    loadPostsLodding: false, //게시글 가져오는 중
    loadPostsError: null,
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

export const generateDummypost = (number) => Array(10).fill().map(() => ({
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
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.sentence(),
    }],
}));

export const LOAD_POSTS_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POST_FAILURE';

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
                draft.addCommnetDone = false;
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
                draft.deletePostdOne = false;
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
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLodding = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.loadPostsDone = true;
                draft.loadPostsLodding = false;
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.hasMorePost = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLodding = false;
                draft.loadPostsError = action.error;
                break;
            default:
                break;
        }
    });

}

export default reducer;