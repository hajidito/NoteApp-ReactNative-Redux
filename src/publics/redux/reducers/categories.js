const initialState ={
    data: [],
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default categories = ( state = initialState, action) => {
    switch (action.type){
        
        case 'GET_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading : true
            }

        case 'GET_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
            }

        case 'GET_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                data : action.payload.data.values
            }
            
        case 'ADD_CATEGORY_PENDING':
        return {
            ...state,
            isLoading: true
        }
        case 'ADD_CATEGORY_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            data: state.data.concat(action.payload.data.values)
        }
        case 'ADD_CATEGORY_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'DELETE_CATEGORY_PENDING':
        return {
            ...state,
            isLoading: true
        }
        case 'DELETE_CATEGORY_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            data: [...state.data.filter(({id}) => id !== parseInt(action.payload.data.id))]
        }
        case 'DELETE_CATEGORY_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        default:
            return state;
    }
}