import {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {selectModule} from '../../features/directory/slice'
import Fundaments, {fundaments} from './1.Fundaments'
import Structures, {structures} from './2.Structures'

export const js = {
    name: 'js',
    type: 'annex',
    children: {
        fundaments,
        structures
    }
}

const modules = {
    fundaments: Fundaments,
    structures: Structures
}

const Js = memo(({Folder}) => {
    const module = useSelector(selectModule)
    const render = useCallback(() => {
        if (module) {
            const Module =  modules[module]
            return <Module Folder={Folder}/>
        }
        return(
            <Folder folder={js}/>
        )
    }, [module])
    return(
        render()
    )
})

export default Js