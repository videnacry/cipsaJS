import {memo} from 'react'
import {useSelector} from 'react-redux'
import {selectTopic} from '../../../features/directory/slice'
import Objects, {objects} from './1.objects'

export const structures = {
    name: 'structures',
    parent: 'javascript',
    children: {
        objects
    }
}
const topics = {
    objects: Objects
}

const Structures = memo(({Folder, CodeView}) => {
    const topic = useSelector(selectTopic)

    if (topic) {
        const Topic = topics[topic]
        return <Topic CodeView={CodeView}/>
    }
    return <Folder files={structures}/>
})

export default Structures