import axios from 'axios';

const ip = 'http://192.168.6.123:3000/'

export const getNotes = (sort) => {
    return {
        type: 'GET_NOTES',
        payload : axios.get(ip+`notes?sort=${sort}`)
    }
}

export const getNotesSearch = (search, sort) => {
    return {
        type: 'GET_SEARCH',
        payload : axios.get(ip+`notes?sort=${sort}&search=${search}`)
    }
}

export const getNotesSearchByCategory = (search, sort, categoryId) => {
    return {
        type: 'GET_SEARCHBYCATEGORY',
        payload : axios.get(
            ip+`notes?sort=${sort}&search=${search}&categoryId=${categoryId}`
        )
    }
}

export const getNotesPage = (search, page, sort) => {
    return {
        type: 'GET_PAGE',
        payload : axios.get(ip+`notes?search=${search}&page=${page}&sort=${sort}`)
    }
}

export const getNotesPageByCategory = (search, page, sort, categoryId) => {
    return {
        type: 'GET_PAGEBYCATEGORY',
        payload : axios.get(ip+`notes?search=${search}&page=${page}&sort=${sort}&categoryId=${categoryId}`)
    }
}

export const getNotesByCategory = (categoryId) => {
    return {
        type: 'GET_NOTESBYCATEGORY',
        payload : axios.get(ip+`notes?categoryId=${categoryId}`)
    }
}

export const addNote = (title,note,categoryId) => {
    return {
        type: 'ADD_NOTE',
        payload : axios.post(ip+'note', {
            title: title,
            note: note,
            categoryId: categoryId,
        })
    }
}

export const editNote = (noteId,title,note,categoryId) => {
    return {
        type: 'EDIT_NOTE',
        payload : axios.patch(ip+`note/${noteId}`, {
            title: title,
            note: note,
            categoryId: categoryId,
        })
    }
}

export const deleteNote = (noteId) => {
    return {
        type: 'DELETE_NOTE',
        payload : axios.delete(ip+`note/${noteId}`)
    }
}