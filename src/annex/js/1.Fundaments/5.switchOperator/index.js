import {memo} from 'react'
import {Alert} from 'react-bootstrap'
import * as First from './1'
import * as Second from './2'

export const switchOperator = {
    name: 'switchOperator',
    parent: 'fundaments'
}

const exercises = [First, Second]
const render = () => exercises.map(Exercise => (
    <div className="mb-4 p-2 p-sm-3 rounded bg-secondary">
        <Alert variant="info">{Exercise.Statement}</Alert>
        <Exercise.default/>
    </div>
))
const SwitchOperator = memo(() => {
    return render()
})

export default SwitchOperator