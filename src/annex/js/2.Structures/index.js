import {memo} from 'react'
import {useSelector} from 'react-redux'
import {selectTopic} from '../../../features/directory/slice'
import CodeFrame from '../../codeFrame'
import Objects, {objects} from './1.objects'
import Vector, {vector} from './2.vector'

export const structures = {
    name: 'structures',
    parent: 'javascript',
    children: {
        objects,
        vector
    }
}
const topics = {
    objects: Objects,
    vector: Vector
}

const Structures = memo(({Folder}) => {
    const topic = useSelector(selectTopic)

    if (topic) {
        const Topic = topics[topic]
        return <Topic CodeFrame={CodeFrame}/>
    }
    return <Folder files={structures}/>
})

export default Structures