import queryString from 'query-string';

export default {

    namespace: 'indexPage',

    state: {
        currentPage : 1,
        pageSize : 30,
        total : 0,
        dataSource : []
    },

    subscriptions: {
        setup({ dispatch, history }) { 
            return history.listen(({ pathname, search }) => {
                const query = queryString.parse(search);
                
            })
        }
    },

    effects: {
        
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
