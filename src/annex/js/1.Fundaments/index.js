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

const topics = {variable: <Variable />, dialogBox: <DialogBox />}

const Fundaments = memo(() => {
    const topic = useSelector(selectTopic)
    const render = useCallback(() => {
        if (topic) return topics[topic]
        return(
            <h1>Estas rikolino a más no poder</h1>
        )
    })
    return(
        render()
    )
})

export default Fundaments