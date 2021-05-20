
import {useSelector} from 'react-redux'
import {selectModule} from '../../features/directory/slice'
import CodeIframe from '../codeIframe'
import Select, {select} from './1.Select'
import DOM, {dom} from './2.DOM'
import Events, {events} from './3.Events'
import Effects, {effects} from './4.Effects'
import Forms, {forms} from './5.Forms'
import UI, {ui} from './6.UI'

export const jquery = {
    name: 'jquery',
    children: {select, dom, events, effects, forms, ui}
}

const modules = {
    select: Select,
    dom: DOM,
    events: Events,
    effects: Effects,
    forms: Forms,
    ui: UI
}

export default ({Folder}) => {
    const module = useSelector(selectModule)

    if (!module) return <Folder files={jquery}/>
    const Module = modules[module]
    return <Module CodeIframe={CodeIframe}/>
}