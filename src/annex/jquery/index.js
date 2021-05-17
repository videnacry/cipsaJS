
import {useSelector} from 'react-redux'
import {selectModule} from '../../features/directory/slice'
import CodeIframe from '../codeIframe'
import Select, {select} from './1.Select'
import DOM, {dom} from './2.DOM'
import Events, {events} from './3.Events'

export const jquery = {
    name: 'jquery',
    children: {select, dom, events}
}

const modules = {
    select: Select,
    dom: DOM,
    events: Events
}

export default ({Folder}) => {
    const module = useSelector(selectModule)

    if (!module) return <Folder files={jquery}/>
    const Module = modules[module]
    return <Module CodeIframe={CodeIframe}/>
}