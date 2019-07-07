const initialState ={
    dataNote: [],
    dataSearch: [],
    withCategory : null,
    isLoading: false,
    isFinish: false,
    isError: false,
}

export default notes = ( state = initialState, action) => {
    switch (action.type){
        
        case 'GET_NOTES_PENDING':
            return {
                ...state,
                isLoading : true
            }

        case 'GET_NOTES_REJECTED':
            return {
                ...state,
                isLoading: false,
            }

        case 'GET_NOTES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                withCategory : null,
                dataNote : action.payload.data.data
            }

        case 'GET_SEARCH_PENDING':
            return {
                ...state,
                isLoading : true
            }

        case 'GET_SEARCH_REJECTED':
            return {
                ...state,
                isLoading: false,
            }

        case 'GET_SEARCH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                withCategory : null,
                dataSearch : action.payload.data.data
            }
        
        case 'GET_SEARCHBYCATEGORY_PENDING':
            return {
                ...state,
                isLoading : true
            }

        case 'GET_SEARCHBYCATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
            }

        case 'GET_SEARCHBYCATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataSearch : action.payload.data.data
            }

        case 'GET_PAGE_PENDING':
            return {
                ...state,
                isLoading : true
            }

        case 'GET_PAGE_REJECTED':
            return {
                ...state,
                isLoading: false,
            }

        case 'GET_PAGE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                withCategory : null,
                dataNote : state.dataNote.concat(action.payload.data.data),
                dataSearch : state.dataSearch.concat(action.payload.data.data)
            }

        case 'GET_PAGEBYCATEGORY_PENDING':
            return {
                ...state,
                isLoading : true
            }

        case 'GET_PAGEBYCATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
            }

        case 'GET_PAGEBYCATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                dataNote : state.dataNote.concat(action.payload.data.data),
                dataSearch : state.dataSearch.concat(action.payload.data.data)
            }
        
        case 'GET_NOTESBYCATEGORY_PENDING':
            return {
                ...state,
                isLoading : true
            }

        case 'GET_NOTESBYCATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
            }

        case 'GET_NOTESBYCATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                withCategory: action.payload.data.data[0].categoryId,
                dataNote : action.payload.data.data,
                dataSearch :action.payload.data.data,
            }
        
        case 'ADD_NOTE_PENDING':
        return {
            ...state,
            isLoading: true
        }
        case 'ADD_NOTE_FULFILLED':
        return {
            ...state,
            isLoading: false,
            withCategory : null,
            isFinish: true,
        }
        case 'ADD_NOTE_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        case 'EDIT_NOTE_PENDING':
        return {
            ...state,
            isLoading: true
        }
        case 'EDIT_NOTE_FULFILLED':
        return {
            ...state,
            isLoading: false,
            withCategory : null,
            isFinish: true,
        }
        case 'EDIT_NOTE_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }
        
        case 'DELETE_NOTE_PENDING':
        return {
            ...state,
            isLoading: true
        }
        case 'DELETE_NOTE_FULFILLED':
        return {
            isLoading: false,
            isFinish: true,
            withCategory : null,
            dataNote: [...state.dataNote.filter(({id}) => id !== parseInt(action.payload.data.id))]
        }
        case 'DELETE_NOTE_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }
            
        default:
            return state;
    }
}