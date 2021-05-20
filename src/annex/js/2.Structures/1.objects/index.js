import {Alert} from 'react-bootstrap'
import * as First from './1'
import * as Second from './2'
import * as Third from './3'

export const objects = {
    name: 'objects',
    type: 'topic'
}

const exercises = [First, Second, Third]
const Objects = ({CodeFrame}) => 
    exercises.map(Exercise => (
        <div className="mt-4 rounded p-2 p-sm-4 bg-secondary">
            <Alert variant="info">{Exercise.statement}</Alert>
            <br/>
            <Exercise.default CodeFrame={CodeFrame}/>
        </div>
    ))


export default Objects