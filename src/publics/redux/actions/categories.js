import axios from 'axios';

const ip = 'http://192.168.6.123:3000/'

export const getCategories = () => {
    return {
        type: 'GET_CATEGORIES',
        payload : axios.get(ip+'categories')
    }
}

export const addCategory = (name, description, image) => {
    return {
        type: 'ADD_CATEGORY',
        payload : axios.post(ip+'category', {
            name: name,
            description: description,
            image : image
        })
    }
}

export const deleteCategory = (categoryId) => {
    return {
        type: 'DELETE_CATEGORY',
        payload : axios.delete(ip+`category/${categoryId}`)
    }
}