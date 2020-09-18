export const initialState = {
    isLoggedIn: false,
    me: null,
    signupData: {},
    loginData: {},
}

export const logInAction = (data) => {
    return {
        type: 'LOG_IN',
        data
    }
};

export const logInRequest = () => {
    return {
        type:'LOG_IN_REQUEST'
    }
}

export const logInSuccess = () => {
    return {
        type:'LOG_IN_SUCCESS'
    }
}

export const logInFailed = () => {
    return {
        type:'LOG_IN_FAILED'
    }
}

export const logOutAction = () => {
    return {
        type: 'LOG_OUT',
    }
};

export const logOutRequest = () => {
    return {
        type: 'LOG_OUT_REQUEST',
    }
};

export const logOutSuccess = () => {
    return {
        type: 'LOG_OUT_SUCCESS',
    }
};

export const logOutFailed = () => {
    return {
        type: 'LOG_OUT_FAILED',
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isLoggedIn: true,
                me: action.data,
            }

        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            }
        default:
            return state;
    }
}

export default reducer;