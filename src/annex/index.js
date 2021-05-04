import {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {selectAnnex} from '../features/directory/slice'
import Js, {js} from './js'

export const annex = {
    name: 'annex',
    children: {
        js
    }
}

const annexes = {
    js: <Js/>
}

const Annex = memo(() => {
    const annex = useSelector(selectAnnex)
    const render = useCallback(() => {
        if (annex) return annexes[annex]
        return(
            <h1>Estas rikolino</h1>
        )
    }, [annex])
    return(
        render()
    )
})

export default Annex