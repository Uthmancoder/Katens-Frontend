import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isFetching : true,
    fetchingSuccessful : [],
    fetchingFailed : null,
}

const AllPost = createSlice({
    name : "AllaPosts",
    initialState,
    reducers : {
        FetchingAllPosts : (state)=>{
         state.isFetching = true,
         state.fetchingSuccessful = null,
         state.fetchingFailed = null
        },
        GottenAllPosts : (state, action)=>{
            state.isFetching = false,
            state.fetchingSuccessful = action.payload,
            state.fetchingFailed = null 
        },
        FetchingPostsFailed : (state, action)=>{
            state.isFetching = false,
            state.fetchingSuccessful = null,
            state.fetchingFailed = action.payload
        }
    } 
})

export const {FetchingAllPosts, GottenAllPosts, FetchingPostsFailed} = AllPost.actions
export default AllPost.reducer