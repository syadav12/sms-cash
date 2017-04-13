import axios from 'axios'
import * as types from './../constants';
import blog from './../utils/api/blog';

export function openModal(data){
    return {
        type: types.OPEN_MODAL,
        payload : data
    }
}
export function getPosts(){
    return{
        type:types.GET_POSTS,
        payload : blog.getPosts()
            .then((response) => {
                return response.data
            })
        }
}
export function getPost(data){
    return {
        type : types.GET_POST,
        payload : blog.getPost(data)
            .then((response) =>{
                return response.data
            })
    }
}
export function addComment(data){
    return {
        type : types.ADD_COMMENT,
        payload: blog.addComment(data)
            .then((response)=>{
                return response.data
            })
    }
}