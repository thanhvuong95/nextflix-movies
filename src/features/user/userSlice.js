import { createSlice } from "@reduxjs/toolkit";
const initialState = {user:null, list:[]}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        login:(state, action) => {
            state.user = action.payload
            return state
        },
        logout: (state) => {
            state.user = null
            state.list = []
            return state
        },
        addList:(state, action) => {
            console.log('payload',action.payload);
            state.list = [...state.list,action.payload]
            console.log(state.list);
            return state
        },
        updateList:(state, action) => {
            state.list = action.payload
            return state
        }
        
    }
})


export const selectUser = state => state.user.user
export const selectList = state => state.user.list

export const {login,logout,addList,updateList} = userSlice.actions
export default userSlice.reducer