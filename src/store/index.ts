import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '@/slices/AuthSlice'
import StudentReducer from '@/slices/StudentSlice'

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        student: StudentReducer
    }
})

export default store
export type RootState =  ReturnType< typeof store.getState>
export type AppDispatch = typeof store.dispatch


