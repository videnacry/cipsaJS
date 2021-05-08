import {memo} from 'react'
import {Alert} from 'react-bootstrap'
import * as First from './1'

export const loop = {
    name: 'loop',
    parent: 'fundaments'
}

const exercises = [First]

const render = (haystack = exercises) => haystack.map(Exercise => (
    <div className="mb-4 p-2 rounded p-sm-3 bg-secondary">
        <Alert variant="info">{Exercise.Statement}</Alert>
        <Exercise.default/>
    </div>
))

const Loop = memo(() => {
    return render()
})

export default Loop