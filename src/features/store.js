import { configureStore } from "@reduxjs/toolkit";
import allReduce from "./movies/allReduce";
import movieReducer from './movies/movieSlice';

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        all: allReduce,
    }
});