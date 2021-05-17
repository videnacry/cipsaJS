import {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {selectAnnex} from '../features/directory/slice'
import Js, {js} from './js'
import Jquery, {jquery} from './jquery'
import Folder from './folder'

export const annex = {
    name: 'annex',
    children: {
        js,
        jquery
    }
}

const annexes = {
    js: Js,
    jquery: Jquery
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