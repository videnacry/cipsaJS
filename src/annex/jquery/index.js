
import {useSelector} from 'react-redux'
import {selectModule} from '../../features/directory/slice'
import CodeIframe from '../codeIframe'
import Select, {select} from './1.Select'

export const jquery = {
    name: 'jquery',
    children: {select}
}

const modules = {
    select: Select
}

export default ({Folder}) => {
    const module = useSelector(selectModule)

    if (!module) return <Folder files={jquery}/>
    const Module = modules[module]
    return <Module CodeIframe={CodeIframe}/>
}