import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import authReducer from '../features/auth/AuthSlice'
import apiSlice from '../features/api/ApiSlice'

export const listenerMiddleware = createListenerMiddleware()

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(apiSlice.middleware)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
