import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getFilmShow = createAsyncThunk("all/dataHomePage", async(data)=>{
    const response = await axios.get(
        process.env.REACT_APP_DB_HOST+"film/show"
        )
  
     return response.data
})
       

const initialState = {
            movies: {},
            shows: {},
            details: {}
        }

const allReduce = createSlice({
    name: "all",
    initialState,
    reducers:{
        getFilm: (state) => {
            //  state.movies={dienvien: "jaj"}
            //  console.log("getfilm")
          
        }

    },
    extraReducers: {
        [getFilmShow.pending]: () => {
        console.log('pending');
        },

        [getFilmShow.fulfilled]:(state,{payload})=>{
            console.log(state,"state")
            console.log(payload,"payload")
            
            return{...state,movies:payload}
        },

        [getFilmShow.rejected]: () => {
            console.log('rejected');
        },
    }
})

export default allReduce.reducer;
export const {getFilm} = allReduce.actions
export const getAllMovies1 =(redu)=> redu.all.movies;