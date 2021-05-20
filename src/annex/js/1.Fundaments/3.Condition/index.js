import {memo} from 'react'
import {Alert} from 'react-bootstrap'
import * as First from './1'
import * as Second from './2'

const exercises = [First, Second]

export const condition = {
    name: 'condition',
    type: 'topic'
}

const renderExercise = () => exercises.map(Exercise => (
    <>
    <div className="border border-secondary p-2 p-sm-3 rounded bg-secondary">
        <Alert variant="info">{Exercise.Statement}</Alert>
        <Exercise.default />
    </div>
    <br/>
    </>
))

const Condition = memo(() => {

    return(
        renderExercise()
    )
})

export default Condition