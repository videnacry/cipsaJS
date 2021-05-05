import {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {selectModule} from '../../features/directory/slice'
import Fundaments, {fundaments} from './1.Fundaments'

export const js = {
    name: 'js',
    children: {
        fundaments
    }
}

const modules = {
    fundaments: Fundaments
}

const Js = memo(({Folder}) => {
    const module = useSelector(selectModule)
    const render = useCallback(() => {
        if (module) {
            const Module =  modules[module]
            return <Module Folder={Folder}/>
        }
        return(
            <Folder files={js}/>
        )
    }, [module])
    return(
        render()
    )
})

export default Js