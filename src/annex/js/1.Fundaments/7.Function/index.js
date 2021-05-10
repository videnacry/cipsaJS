import {memo} from 'react'
import Alert from 'react-bootstrap/Alert'
import * as First from './1'
import * as Second from './2'
import * as Third from './3'

export const functions = {
    name: 'functions',
    parent: 'fundaments'
}

const exercises = [First, Second, Third]
const render = () => exercises.map((Exercise, idx) => 
    <div key={`functions-${idx}`} className="mb-4 rounded p-2 p-sm-3 bg-secondary">
        <Alert variant="info">{Exercise.Statement}</Alert>
        <Exercise.default/>
    </div>
)

const Functions = memo(() => {
    return render()
})

export default Functions