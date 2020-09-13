export const initialState = {
    mainPosts: [{
        id:1,
        User:{
            id:1,
            nickname:'leehyunho',
        },
        content:'my first content #hashtag #express',
        Images: [{
            src:'https://www.google.com/search?q=%EA%B3%A0%EC%96%91%EC%9D%B4&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj_ztX2suHrAhXy-GEKHQToCEAQ_AUoAXoECBoQAw&biw=1848&bih=981#imgrc=-j0Sy0oFOQWa9M'
        }, {
            src:'https://www.google.com/search?q=%EA%B0%95%EC%95%84%EC%A7%80&tbm=isch&ved=2ahUKEwiH8tr3suHrAhWPB94KHf65DXoQ2-cCegQIABAA&oq=%EA%B0%95%EC%95%84%EC%A7%80&gs_lcp=CgNpbWcQAzIFCAAQsQMyBQgAELEDMgUIABCxAzIFCAAQsQMyAggAMgIIADICCAAyAggAMgIIADICCAA6CAgAELEDEIMBUNu0AVjCxAFg0cQBaARwAHgCgAHrAYgB1AeSAQUxLjUuMZgBAKABAaoBC2d3cy13aXotaW1nsAEAwAEB&sclient=img&ei=CpVbX4fFO4-P-Ab-87bQBw&bih=981&biw=1848#imgrc=03GMjyjkGolskM'
        }, {
            src:'https://www.google.com/search?q=%EC%9D%B4%EB%82%98%EC%9D%80&tbm=isch&ved=2ahUKEwjujaChs-HrAhUhNaYKHZ-YAS8Q2-cCegQIABAA&oq=%EC%9D%B4%EB%82%98%EC%9D%80&gs_lcp=CgNpbWcQAzIFCAAQsQMyAggAMgUIABCxAzICCAAyAggAMgIIADICCAAyAggAMgIIADIFCAAQsQM6CAgAELEDEIMBUIwRWI4WYJIWaAJwAHgEgAGqAYgBjAeSAQMyLjaYAQCgAQGqAQtnd3Mtd2l6LWltZ7ABAMABAQ&sclient=img&ei=YpVbX-7UBaHqmAWfsYb4Ag&bih=981&biw=1848#imgrc=UGg0Vnha1XjIHM'
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