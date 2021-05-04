import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    Root: 'annex',
    Annex: 'js',
    Module: 'fundaments',
    Topic: 'dialogBox',
    path: ['annex', 'js', 'fundaments', 'dialogBox']
}

export const slice = createSlice({
    name: 'directory',
    initialState,
    reducers: {
        changePath: (state, {payload: [Root, Annex, Module, Topic]}) => {
            state.Root = Root
            state.Annex = Annex
            state.Module = Module
            state.Topic = Topic
            state.path = [Root, Annex, Module, Topic]
        }
    }
})

export const selectRoot = state => state.directory.Root
export const selectAnnex = state => state.directory.Annex
export const selectModule = state => state.directory.Module
export const selectTopic = state => state.directory.Topic
export const selectState = state => state.directory

export default slice.reducer
export const {changePath} = slice.actions