import { SEARCH_DATA, TOGGLE_FAVOURITE, SET_FAVOURITES, ADD_TO_FAVOURITE, REMOVE_TO_FAVOURITE } from "../actions/types"

const initialState = {
    searchResult: null,
    showFav: false,
    favourites: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case SEARCH_DATA:
            return { ...state, searchResult: action.payload}
        case TOGGLE_FAVOURITE:
            return { ...state, showFav: !state.showFav}
        case SET_FAVOURITES:
            return { ...state, favourites: action.payload}
        case ADD_TO_FAVOURITE:
            const allFavourites = [...state.favourites, action.payload];
            localStorage.setItem('fav', JSON.stringify(allFavourites));
            return { ...state, favourites: allFavourites};
        case REMOVE_TO_FAVOURITE:
            const filterFav = state.favourites.filter(item => item.imdbID !== action.payload);
            localStorage.setItem('fav', JSON.stringify(filterFav));
            return { ...state, favourites: filterFav};
        default:
            return state
    }
}