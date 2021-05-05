import {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {selectTopic} from '../../../features/directory/slice'
import Variable, {variable} from './1.Variable'
import DialogBox, {dialogBox} from './2.DialogBox'


export const fundaments = {
    name: 'fundaments',
    parent: 'javascript',
    children: {
        variable,
        dialogBox
    }
}

const topics = {variable: Variable, dialogBox: DialogBox}

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