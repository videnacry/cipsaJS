import {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {selectAnnex} from '../features/directory/slice'
import Js, {js} from './js'
import Folder from './folder'

export const annex = {
    name: 'annex',
    children: {
        js
    }
}

const annexes = {
    js: Js
}

const Annex = memo(() => {
    const annex = useSelector(selectAnnex)
    const render = useCallback(() => {
        if (annex) {
            const Dir = annexes[annex]
            return <Dir Folder={Folder}/>
        }
        return(
            <Folder files={annex}/>
        )
    }, [annex])
    return(
        render()
    )
})

export default Annex