import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    isAuthenticated: boolean
}

const initialState: AuthState = {
isAuthenticated: false
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.isAuthenticated = false
        }
    }
})

export const { login, logout }  = AuthSlice.actions
export default AuthSlice.reducer