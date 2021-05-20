import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    Root: 'annex',
    Annex: 'js',
    Module: 'fundaments',
    Topic: 'dialogBox'
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
        },
        changeAnnex: (state, {payload: Annex}) => {
            state.Annex = Annex
        },
        changeModule: (state, {payload: Module}) => {
            state.Module = Module
        },
        changeTopic: (state, {payload: Topic}) => {
            state.Topic = Topic
        }
    }
})

export const selectRoot = state => state.directory.Root
export const selectAnnex = state => state.directory.Annex
export const selectModule = state => state.directory.Module
export const selectTopic = state => state.directory.Topic
export const selectState = state => state.directory

export default slice.reducer
export const {changePath, changeModule, changeTopic, changeAnnex} = slice.actions