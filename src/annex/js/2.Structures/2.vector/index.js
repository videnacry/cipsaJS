import Alert from 'react-bootstrap/Alert'
import * as First from './1'
import * as Second from './2'

export const vector = {
    name: "vector"
}
const exercises = [First, Second]
export default ({CodeFrame}) =>  exercises.map(Exercise => 
    <div className="my-4 rounded p-2 p-sm-4 bg-secondary">
        <Alert variant="info">{Exercise.statement}</Alert>
        <Exercise.default CodeFrame={CodeFrame}/>
    </div>    
)