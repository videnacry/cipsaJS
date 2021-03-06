import {memo} from 'react'
import {Alert} from 'react-bootstrap'
import * as First from './1'
import * as Second from './2'
import * as Third from './3'
import * as Fourth from './4'
import * as Fifth from './5'
import * as Sixth from './6'
import * as Seventh from './7'
import * as Eighth from './8'

const exercises = [First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth]

export const ternaryOperator = {
    name: 'ternaryOperator',
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

const TernaryOperator = memo(() => {

    return(
        renderExercise()
    )
})

export default TernaryOperator