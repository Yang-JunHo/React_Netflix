import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name : 'movie',
    initialState : {
        popularMovies : [],
        topRatedMovies : [],
        upComingMovies : [],
        genreList : [],
        keyword : ""
    },
    reducers : {
        initData : (state, action)=>{
            // console.log('movieSlice initData', action);
            state.popularMovies = action.payload.popular
            state.topRatedMovies = action.payload.topRated
            state.upComingMovies = action.payload.upComing
            state.genreList = action.payload.genre
        },
        searchKeyword(state, action) {
            console.log('action.payload', action.payload)
            state.keyword = action.payload
        }
    },
})


export const movieActions = movieSlice.actions
export default movieSlice.reducer