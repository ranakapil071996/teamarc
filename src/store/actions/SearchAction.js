import { SET_FAVOURITES, SEARCH_DATA, ADD_TO_FAVOURITE, REMOVE_TO_FAVOURITE, TOGGLE_FAVOURITE } from "./types"
import Axios from "axios";

const apikey = "2bc748be";
const baseUrl = "https://www.omdbapi.com/"

export const setFavourites = (fav) => async dispatch => {
    dispatch({
        type: SET_FAVOURITES,
        payload: fav
    })
}

export const searchQuery = (data)  => async dispatch => {
    try{
        const res = await Axios.get(baseUrl , { params: { ...data, apikey}})
        if(res.status === 200 && (res.data.Search)){
            dispatch({
                type: SEARCH_DATA,
                payload: res.data.Search
            })
        }else{
            dispatch({
                type: SEARCH_DATA,
                payload: []
            })
        }
        return true
    }
    catch(err){
        console.log(err)
        alert("Something went wrong")
        return false
    }
}

export const addTofavourite = (favourites) =>async dispatch => {
        dispatch({
            type: ADD_TO_FAVOURITE,
            payload: favourites
        })
}

export const removeFromfavourite = (id) =>async dispatch => {
        dispatch({
            type: REMOVE_TO_FAVOURITE,
            payload: id
        })
}

export const toggleFavourites = () => async dispatch => {
    dispatch({
        type: TOGGLE_FAVOURITE
    })
}