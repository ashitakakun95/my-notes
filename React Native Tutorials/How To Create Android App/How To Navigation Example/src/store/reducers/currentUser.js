const initialState = {
    isAuthenticated: false,
    user: {} // all user's info will be here once logged in
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;