import {combineReducers, configureStore} from '@reduxjs/toolkit'
import staffSlice from "./slices/staffSlice";


const rootReducer = combineReducers({
    staffSlice
})

export const setupStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({thunk:true})
    })

    return store
}