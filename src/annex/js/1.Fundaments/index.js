import {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {selectTopic} from '../../../features/directory/slice'
import Variable, {variable} from './1.Variable'
import DialogBox, {dialogBox} from './2.DialogBox'
import Condition, {condition} from './3.Condition'
import TernaryOperator, {ternaryOperator} from './4.ternaryOperator'


export const fundaments = {
    name: 'fundaments',
    parent: 'javascript',
    children: {
        variable,
        dialogBox,
        condition,
        ternaryOperator
    }
}

const topics = {variable: Variable, dialogBox: DialogBox, condition: Condition, ternaryOperator: TernaryOperator}

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