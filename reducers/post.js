export const initialState = {
    mainPosts: [{
        id:1,
        User:{
            id:1,
            nickname:'leehyunho',
        },
        content:'my first content #hashtag #express',
        Images: [{
            src:'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F997C9A4F5D6CA40F2E'
        }, {
            src:'https://www.sisa-news.com/data/photos/20200730/art_1595497989_752752.jpg'
        }, {
            src:'https://i.pinimg.com/originals/c8/14/99/c814995b86a60232c93492f5c90c0570.jpg'
        }],
        Comments: [{
            User: {
                nickname: 'zzaos',
            },
            content:'hello world',
        }, {
            User : {
                nickname:'minu',
            },
            content:'nonononnononono',
        }]
    }],
    imagePaths:[],
    postAdded: false,
}

const ADD_POST = 'ADD_POST';

export const addPost = {
    type:ADD_POST    
}

export const addPostRequest = {
    type:'ADD_POST_REQUEST'
}

export const addPostSuccess = {
    type:'ADD_POST_SUCCESS'
}

export const addPostFailed = {
    type:'ADD_POST_FAILED'
}

const dummyPost = {
    id:2,
    content:'dummydata',
    User:{
        id:1,
        nickname:'hyunhoLee',
    },
    Images:[],
    Commnets:[],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST :
            return {
                ...state,
                mainPosts:[dummyPost, ...state.mainPosts],
                postAdded:true,
            }
        default:
            return state;
    }
}

export default reducer;