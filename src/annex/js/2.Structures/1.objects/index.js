import {Alert} from 'react-bootstrap'
import * as First from './1'

export const objects = {
    name: 'objects'
}

const exercises = [First]
const Objects = ({CodeView}) => 
    exercises.map(Exercise => (
        <div className="rounded p-2 p-sm-4 bg-secondary">
            <Alert variant="info">{Exercise.statement}</Alert>
            <br/>
            <Exercise.default CodeView={CodeView}/>
        </div>
    ))


export default Objects