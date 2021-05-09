import {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {selectTopic} from '../../../features/directory/slice'
import Variable, {variable} from './1.Variable'
import DialogBox, {dialogBox} from './2.DialogBox'
import Condition, {condition} from './3.Condition'
import TernaryOperator, {ternaryOperator} from './4.ternaryOperator'
import SwitchOperator, {switchOperator} from './5.switchOperator'
import Loop, {loop} from './6.loop'
import Functions, {functions} from './7.Function'


export const fundaments = {
    name: 'fundaments',
    parent: 'javascript',
    children: {
        variable,
        dialogBox,
        condition,
        ternaryOperator,
        switchOperator,
        loop,
        functions
    }
}

const topics = {
    variable: Variable,
    dialogBox: DialogBox,
    condition: Condition,
    ternaryOperator: TernaryOperator,
    switchOperator: SwitchOperator,
    loop: Loop,
    functions: Functions
}

const Fundaments = memo(({Folder}) => {
    const topic = useSelector(selectTopic)
    const render = useCallback(() => {
        if (topic) {
            const Topic =  topics[topic]
            return <Topic Folder={Folder}/>
        }
        return(
            <Folder files={fundaments}/>
        )
    })
    return(
        render()
    )
})

export default Fundaments