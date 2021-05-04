import {configureStore} from '@reduxjs/toolkit'
import directory from '../features/directory/slice'

export const store = configureStore({
    reducer: {
        directory
    }
})