import {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {selectModule} from '../../features/directory/slice'
import Fundaments, {fundaments} from './1.Fundaments'

export const js = {
    name: 'js',
    parent: 'root',
    children: {
        fundaments
    }
}

const modules = {
    fundaments: <Fundaments />
}

const Js = memo(() => {
    const module = useSelector(selectModule)
    const render = useCallback(() => {
        if (module) return modules[module]
        return(
            <h1>Estas bien rikolino</h1>
        )
    }, [module])
    return(
        render()
    )
})

export default Js